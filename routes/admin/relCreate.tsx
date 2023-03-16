import Layout from '../../components/Layouts.tsx'
import RelModify from '../../islands/RelModify.tsx'

export default function rel_create(){
    return (
        <Layout>
            <RelModify rel={{}} url='../../DB/rel/runRelCreate' />
        </Layout>
    )
}