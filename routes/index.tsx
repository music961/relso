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
        <Relso relso={data.result}/>
        <br/>
        <Entry />
      </Layout>
    </html>
  )
}

export const handler: Handlers<any,WithSession> = {
  async GET(_,cxt){
    const selectRelso = await select("* from rel_main")
    const {session} = cxt.state
    // let isLogin = false
    // const email = session.data.aabbcc
    // if(email!=null){
    //     isLogin = await isHave("lim_admin where email=?",[email])
    // }

    return await cxt.render({
      result : selectRelso
    })
  }
}
