import { Head } from "$fresh/runtime.ts"
import Layout from "../components/Layouts.tsx"
import { PageProps, Handlers } from "$fresh/server.ts"
import { select } from "../const/DBTable.tsx"
import { WithSession } from "freshSession"
import Relso from "../islands/Relso.tsx"
import Entry from "../islands/Entry.tsx"
import Entrys from "../islands/Entrys.tsx"
import { S3Bucket } from "aws_s3"
import { sigRelso } from "../const/sig.tsx"

export default function Home({data}:PageProps) {
  const entrys = data.entrys || []
  const lastEntry = entrys[entrys.length-1] || {}
  sigRelso.value = relso

  //임시 끝
  return (
    <html lang="ko">
      <Head>
        <title>C형 릴레이</title>
      </Head>
      <Layout>
        <Entry 
          th={entrys.length+1} 
          mainKey={data.mainKey} 
          이전주자_닉네임={lastEntry.entry_name} 
          entry={data.entry} 
          reserve={data.reserve}
        />
        <Relso/>
        <Entrys entrys={data.entrys} novels={data.novels}/>
      </Layout>
    </html>
  )
}

export const handler: Handlers<any,WithSession> = {
  async GET(_,cxt){
    let entry
    let entrys
    const novels :string[] = []
    let reserve
    let mainKey = 0
    const now = Date.now()

    const bucket = new S3Bucket({
      accessKeyID: Deno.env.get('s3_access') || '',
      secretKey: Deno.env.get('s3_secret') || '',
      bucket: 'relso',
      region: "ap-northeast-2"
  })
  
    const [relso] = await select("*,CONCAT_WS('-', MONTH(FROM_UNIXTIME(main_start /1000)), ROW_NUMBER() OVER(PARTITION BY YEAR(FROM_UNIXTIME(main_start/1000)), MONTH(FROM_UNIXTIME(main_start/1000)) ORDER BY FROM_UNIXTIME(main_start/1000))) AS round from rel_main where main_end>? order by main_end desc limit 1",[now])
    if(relso){
      [entry] = await select(
        "* from rel_entry where main_key=? and entry_start>? and state is null order by entry_key desc limit 1",
        [relso.main_key,Date.now()-10800000]
      )
      mainKey = relso.main_key
      entrys = await select("* from rel_entry where main_key=? and state=1 order by entry_key",[mainKey])
      for(const entry of entrys){
        const {body} = await bucket.getObject(`entry/${entry.entry_key}`) ||{}
        novels.push(await new Response(body).text())
      }

    }
    if(entry){
      [reserve] = await select(
        "* from rel_reserve where entry_key=? and state is null order by rsv_key desc limit 1",
        [entry.entry_key]
      )
    }else{
      [reserve] = await select(
        "rsv_key,rsv_name,entry_start,entry_end from (select rsv_key,rsv_name,entry_start,entry_end from rel_reserve rr join rel_entry re on rr.entry_key = re.entry_key where rr.state is null order by rsv_key desc limit 1)a where (entry_start>?)and(entry_end is null or entry_end>?)",
        [Date.now()-12600000,Date.now()-1800000]  // 3시간 30분, 30분
      )
    }
      
    return cxt.render({
      entry : entry,
      relso : relso,
      entrys : entrys,
      novels : novels,
      reserve : reserve,
      mainKey : mainKey
    })
  }
}
