import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal } from "../const/Function.ts"

interface PropsRel {
  rel: any,
  url : string
}

export default function FellModify(props : PropsRel){
  const rel = props.rel
  let preTitle = '미정'
  if(rel.title){
    preTitle = rel.title
  }
  let 첫글작가입력 = (<div/>)
  if(props.url=='../../DB/rel/runRelCreate'){
    첫글작가입력 = (
      <tr>
        <td class="px-4">첫글</td>
        <td class="px-4"><Input id="relFirstWriter" value={rel.firstWriter}/></td>
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
              <td class="px-4"><Input id="relRound" value={rel.round}/></td>
          </tr>
          <tr>
              <td class="px-4">제목</td>
              <td class="px-4"><Input id="relTitle" value={preTitle}/></td>
          </tr>
          <tr>
              <td class="px-4">주제</td>
              <td class="px-4"><Input id="relTopic" value={rel.topic}/></td>
          </tr>
          <tr>
              <td class="px-4">시작시간</td>
              <td class="px-4"><Input id="relStart" type="datetime-local" value={dbTimeToDateTimeLocal(rel.main_start)}/></td>
          </tr>
          <tr>
              <td class="px-4">종료시간</td>
              <td class="px-4"><Input id="relEnd" type="datetime-local" value={dbTimeToDateTimeLocal(rel.main_end)}/></td>
          </tr>
          <tr>
              <td class="px-4">구글독스 링크</td>
              <td class="px-4"><Input id="relDocs" value={rel.docs}/></td>
          </tr>
          {첫글작가입력}
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
  const relStart = chkValue('relStart')
  const relEnd = chkValue('relEnd')
  const relDocs = chkValue('relDocs')

  const model = {
    mainKey : mainKey,
    round : relRound,
    title : relTitle,
    topic : relTopic,
    timeStart : Date.parse(relStart),
    timeEnd : Date.parse(relEnd),
    docs : relDocs
  }
  if(summitOK==true){
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