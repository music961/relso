import { insert } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rel = await req.json()
        pintoLog(rel)
        insert(
          'rel_main (round,topic,title,main_start,main_end)value (?,?,?,?,?)',
          [rel.round,rel.topic,rel.title,rel.timeStart,rel.timeEnd]
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