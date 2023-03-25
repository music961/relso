import { useState } from "preact/hooks"
import { Button, ButtonLink, Input } from "../components/Button.tsx"
import { convertDate,convertTimeScale } from "../const/Function.ts"

interface EntryProps {
    th : number,
    mainKey : number,
    이전주자_닉네임 : string,
    entry: any,
    reserve: any
}

export default function Entry(props:EntryProps){
    const entry = props.entry
    const rsv = props.reserve
    if(props.mainKey!=0){
        if(entry){
            const [예약, 세팅_예약] = useState(false)
            let 예약자 = '없음'
            let 예약버튼 = (<Button onClick={()=>세팅_예약(!예약)}>예약</Button>)
            let 예약입력영역 = (<div/>)
            if(rsv){
                예약자 = rsv.rsv_name
                예약버튼 = (<Button onClick={()=>실행_예약(rsv.rsv_key,2,"예약 포기하시겠습니까?")}>예약포기</Button>)
                예약입력영역 = (<div/>)
            }
            if(예약){
                예약입력영역 = (
                    <div>
                        <Input id="예약자이름" placeholder={`예약하시는 분 이름 입력`}/>
                        <Button onClick={()=>등록_예약(entry.entry_key,entry.entry_name)}>예약합니다</Button>
                    </div>
                )
            }

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
                        <td class="px-4">예약 : {예약자}</td>
                    </tr>
                    <tr>
                        <td class="px-4">
                        <ButtonLink data={{name:"대민호",age:18}} url="/entry/entryWrite">ff22</ButtonLink>
                        <Button onClick={()=>entrySummit(entry.entry_key,1,"제출하시겠습니까?")}>제출</Button>
                        <Button onClick={()=>entrySummit(entry.entry_key,2,"포기하시겠습니까?")}>포기</Button>
                        {예약버튼}
                        </td>
                    </tr>
                    {예약입력영역}
                </div>
            )
        }else{
            if(rsv){
                let 예약마감시간 = rsv.entry_start+12600000 // 주자가 시간을 초과했을 경우
                const 주자의_제출_또는_포기 = rsv.entry_end+1800000
                // entry_end 가 null 이 아니면 주자의 제출 또는 포기를 예약마감시간으로 삼는다.
                if(rsv.entry_end){
                    예약마감시간 = 주자의_제출_또는_포기
                }
                return(
                    <div>
                        <tr class="mx-4">
                            <td>
                                예약자가 있습니다.
                            </td>
                        </tr>
                        <tr class="mx-4">
                            <td>
                                {rsv.rsv_name}<Button onClick={()=>예약자_릴레이참가(props.mainKey,rsv.rsv_name,rsv.rsv_key)}>잇겠습니다</Button>
                                <Button onClick={()=>실행_예약(rsv.rsv_key,2,"예약 포기하시겠습니까?")}>예약포기</Button>
                            </td>
                        </tr>
                        <tr class="mx-4">
                            <td>
                                예약마감시간 : {convertDate(예약마감시간)}({convertTimeScale(예약마감시간,Date.now(),false)})
                            </td>
                        </tr>
                    </div>
                )
            }else{
                return(
                    <div class="p-4 items-center">
                        <Input id="entryName" placeholder={`${props.th+1}번째 작가님 모집 (이름 입력)`}/>
                        <Button onClick={()=>entryStart(props.mainKey,props.이전주자_닉네임)}>잇겠습니다</Button>
                    </div>
                )
            }

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

const entryStart = (mainKey:number,이전주자_닉네임:string)=>{
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
    if(entryName==이전주자_닉네임){
        alert('마지막으로 이은 작가와 닉네임이 달라야 합니다.')
    }else{
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
}

const 등록_예약 = (entryKey:number,이전주자_이름:string)=>{
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
      if(예약자이름==이전주자_이름){
        alert('진행 중인 작가와 닉네임이 달라야 합니다.')
      }else{
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
}

const 실행_예약 = (rsvKey:number,state:any,ask:string)=>{
    if(confirm(ask)){
        const model = {
            rsvKey : rsvKey,
            state : state
        }
        fetch('../DB/entry/runReserveWrited',{
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

// 예약자 릴레이 참가시, 예약 state 를 갱신하는 절차가 추가된다.
const 예약자_릴레이참가 = (mainKey:number,entryName:string,rsvKey:number)=>{
    if(confirm(`${entryName}님, 이으시겠습니까?`)){
        const model = {
            mainKey : mainKey,
            entryName : entryName
        }
        const 예약모델 = {
            rsvKey : rsvKey,
            state : 1   // 예약이 처리되었음을 뜻함
        }
        fetch('../DB/entry/runEntryAdd',{
            method:'POST',
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(model)
        })
        fetch('../DB/entry/runReserveWrited',{
            method:'POST',
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(예약모델)
        })    
        location.replace('/')
    }
}