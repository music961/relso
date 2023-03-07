import { HandlerContext } from "$fresh/server.ts"
import { WithSession } from "freshSession"
import { GoogleOAuth } from "https://deno.land/x/google@0.0.7/oauth.ts"
import { pintoLog } from "../../const/Function.ts"

export const handler = {
    async GET(req:Request,cxt:HandlerContext<any,WithSession>){
        const u = new URL(req.url)
        const code = u.searchParams.get('code')
        if(code!=null){
            await setPayload(code,cxt.state)
        }
        return new Response("",{
            status : 307,
            headers : { Location : "/admin/main"}
        })
    }
  }

  const setPayload =async (code:string,state:WithSession) => {
    const ga = new GoogleOAuth({
        client_id : "602990314098-bvs1v7oj71pmbb9m4ptp9aq68jeg10k7.apps.googleusercontent.com",
        client_secret : "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",
        redirect_uri : "https://relso.deno.dev/DB/runGoogleAuth",
        "scopes" : [
            "https://www.googleapis.com/auth/userinfo.email",
        ]
    })
    const {session} = state
    const tokens = await ga.getTokens(code)
    const idToken = ga.decodeIdToken(tokens.id_token)
    const payload = idToken.payload
    const email = payload.email
    session.set('aabbcc',email)
  }