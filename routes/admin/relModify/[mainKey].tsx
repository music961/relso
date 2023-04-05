import { PageProps, Handlers } from '$fresh/server.ts'
import { select } from "../../../const/DBTable.tsx"
import Layout from '../../../components/Layouts.tsx'
import RelModify from '../../../islands/RelModify.tsx'
import { S3Bucket } from "aws_s3"

export default function rel_modify({data}:PageProps){
    return (
        <Layout>
            <RelModify rel={data.rel} novel={data.novel} url='../../../../DB/rel/runRelModify' />
        </Layout>
    )
}
  
export const handler: Handlers = {
    async GET(req,cxt){
        const [comp] = await select(
            "rm.*,re.entry_key,re.entry_name from rel_main rm left join rel_entry re on rm.main_key = re.main_key where rm.main_key=? and re.entry_key = (select min(entry_key) from rel_entry where main_key=rm.main_key)",
            [cxt.params.mainKey]
        )
        const bucket = new S3Bucket({
            accessKeyID: Deno.env.get('s3_access') || '',
            secretKey: Deno.env.get('s3_secret') || '',
            bucket: 'relso',
            region: "ap-northeast-2"
        })
        const {body} = await bucket.getObject(`entry/${comp.entry_key}`) ||{}
        return await cxt.render({
            rel : comp,
            novel : await new Response(body).text()
        })
    }
}