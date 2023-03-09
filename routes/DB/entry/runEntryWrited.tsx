import { update } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const entry = await req.json()
        pintoLog(entry)
        update(
          'rel_entry set state=?,entry_end=? where entry_key=?',
          [entry.state,Date.now(),entry.entryKey]
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