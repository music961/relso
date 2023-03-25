import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from '../../const/Function.ts'

export default function entry_create({data}:PageProps){
    return (
        <Layout>
            <EntryModify entry={data.entry} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async POST(req,cxt){
        const body = await req.json()
        pintoLog(`받았음 ${body.name}`)
        return cxt.render({
            entry : body || {}
        })
    }
}
