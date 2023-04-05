import { update } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"
import { S3Bucket } from "aws_s3"

export const handler = {
    async POST(req:Request):Promise<Response>{
      const entry = await req.json()
      pintoLog(entry)
      update(
        'rel_entry set state=?,entry_end=? where entry_key=?',
        [entry.state,Date.now(),entry.entryKey]
      )
      const bucket = new S3Bucket({
        accessKeyID: Deno.env.get('s3_access') || '',
        secretKey: Deno.env.get('s3_secret') || '',
        bucket: 'relso',
        region: "ap-northeast-2"
      })
      bucket.putObject(
        `entry/${entry.entry_key}`,
        new TextEncoder().encode(entry.novel)
      )
      return new Response(
        JSON.stringify(100),
        {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )
    }
  }