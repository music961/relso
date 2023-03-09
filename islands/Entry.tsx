import { useState } from "preact/hooks"
import { Button, Input } from "../components/Button.tsx"
import { convertTimeScale } from "../const/Function.ts"

interface EntryProps {
    entry: any
}

export default function Entry(props:EntryProps){
    const [entry, setEntry] = useState(props.entry)
    if(props.entry){
        const 마감시간 = entry.entry_start+(3600*3*1000)
        return(
            <div class="p-4 items-center">
                <tr>
                    <td class="px-4">{entry.th} 번째</td>
                </tr>
                <tr>
                    <td class="px-4">{entry.entry_name}</td>
                </tr>
                
                <tr>
                    <td class="px-4">{convertTimeScale(마감시간,Date.now(),false)}</td>
                </tr>
                <Button onClick={()=>entrySummit(entry.entry_key,1,"이으셨습니까?")}>이었음</Button>
                <Button onClick={()=>entrySummit(entry.entry_key,2,"포기하시겠습니까?")}>포기</Button>
            </div>
        )
    }else{
        return(
            <div>
                <div>
                    주자 없음
                </div>
                <Button>잇겠습니다</Button>
            </div>
        )
    }
}

const entrySummit = (entryKey:number,state:any,ask:string)=>{
    if(confirm(ask)){
    const model = {
        entryKey : entryKey,
        state : state
        }
        alert('처리되었습니다.')
        fetch('./DB/entry/runEntryWrited',{
            method:'POST',
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(model)
        })    
        location.replace('/')
    }
}