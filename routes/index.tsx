import { Head } from "$fresh/runtime.ts"
import Layout from "../components/Layouts.tsx"
import { PageProps, Handlers } from "$fresh/server.ts"
import { select, cnt, isHave } from "../const/DBTable.tsx"
import { WithSession } from "freshSession"
import Relso from "../islands/Relso.tsx"
import Entry from "../islands/Entry.tsx"
import Entrys from "../islands/Entrys.tsx"

export default function Home({data}:PageProps) {
  return (
    <html lang="ko">
      <Head>
        <title>릴레이 선언 하는곳</title>
      </Head>
      <Layout>
        <div>
          <Relso relso={data.relso}/>
          <Entry th={data.th} mainKey={data.mainKey} entry={data.entry}/>
          <Entrys entrys={data.entrys}/>
        </div>
      </Layout>
    </html>
  )
}

export const handler: Handlers<any,WithSession> = {
  async GET(_,cxt){
    let entry
    let entrys
    let reserve
    let th=0
    let mainKey = 0
    const now = Date.now()
    const [relso] = await select("* from rel_main where main_end>? order by main_end desc limit 1",[now])
    if(relso){
      [entry] = await select(
        "* from rel_entry where main_key=? and entry_start>? and state is null order by entry_key desc limit 1",
        [mainKey,Date.now()-10800000]
      )
      mainKey = relso.main_key
      entrys = await select("* from rel_entry where main_key=? and state=1 order by entry_key desc",[mainKey])
      th = await cnt("rel_entry where main_key=1 and state=1")
    }
    if(entry){
      [reserve] = await select("* from rel_reserve where entry_key=? order by rsv_key desc limit 1",[entry.entry_key])
    }
      
    return await cxt.render({
      relso : relso,
      entry : entry,
      entrys : entrys,
      th : th+1,
      mainKey : mainKey
    })
  }
}
