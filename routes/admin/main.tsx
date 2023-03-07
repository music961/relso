import { PageProps, Handlers } from "$fresh/server.ts"
import { Button, Input } from "../../components/Button.tsx"
import Layout from "../../components/Layouts.tsx"
import Admin from "../../islands/Admin.tsx"
import { select, cnt, isHave } from "../../const/DBTable.tsx"
import { GoogleOAuth } from "https://deno.land/x/google@0.0.7/oauth.ts"
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
          isLogin = await isHave("lim_admin where email=?",[email])
      }
      return await cxt.render({
        isLogin : isLogin,
        session : session.data
      })
    }
  }