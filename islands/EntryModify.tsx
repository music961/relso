import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState } from "preact/hooks"

interface PropsRel {
  entry: any,
  url : string
}

export default function EntryModify(props : PropsRel){
  const entry = props.entry
  pintoLog(`모디파이에서 받은거 ${JSON.stringify(entry)}`)
  return (
    <div>
      {JSON.stringify(entry)}
      <table class="p-4 shadow-md">
          <tr>
              <td class="px-4">라운드</td>
              <td><Input id="relRound" value={JSON.stringify(entry)}/></td>
          </tr>
          <tr>
              <td class="px-4">제목</td>
              <td><Input id="relTitle" value={entry.age}/></td>
          </tr>

      </table>
    </div>
  )
}

const relSummit = (mainKey:any,url:string)=>{
  let summitOK = true
  const chkValue = (label:string)=> {
    const elem = document.getElementById(label).value
    // 공백이 입력되면, 실행하지 않는다.
    if(elem==''){
      summitOK = false
    }
    return elem
  }
  const relRound = chkValue('relRound')
  const relTitle = chkValue('relTitle')
  const relTopic = chkValue('relTopic')
  const relTopicType = chkValue('relTopicType')

  const relStart = chkValue('relStart')
  const relEnd = chkValue('relEnd')
  const relFirstWriter = chkValue('relFirstWriter')
  
  let relTopicLink = ''
  if(relTopicType!=0){
    relTopicLink = chkValue('relTopicLink')
  }
  const model = {
    mainKey : mainKey,
    round : relRound,
    title : relTitle,
    topic : relTopic,
    topicType : relTopicType,
    topicLink : relTopicLink,
    timeStart : Date.parse(relStart),
    timeEnd : Date.parse(relEnd),
    firstWriter : relFirstWriter
  }
  if(summitOK){
    fetch(url,{
      method:'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(model)
    })    
    location.replace('/admin/relList')
  }else{
    alert('바르게 입력해 주세요')
  } 
}