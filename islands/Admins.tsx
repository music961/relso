import { Button, Input } from "../components/Button.tsx"

interface AdminsProps {
    cnt: number,
    admins : any
  }

export default function Admins(props: AdminsProps) {
    const admins = props.admins
    return (
        <div>
            <div>
                <Input id='admin_add' placeholder='이메일 입력'/>
                <Button onClick={()=> adminAdd()}>관리계정 추가</Button>
            </div>
            <table class="p-4 items-center shadow-md">
                <th>번호</th>
                <th>구글계정</th>
                <th>추가날짜</th>
                <th>삭제</th>
                {
                admins.map((admin)=>
                    <tr class="mx-4">
                        <td class="px-4">{admin.admin_key}</td>
                        <td class="px-4">{admin.email}</td>
                        <td class="px-4">{convertDate(admin.admin_time)}</td>
                        <td>
                            <Button onClick={()=>
                                adminDel(admin.admin_key)
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
