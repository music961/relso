import { useState } from "preact/hooks"
import { Button, Input } from "../components/Button.tsx"
import { convertTimeScale } from "../const/Function.ts"

interface EntryProps {
    entry: any
}

export default function Entry(props:EntryProps){
    const [entry, setEntry] = useState(props.entry)
    const 마감시간 = entry.entry_start+(3600*3*1000)
    if(props.entry){
        return(
            <div class="p-4 items-center">
                <tr>
                    <td class="px-4">{entry.th} 번째</td>
                </tr>
                <tr>
                    <td class="px-4">{entry.entry_name}</td>
                </tr>
                <tr>
                    <td class="px-4">{convertTimeScale(entry.entry_start,마감시간,false)}</td>
                </tr>
                <Button>제출</Button>
                <Button>취소</Button>
            </div>
        )
    }else{
        return(<div/>)
    }

}