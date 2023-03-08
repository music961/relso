import { Button, Input } from "../components/Button.tsx"

interface PropsRel {
  rel: any,
  url : string
}

export default function FellModify(props : PropsRel){
  const rel = props.rel
  const d = new Date(rel.main_end)
    return (
      <div>
      <div>
        <Button onClick={()=>fellSummit(rel.main_key,props.url)}>확인</Button>
        <Button onClick={()=>fellDel(rel.fell_key)}>삭제</Button>
      </div>
      <table class="p-4 shadow-md">
          <tr>
              <td class="px-4">라운드</td>
              <td class="px-4"><Input id="fellName" value={rel.round}/></td>
          </tr>
          <tr>
              <td class="px-4">제목</td>
              <td class="px-4"><Input id="fellPhone" value={rel.title}/></td>
          </tr>
          <tr>
              <td class="px-4">주제</td>
              <td class="px-4"><Input id="fellEmail" value={rel.topic}/></td>
          </tr>
          <tr>
              <td class="px-4">시작시간</td>
              <td class="px-4"><Input id="fellEmail" type="datetime-local"/></td>
          </tr>
          <tr>
              <td class="px-4">종료시간</td>
              <td class="px-4"><Input id="fellEmail" type="datetime-local" value={d}/></td>
          </tr>
      </table>
      <div>
        <Button onClick={()=>fellSummit(rel.main_key,props.url)}>확인</Button>
      </div>
  </div>
    )
}

const fellSummit = (fellKey:any,url:string)=>{
  let summitOK = true
  const chkValue = (label:string)=> {
    const elem = document.getElementById(label).value
    // 공백이 입력되면, 실행하지 않는다.
    if(elem==''){
      summitOK = false
    }
    return elem
  }
  const fellStep = chkValue('fellStep')
  const fellName = chkValue('fellName')
  const fellPhone = chkValue('fellPhone')
  const fellEmail = chkValue('fellEmail')
  const fellAddressApplicant = chkValue('fellAddressApplicant')
  const fellAddress = chkValue('fellAddress')
  const fellPassword = chkValue('fellPassword')
  const fellPasswordChk = chkValue('fellPasswordChk')
  const fellArea = chkValue('fellArea')
  const fellLongitude = chkValue('fellLongitude')
  const fellLatitude = chkValue('fellLatitude')

  if(fellPassword==fellPasswordChk){
    const model = {
      fellKey : fellKey,
      step : fellStep,
      fellName : fellName,
      mobileNum : fellPhone,
      email : fellEmail,
      address : fellAddressApplicant,
      addressFell : fellAddress,
      password : fellPassword,
      extent : fellArea,
      x : fellLongitude,
      y : fellLatitude
    }
    if(summitOK==true){
      alert('적용되었습니다.')
      fetch(url,{
        method:'POST',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(model)
      })    
      location.replace('/fell/fellList')
    }else{
      alert('바르게 입력해 주세요')
    }
  }else{
    alert('비밀번호가 다릅니다.')
  }
}

const fellDel = async(fellKey:number)=>{
  if(confirm(`삭제하시겠습니까?`)){
      await fetch(
          `../DB/fell/runFellDel`,
          {
              method:'POST',
              headers : {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
              },
              body: JSON.stringify({fellKey:fellKey})
          }
      ) 
      location.replace('/fell/fellList')
  }
}