import { insert } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const body = await req.json()
        pintoLog(body)
        insert(
          'rel_admin(email,admin_time)value(?,?)',
          [body.email,Date.now()]
        )
        const result = {
          result : 100
        }
      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )
    }
  }