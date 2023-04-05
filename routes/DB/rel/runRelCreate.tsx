import { insert, insertReturning } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rel = await req.json()
        pintoLog(rel)
        const relReturning = await insertReturning(
          'rel_main (topic,topic_type,topic_link,title,main_start,main_end,role)value (?,?,?,?,?,?,?,?)',
          'main_key',
          [rel.topic,rel.topicType,rel.topicLink,rel.title,rel.timeStart,rel.timeEnd,rel.role]
        )
        const entryReturning = await insertReturning(
          'rel_entry (main_key,entry_name,entry_start,entry_end,state)value(?,?,?,?,1)',
          'entry_key',
          [relReturning.main_key,rel.firstWriter,Date.now(),Date.now()]
        )
        const result = {
            result : entryReturning.entry_key
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