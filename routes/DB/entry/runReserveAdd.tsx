import { insert } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const reserve = await req.json()
        pintoLog(reserve)
        // insert 하기 전, 누군가가 먼저 등록을 했는지 체크하고 진행.
        insert(
          'rel_reserve (entry_key,rsv_name,rsv_start) select ?,?,? where not exists(select * from rel_reserve where entry_key=? and state is null)',
          [reserve.entryKey,reserve.reserveName,Date.now(),reserve.entryKey]
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