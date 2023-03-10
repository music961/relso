import { useState } from "preact/hooks"
import { Button, Input } from "../components/Button.tsx"
import { convertTimeScale } from "../const/Function.ts"

interface EntryProps {
    th : number,
    mainKey : number,
    entry: any
}

export default function Entry(props:EntryProps){
    const [entry, setEntry] = useState(props.entry)
    if(props.mainKey!=0){
        if(props.entry){
            const 마감시간 = entry.entry_start+(3600*3*1000)
            return(
                <div class="p-4 items-center">
                    <tr class="mx-4">
                        <td class="px-4">{props.th} 번째</td>
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
                <div class="p-4 items-center">
                    <tr class="mx-4">
                        <td class="px-4">
                            <Input id="entryName" placeholder={'작가님 이름 입력'}/>
                        </td>
                    </tr>
                    <tr class="mx-4">
                        <td class="px-4">
                            <Button onClick={()=>entryStart(props.mainKey)}>{props.th}번째 잇겠습니다</Button>
                        </td>
                    </tr>
                </div>
            )
        }
    }else{
        return(<div/>)
    }
}

const entrySummit = (entryKey:number,state:any,ask:string)=>{
    if(confirm(ask)){
        const model = {
            entryKey : entryKey,
            state : state
        }
        alert(`처리되었습니다.`)
        fetch('../DB/entry/runEntryWrited',{
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

const entryStart = (mainKey:number)=>{
    let summitOK = true
    const chkValue = (label:string)=> {
        const elem = document.getElementById(label).value
        // 공백이 입력되면, 실행하지 않는다.
        if(elem==''){
          summitOK = false
        }
        return elem
      }
    const entryName = chkValue('entryName')
    if(summitOK){
        if(confirm(`${entryName}님, 이으시겠습니까?`)){
            const model = {
                mainKey : mainKey,
                entryName : entryName
            }
            fetch('../DB/entry/runEntryAdd',{
                method:'POST',
                headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
                },
                body: JSON.stringify(model)
            })
            location.replace('/')
        }
    }else{
        alert('바르게 입력해주세요.')
    }
}