import { Head } from "$fresh/runtime.ts"
import Layout from "../components/Layouts.tsx"
import { PageProps, Handlers } from "$fresh/server.ts"
import { select, cnt, isHave } from "../const/DBTable.tsx"
import { WithSession } from "freshSession"
import Relso from "../islands/Relso.tsx"
import Entry from "../islands/Entry.tsx"

export default function Home({data}:PageProps) {
  return (
    <html lang="ko">
      <Head>
        <title>릴레이 선언 하는곳</title>
      </Head>
      <Layout>
        <div>
          <Relso isProgress={data.isProgress} progressLabel={data.progressLabel} relso={data.resultRelso}/>
          <Entry entry={data.resultEntry}/>
        </div>
      </Layout>
    </html>
  )
}

export const handler: Handlers<any,WithSession> = {
  async GET(_,cxt){
    const selectRelso = await select("* from rel_main")
    const selectEntry = await select("* from rel_entry where main_key=? order by entry_key desc limit 1",[selectRelso[0].main_key])
    const selectReserve = await select("* from rel_reserve where entry_key=? order by rsv_key desc limit 1",[selectEntry[0].entry_key])
    const {session} = cxt.state
    let isLogin = false
    const email = session.data.aabbcc
    if(email!=null){
        isLogin = await isHave("lim_admin where email=?",[email])
    }

    let isProgress : boolean
    let progressLabel : string
    const now = Date.now()
  
    if(selectRelso[0].main_start>now){
      progressLabel = '진행전'
      isProgress = false
    }else if(selectRelso[0].main_end<now){
        progressLabel = '기간만료'
        isProgress = false
    }else{
        progressLabel = '진행중'
        isProgress = true
    }

    return await cxt.render({
      isProgress : isProgress,
      progressLabel : progressLabel,
      resultRelso : selectRelso,
      resultEntry : selectEntry
    })
  }
}
