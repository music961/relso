import Layout from '../../components/Layouts.tsx'
import EntryModify from '../../islands/EntryModify.tsx'

export default function entry_create(){
    return (
        <Layout>
            <EntryModify entry={{}} url='../../DB/entry/runEntryWrited' />
        </Layout>
    )
}