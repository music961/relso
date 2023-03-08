import { useState } from "preact/hooks"

interface RelsoProps {
    relso: any
}

export default function Relso(props: RelsoProps){
    const [relso, setRelso] = useState(props.relso)
    if(relso){
        return(
            <div class="p-4 items-center">
                <br/>
                <tr>
                    <td>회차</td>
                    <td class="px-4">{relso.round} </td>
                </tr>
                <tr>
                    <td>주제</td>
                    <td class="px-4">{relso.topic}</td>
                </tr>
                <tr>
                    <td>마감</td>
                    <td class="px-4">{convertDate(relso.main_end)}</td>
                </tr>
            </div>
        )
    }else{
        return(
            <div class="p-4 items-center">
                진행중인 릴레이가 없습니다.
            </div>
        )
    }

}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }