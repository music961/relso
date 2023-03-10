import { insert } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const entry = await req.json()
        pintoLog(entry)
        insert(
          //'rel_entry (main_key,entry_name,entry_start)value (?,?,?)',
          'rel_entry (main_key,entry_name,entry_start) select ?,?,? where exists(select * from rel_entry where main_key=? and entry_start>? and state is null)'
          //[entry.mainKey,entry.entryName,Date.now()]
          [entry.mainKey,entry.entryName,Date.now(),entry.mainKey,Date.now()]
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