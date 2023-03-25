import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from '../../const/Function.ts'

export default function entry_create({data}:PageProps){
    const  entry = data.entry || {}
    return (
        <Layout>
            <EntryModify entry={'민훠어'} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

export const handler: Handlers = {
    async POST(req,cxt){
        let n
        const body = await req.json()
        if(body){
            n = body.name
        }
        const age = body.age || 10
        pintoLog(`받았음 ${body.name}`)
        return await cxt.render({
            entry : '민민'
        })
    }
}
