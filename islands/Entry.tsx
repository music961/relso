import { useState } from "preact/hooks"
import { Button, Input } from "../components/Button.tsx"

interface EntryProps {
    entry: any
}

export default function Entry(props:EntryProps){
    const [entry, setEntry] = useState(props.entry)
    if(props.entry){
        return(
            <div class="p-4 items-center">
                <tr>
                    <td>순서</td>
                    <td class="px-4">{entry.th}</td>
                </tr>
                <tr>
                    <td>선언</td>
                    <td class="px-4">{entry.entry_name}</td>
                </tr>
                <tr>
                    <td>선언시간</td>
                    <td class="px-4">{convertDate(entry.entry_start)}</td>
                </tr>
                <Button>제출</Button>
                <Button>취소</Button>
            </div>
        )
    }else{
        return(<div/>)
    }

}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }