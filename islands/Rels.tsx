import { Button, Input } from "../components/Button.tsx"
import { useState } from "preact/hooks"

interface RelsProps {
    cnt: number,
    rels : any
  }

export default function Admins(props: RelsProps) {
    const rels = props.rels
    return (
        <div>
            <div>
                <Input id='admin_add' placeholder='이메일 입력'/>
                <Button onClick={()=> adminAdd()}>관리계정 추가</Button>
            </div>
            <table class="p-4 items-center shadow-md">
                <th>번호</th>
                <th>회차</th>
                <th>주제</th>
                <th>시작</th>
                <th>종료</th>
                {
                rels.map((rel)=>
                    <tr class="mx-4">
                        <td class="px-4">{rel.main_key}</td>
                        <td class="px-4">{rel.round}</td>
                        <td class="px-4">{rel.topic}</td>
                        <td class="px-4">{convertDate(rel.main_start)}</td>
                        <td class="px-4">{convertDate(rel.main_end)}</td>
                        <td class="px-4">{rel.title}</td>
                        <td>
                            <Button onClick={()=>
                                adminDel(rel.main_key)
                            }>삭제</Button>
                        </td>
                    </tr>
                )
                }
            </table>
        </div>

    )
  }
  
  const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }

  const adminDel = async(adminKey:number)=>{
    if(confirm(`삭제하시겠습니까?`)){
        await fetch(
            `../../DB/admin/runAdminDel`,
            {
                method:'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({adminKey:adminKey})
            }
        ) 
        location.replace('/admin/adminList')
    }
}

const adminAdd =() => {
    let summitOK = true
    const chkValue = (label:string)=> {
        const elem = document.getElementById(label).value
        // 공백이 입력되면, 실행하지 않는다.
        if(elem==''){
          summitOK = false
        }
        return elem
      }
    const email = chkValue('admin_add')
    if(summitOK==true){
        fetch('/DB/admin/runAdminAdd',{
            method:'POST',
            headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email:email})
          })
        location.replace('/admin/adminList')
    }
}
