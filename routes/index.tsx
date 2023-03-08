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
          <Relso relso={data.resultRelso}/>
          <Entry entry={data.resultEntry}/>
        </div>
      </Layout>
    </html>
  )
}

export const handler: Handlers<any,WithSession> = {
  async GET(_,cxt){
    let entry
    let reserve
    const now = Date.now()
    const [relso] = await select("* from rel_main where main_end>? order by main_end desc limit 1",[now])
    if(relso){
      [entry] = await select("* from rel_entry where main_key=? order by entry_key desc limit 1",[relso.main_key])
    }
    if(entry){
      [reserve] = await select("* from rel_reserve where entry_key=? order by rsv_key desc limit 1",[entry.entry_key])
    }
      
    return await cxt.render({
      resultRelso : relso,
      resultEntry : entry
    })
  }
}
