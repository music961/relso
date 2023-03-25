import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from '../../const/Function.ts'
import { WithSession } from 'https://deno.land/x/fresh_session@0.2.0/mod.ts'

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
        const entry = await req.json()
        return await cxt.render({
            entry : entry
        })
    }
}
