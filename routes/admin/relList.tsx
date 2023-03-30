import { PageProps, Handlers } from "$fresh/server.ts"
import Layout from "../../components/Layouts.tsx"
import Rels from "../../islands/Rels.tsx"
import { select, cnt, isHave } from "../../const/DBTable.tsx"
import { WithSession } from "freshSession"

export default function aaa({data}:PageProps){
  let result = (<Layout/>)
  if(data.isLogin){
    result = (
      <Layout>
          <Rels cnt={data.cnt} rels={data.result}/>
      </Layout>
    )
  }
  return result
}

export const handler:  Handlers<any,WithSession> = {
  async GET(_,cxt){
    const {session} = cxt.state
    let isLogin = false
    const email = session.data.aabbcc
    if(email!=null){
        isLogin = await isHave("rel_admin where email=?",[email])
    }
    const cntAdmin = await cnt("rel_main")
    const selectAdmin = await select(
      "*,CONCAT_WS('-', MONTH(FROM_UNIXTIME(main_start /1000)), ROW_NUMBER() OVER(PARTITION BY YEAR(FROM_UNIXTIME(main_start/1000)), MONTH(FROM_UNIXTIME(main_start/1000)) ORDER BY FROM_UNIXTIME(main_start/1000))) AS round from rel_main rm left join (select main_key,entry_name from rel_entry where entry_key in (select min(entry_key) from rel_entry group by main_key))re on rm.main_key = re.main_key"
      )
    return await cxt.render({
      isLogin : isLogin,
      cnt : cntAdmin,
      result : selectAdmin
    })
  }
}