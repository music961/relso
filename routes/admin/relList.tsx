import { PageProps, Handlers } from "$fresh/server.ts"
import Layout from "../../components/Layouts.tsx"
import Rels from "../../islands/Rels.tsx"
import { select, cnt, isHave } from "../../const/DBTable.tsx"
import { WithSession } from "freshSession"

export default function aaa({data}:PageProps){
  let result = (<Layout/>)
  if(data.isLogin){
    result = (
      <Layout>
          <Rels cnt={data.cnt} rels={data.result}/>
      </Layout>
    )
  }
  return result
}

export const handler:  Handlers<any,WithSession> = {
  async GET(_,cxt){
    const {session} = cxt.state
    let isLogin = false
    const email = session.data.aabbcc
    if(email!=null){
        isLogin = await isHave("rel_admin where email=?",[email])
    }
    const cntAdmin = await cnt("rel_main")
    const selectAdmin = await select("* from rel_main")
    return await cxt.render({
      isLogin : isLogin,
      cnt : cntAdmin,
      result : selectAdmin
    })
  }
}