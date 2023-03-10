import { update } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rsv = await req.json()
        pintoLog(rsv)
        update(
          'rel_reserve set state=?,rsv_end=? where rsv_key=?',
          [rsv.state,Date.now(),rsv.rsvKey]
        )
      return new Response(
        JSON.stringify(100),
        {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )
    }
  }