import { insert } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const entry = await req.json()
        pintoLog(entry)
        // insert 하기 전, 누군가가 먼저 등록을 했는지 체크하고 진행.
        insert(
          'rel_entry (main_key,entry_name,entry_start) select ?,?,? where exists(select * from rel_entry where main_key=? and entry_start>? and state is null)',
          [entry.mainKey,entry.entryName,Date.now(),entry.mainKey,Date.now()-10800000]
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