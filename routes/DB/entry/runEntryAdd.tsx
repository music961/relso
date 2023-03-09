import { insert } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const entry = await req.json()
        pintoLog(entry)
        insert(
          'rel_entry (main_key,entry_name,entry_start)value (?,?,?)',
          [entry.mainKey,entry.entryName,Date.now()]
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