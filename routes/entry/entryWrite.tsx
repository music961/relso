import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from "../../const/Function.ts";

export default function entry_create({data}:PageProps){
    const  relso = data.relso || {}
    const  entry = data.entry || {}
    return (
        <Layout>
            <EntryModify entry={entry} relso={relso} th={data.th} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async GET(req,cxt){
        const params = new URLSearchParams(req.url.split('?')[1])
        const relso = JSON.parse(decodeURIComponent(params.get('relso')!))
        const entry = JSON.parse(decodeURIComponent(params.get('entry')!))
        pintoLog(relso)
        return await cxt.render({
            relso : relso,
            entry : entry,
            th : params.get('th')
        })
    }
}
