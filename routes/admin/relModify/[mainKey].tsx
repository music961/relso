import { PageProps, Handlers } from '$fresh/server.ts'
import { select } from "../../../const/DBTable.tsx"
import Layout from '../../../components/Layouts.tsx'
import RelModify from '../../../islands/RelModify.tsx'

export default function rel_modify({data}:PageProps){
    return (
        <Layout>
            <RelModify rel={data} url='../../../../DB/rel/runRelModify' />
        </Layout>
    )
}
  
export const handler: Handlers = {
    async GET(req,cxt){
        //const [comp] = await select("* from rel_main where main_key=?",[cxt.params.mainKey])
        const [comp] = await select(
            "rm.*,re.entry_name from rel_main rm left join rel_entry re on rm.main_key = re.main_key where rm.main_key=? and re.entry_key = (select min(entry_key) from rel_entry where main_key=rm.main_key)",
            [cxt.params.mainKey]
        )
        return await cxt.render(comp)
    }
}