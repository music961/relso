import { update } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rel = await req.json()
        pintoLog(rel)
        update(
          'rel_main set topic=?,topic_type=?,topic_link=?,title=?,main_start=?,main_end=?,role=? where main_key=?',
          [rel.topic,rel.topicType,rel.topicLink,rel.title,rel.timeStart,rel.timeEnd,rel.role,rel.mainKey]
        )
        update(
          'rel_entry set entry_name=? where entry_key=?',
          [rel.firstWriter,rel.entryKey]
        )
        const result = {
            relKey : rel.entryKey
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