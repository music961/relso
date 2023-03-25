import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"

export default function entry_create({data}:PageProps){
    return (
        <Layout>
            {data.name}
            {data.age}
            <EntryModify entry={{}} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async POST(req,cxt){
        const body = await req.json()

        return await cxt.render({
            name : body.name,
            age : body.age
        })
    }
}