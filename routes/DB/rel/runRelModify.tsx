import { update } from "../../../const/DBTable.ts"
import { pintoLog } from "../../../const/Function.ts"
import { ModelInfo } from "../../../const/model.tsx"

export const handler = {
    async POST(req:Request):Promise<Response>{
        const info : ModelInfo = await req.json()
        pintoLog(info)
        update(
          'lim_info set info_type=?,buy_type=?,std=?,label=?,price=?,num=?,info_time=? where info_key=?',
          [info.type,info.typeBuy,info.std,info.label,info.price,info.num,info.infoTime,info.infoKey]
        )
        const result = {
            infoKey : info.infoKey
        }
      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )
    }
  }