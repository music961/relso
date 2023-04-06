import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState } from "preact/hooks"

interface PropsRel {
  rel: any,
  novel : string,
  url : string
}

export default function RelModify(props : PropsRel){
  const rel = props.rel
  const entryKey = 0
  let preTitle = '미정'
  const [주제_타입,설정_주제_타입] = useState(rel.topic_type || 0)
  let 주제_링크 = (<div/>)
  let 제목_입력 = (<div/>)
  if(rel.title){
    preTitle = rel.title
  }
  if(주제_타입!=0){
    주제_링크 = (
      <tr>
        <td class="px-4">링크</td>
        <td><Input id="relTopicLink" value={rel.topic_link}/></td>
      </tr>
    )
  }
  if(props.url!='../../DB/rel/runRelCreate'){
    제목_입력 = (
      <tr>
        <td class="px-4">제목</td>
        <td><Input id="relTitle" value={preTitle}/></td>
      </tr>
    )
  }
  return (
    <div>
      <div>
        <Button onClick={()=>relSummit(rel.main_key,entryKey,props.url)}>확인</Button>
      </div>
      <table class="p-4 shadow-md">
          {/* <tr>
              <td class="px-4">라운드</td>
              <td><Input id="relRound" value={rel.round}/></td>
          </tr> */}
          {제목_입력}
          <tr>
            <td class="px-4">카테고리</td>
            <td><Input id="relCat" value={rel.cat}/></td>
          </tr>
          <tr>
            <td class="px-4">컨셉</td>
            <td><Input id="relConcept" value={rel.concept}/></td>
          </tr>
          <tr>
              <td class="px-4">세부컨셉</td>
              <td><Input id="relTopic" value={rel.topic}/></td>
              <td class="px-4">
                <select class="bg-black border(gray-200 1)" id='relTopicType' value={rel.topic_type} 
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
      <div>규칙</div>
      <div>
        <textarea 
          type="text"
          id="relRole"
          placeholder="규칙"
          class="w-full border-2 rounded-md mt-2 px-2 bg-black border-green-500 focus:border-green-600 outline-none" 
          rows={6}
          value={rel.role}
        />
      </div>
      <div>본문</div>
      <div>
      <textarea 
          type="text"
          id="relNovel"
          placeholder="본문"
          class="w-full border-2 rounded-md mt-2 px-2 bg-black border-green-500 focus:border-green-600 outline-none" 
          rows={12}
          value={props.novel}
        />
      </div>
      <div>
        <Button onClick={()=>relSummit(rel.main_key,entryKey,props.url)}>확인</Button>
      </div>
    </div>
  )
}

const relSummit = (mainKey:any,entryKey:any,url:string)=>{
  let summitOK = true
  pintoLog('트레이스1')
  const chkValue = (label:string)=> {
    const elem = document.getElementById(label).value
    // 공백이 입력되면, 실행하지 않는다.
    if(elem==''){
      summitOK = false
    }
    return elem
  }
  const relCat = chkValue('relCat')
  const relConcept = chkValue('relConcept')
  const relTitle = chkValue('relTitle')
  const relTopic = chkValue('relTopic')
  const relTopicType = chkValue('relTopicType')

  const relStart = chkValue('relStart')
  const relEnd = chkValue('relEnd')
  const relFirstWriter = chkValue('relFirstWriter')
  const relRole = chkValue('relRole')
  const relNovel = chkValue('relNovel')
  
  let relTopicLink = ''
  if(relTopicType!=0){
    relTopicLink = chkValue('relTopicLink')
  }
  pintoLog(`엔트리키 : ${entryKey}`)
  const model = {
    mainKey : mainKey,
    cat : relCat,
    concept : relConcept,
    title : relTitle,
    topic : relTopic,
    topicType : relTopicType,
    topicLink : relTopicLink,
    timeStart : Date.parse(relStart),
    timeEnd : Date.parse(relEnd),
    firstWriter : relFirstWriter,
    role : relRole,
    entryKey : entryKey,
    novel : relNovel
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