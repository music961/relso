import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"

export default function entry_create({data}:PageProps){
    const  entry = data.entry || {}
    return (
        <Layout>
            <EntryModify entry={entry} th={data.th} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async GET(req,cxt){
        const params = new URLSearchParams(req.url.split('?')[1])
        const entry = JSON.parse(decodeURIComponent(params.get('entry')!))
        return await cxt.render({
            entry : entry,
            th : params.get('th')
        })
    }
}
