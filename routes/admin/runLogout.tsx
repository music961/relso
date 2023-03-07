import { HandlerContext } from "$fresh/server.ts"
import { WithSession } from "freshSession"

export const handler = {
    GET(req:Request,cxt:HandlerContext<any,WithSession>){
        const {session} = cxt.state
        session.clear()
        return new Response(
            JSON.stringify({ result : 100}),
            {
              status: 200,
              headers: {
                  'Content-Type': 'application/json'
              }
            }
          )
    }
  }