import { useState } from "preact/hooks"
import { Button, Input } from "../components/Button.tsx"
import { convertDate,convertTimeScale } from "../const/Function.ts"

interface EntryProps {
    th : number,
    mainKey : number,
    entry: any
}

export default function Entry(props:EntryProps){
    const [entry, setEntry] = useState(props.entry)
    if(props.mainKey!=0){
        if(entry){
            const [예약, 세팅_예약] = useState(false)
            let aaa = (<div/>)
            if(예약)
            aaa = (
                <div>
                    <Input id="예약자이름" placeholder={`예약하시는 분 이름 입력`}/>
                    <Button onClick={()=>실행_예약(entry.entry_key)}>예약합니다</Button>
                </div>
            )
            const 마감시간 = entry.entry_start+(3600*3*1000)
            return(
                <div class="p-4 items-center">
                    <tr class="mx-4">
                        <td class="px-4">[{props.th} 번째 {entry.entry_name}]</td>
                    </tr>
                    <tr>
                        <td class="px-4">마감 : {convertTimeScale(마감시간,Date.now(),false)}</td>
                    </tr>
                    <tr>
                        <td class="px-4">예약 : 없음</td>
                    </tr>
                    <tr>
                        <td class="px-4">
                        <Button onClick={()=>entrySummit(entry.entry_key,1,"제출하시겠습니까?")}>제출</Button>
                        <Button onClick={()=>entrySummit(entry.entry_key,2,"포기하시겠습니까?")}>포기</Button>
                        <Button onClick={()=>세팅_예약(!예약)}>예약</Button>
                        </td>
                    </tr>
                    {aaa}
                </div>
            )
        }else{
            return(
                <div class="p-4 items-center">
                    <Input id="entryName" placeholder={`${props.th}번째 작가님 모집 (이름 입력)`}/>
                    <Button onClick={()=>entryStart(props.mainKey)}>잇겠습니다</Button>
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

const 실행_예약 = (entryKey:number)=>{
    let summitOK = true
    const chkValue = (label:string)=> {
        const elem = document.getElementById(label).value
        // 공백이 입력되면, 실행하지 않는다.
        if(elem==''){
          summitOK = false
        }
        return elem
      }
      const 예약자이름 = chkValue('예약자이름')
      if(summitOK){
        if(confirm(`${예약자이름}님, 예약하시겠습니까?`)){
            const model = {
                entryKey : entryKey,
                reserveName : 예약자이름
            }
            fetch('../DB/entry/runReserveAdd',{
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