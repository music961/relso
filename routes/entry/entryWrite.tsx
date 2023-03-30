import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from '../../const/Function.ts'

export default function entry_create({data}:PageProps){
    const  relso = data.relso || {}
    const  entry = data.entry || {}
    return (
        <Layout>
            <EntryModify entry={entry} relso={relso} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async GET(req,cxt){
        pintoLog(`url : ${req.url}`)
        const params = new URLSearchParams(req.url.split('?')[1])
        pintoLog(`url 분리 : ${params}`)
        const relso = decodeURIComponent(params.get('relso')!)
        const entry = decodeURIComponent(params.get('entry')!)
        pintoLog(`디코딩 : ${relso} ${entry}`)
        return await cxt.render({
            relso : relso,
            entry : entry
        })
    }
}
