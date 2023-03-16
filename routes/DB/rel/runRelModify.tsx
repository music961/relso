import { update } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rel = await req.json()
        pintoLog(rel)
        update(
          'rel_main set round=?,topic=?,title=?,main_start=?,main_end=?,docs=? where main_key=?',
          [rel.round,rel.topic,rel.title,rel.timeStart,rel.timeEnd,rel.docs,rel.mainKey]
        )
        const result = {
            relKey : rel.mainKey
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