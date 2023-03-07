import { PageProps, Handlers } from "$fresh/server.ts"
import Layout from "../../components/Layouts.tsx"
import Admin from "../../islands/Admin.tsx"
import { select, cnt, isHave } from "../../const/DBTable.tsx"
import { WithSession } from "freshSession"

export default function main({data}:PageProps){
  return(
    <Layout>
      <Admin 
        isLogin={data.isLogin} 
        session={data.session} 
      />
    </Layout>
  )  
}

export const handler:  Handlers<any,WithSession> = {
    async GET(_,cxt){
      const {session} = cxt.state
      let isLogin = false
      const email = session.data.aabbcc
      if(email!=null){
          isLogin = await isHave("rel_admin where email=?",[email])
      }
      return await cxt.render({
        isLogin : isLogin,
        session : session.data
      })
    }
  }