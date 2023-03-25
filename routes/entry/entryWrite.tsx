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

// export const handler:  Handlers<any,WithSession> = {
//     async GET(_,cxt){
//       return await cxt.render({
//         entry : 'ㅁㅇㄴㄹ'
//       })
//     }
//   }


export const handler: Handlers = {
    async GET(req,cxt){
        // let n
        // const body = await req.json()
        // if(body){
        //     n = body.name
        // }
        // const age = body.age || 10
        // pintoLog(`받았음 ${body.name}`)
        return await cxt.render({
            entry : {name:'민민',age:10}
        })
    }
}

export const handler2: Handlers = {
    async POST(req,cxt){
        // let n
        // const body = await req.json()
        // if(body){
        //     n = body.name
        // }
        // const age = body.age || 10
        // pintoLog(`받았음 ${body.name}`)
        return await cxt.render({
            entry : {name:'민민후후',age:12}
        })
    }
}

