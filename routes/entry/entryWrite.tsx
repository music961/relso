import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'
import { PageProps, Handlers } from "$fresh/server.ts"
import { pintoLog } from '../../const/Function.ts'

export default function entry_create({data}:PageProps){
    const  entry = data.entry
    return (
        <Layout>
            <EntryModify entry={'민훠어'} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}

// export const handler: Handlers = {
//     async POST(req,cxt){
//         const body = await req.json()
//         const name = body.name || '민'
//         const age = body.age || 10
//         pintoLog(`받았음 ${body.name}`)
//         return cxt.render({
//             entry : name
//         })
//     }
// }
