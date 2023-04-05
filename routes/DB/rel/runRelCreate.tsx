import { insertReturning } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"
import { S3Bucket } from "aws_s3"

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
        const bucket = new S3Bucket({
          accessKeyID: Deno.env.get('s3_access') || '',
          secretKey: Deno.env.get('s3_secret') || '',
          bucket: 'relso',
          region: "ap-northeast-2"
        })
        bucket.putObject(
          `entry/${entryReturning.entry_key}`,
          new TextEncoder().encode(rel.novel)
        )
      return new Response(
        JSON.stringify(200),
        {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )
    }
  }