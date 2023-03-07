import { PageProps } from '$fresh/server.ts'
import Layout from '../../../components/Layouts.tsx'
import RelModify from '../../../islands/RelModify.tsx'

export default function info_create(props:PageProps){
    const {mainKey} = props.params
    return (
        <Layout>
            <RelModify rel={{main_key:mainKey}} url='../../../DB/rel/runRelCreate' />
        </Layout>
    )
}