import { del } from "../../../const/DBTable.tsx"
import { pintoLog } from "../../../const/Function.ts"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const body = await req.json()
        pintoLog(`삭제할 관리자키 : ${body.adminKey}`)
        del('rel_admin where admin_key=?',[body.adminKey])
        return new Response('100')
    }
  }