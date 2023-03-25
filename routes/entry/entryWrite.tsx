import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from '../../const/Function.ts'

export default function entry_create({data}:PageProps){
    const  entry = data.entry || {}
    return (
        <Layout>
            <EntryModify entry={entry} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async GET(req,cxt){
        const params = new URLSearchParams(req.url.split('?')[1])
        pintoLog(`url 분리 : ${params}`)
        const decoded = decodeURIComponent(params)!
        pintoLog(`디코딩 : ${decoded}`)
        const decodedEntry = JSON.parse(decoded)
        return await cxt.render({
            entry : decodedEntry
        })
    }
}
