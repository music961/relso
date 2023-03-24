import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal } from "../const/Function.ts"
import { useState } from "preact/hooks"

interface PropsRel {
  rel: any,
  url : string
}

export default function FellModify(props : PropsRel){
  const rel = props.rel
  let preTitle = '미정'
  const [주제_타입,설정_주제_타입] = useState(rel.topic_type || 0)
  let 주제_링크 = (<div/>)
  if(rel.title){
    preTitle = rel.title
  }
  if(주제_타입!=0){
    주제_링크 = (
      <tr>
        <td class="px-4">주제링크</td>
        <td><Input id="relTopicLink" value={rel.topic_link}/></td>
      </tr>
    )
  }
  return (
    <div>
      <div>
        <Button onClick={()=>relSummit(rel.main_key,props.url)}>확인</Button>
      </div>
      <table class="p-4 shadow-md">
          <tr>
              <td class="px-4">라운드</td>
              <td><Input id="relRound" value={rel.round}/></td>
          </tr>
          <tr>
              <td class="px-4">제목</td>
              <td><Input id="relTitle" value={preTitle}/></td>
          </tr>
          <tr>
              <td class="px-4">주제</td>
              <td><Input id="relTopic" value={rel.topic}/></td>
              <td class="px-4">
                <select class="bg-black border(gray-200 1)" id='relTopicType' value={rel.topicType} 
                  onChange={()=>{
                    const topicType = document.getElementById('relTopicType').value
                    설정_주제_타입(topicType)
                  }}
                >
                  <option value={0}>평문</option>
                  <option value={1}>그림</option>
                  <option value={2}>음악</option>
                </select>
              </td>
          </tr>
          {주제_링크}
          <tr>
              <td class="px-4">시작시간</td>
              <td><Input id="relStart" type="datetime-local" value={dbTimeToDateTimeLocal(rel.main_start)}/></td>
          </tr>
          <tr>
              <td class="px-4">종료시간</td>
              <td><Input id="relEnd" type="datetime-local" value={dbTimeToDateTimeLocal(rel.main_end)}/></td>
          </tr>
          <tr>
            <td class="px-4">첫글 작가 닉네임</td>
            <td><Input id="relFirstWriter" value={rel.entry_name}/></td>
          </tr>
      </table>
      <div>
        <Button onClick={()=>relSummit(rel.main_key,props.url)}>확인</Button>
      </div>
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

const topicTypeChange = ()=>{
  

}