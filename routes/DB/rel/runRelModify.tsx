import { update } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"
import { S3Bucket } from "aws_s3"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const rel = await req.json()
        pintoLog(rel)
        update(
          'rel_main set cat=?,concept=?,topic=?,topic_type=?,topic_link=?,title=?,main_start=?,main_end=?,role=? where main_key=?',
          [rel.cat,rel.concept,rel.topic,rel.topicType,rel.topicLink,rel.title,rel.timeStart,rel.timeEnd,rel.role,rel.mainKey]
        )
        update(
          'rel_entry set entry_name=? where entry_key=?',
          [rel.firstWriter,rel.entryKey]
        )
        const bucket = new S3Bucket({
          accessKeyID: Deno.env.get('s3_access') || '',
          secretKey: Deno.env.get('s3_secret') || '',
          bucket: 'relso',
          region: "ap-northeast-2"
        })
        bucket.putObject(
          `entry/${rel.entryKey}`,
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