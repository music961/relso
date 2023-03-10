import { useState } from "preact/hooks"
import { convertDate } from "../const/Function.ts"

interface RelsProps {
    entrys : any
}

export default function Entrys(props: RelsProps) {
    const entrys = props.entrys
    const cnt = entrys.length
    if(entrys){
        return (
            <div>
                <table class="p-4 items-center shadow-md">
                    <th>번째</th>
                    <th>작가</th>
                    <th>제출시간</th>
                    {
                    entrys.map((entry,idx)=>
                        <tr class="mx-4">
                            <td class="px-4">{cnt-idx}</td>
                            <td class="px-4">{entry.entry_name}</td>
                            <td class="px-4">{convertDate(entry.entry_end).substring(4)}</td>
                        </tr>
                    )
                    }
                </table>
            </div>
    
        )
    }else{
        return(<div/>)
    }

  }
