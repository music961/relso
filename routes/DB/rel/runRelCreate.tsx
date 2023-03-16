import { insert, insertReturning } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rel = await req.json()
        pintoLog(rel)
        // insert(
        //   'rel_main (round,topic,title,main_start,main_end,docs)value (?,?,?,?,?,?)',
        //   [rel.round,rel.topic,rel.title,rel.timeStart,rel.timeEnd,rel.docs]
        // )
        const relReturning = await insertReturning(
          'rel_main (round,topic,title,main_start,main_end,docs)value (?,?,?,?,?,?)',
          'main_key',
          [rel.round,rel.topic,rel.title,rel.timeStart,rel.timeEnd,rel.docs]
        )
        insert(
          'rel_entry (main_key,entry_name,entry_start,entry_end,state)value(?,?,?,?,1)',
          [relReturning.main_key,rel.firstWriter,Date.now(),Date.now()]
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