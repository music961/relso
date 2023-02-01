import { useState } from "preact/hooks"

interface RelsoProps {
    relso: any
}

export default function Relso(props: RelsoProps){
    const [relso, setFells] = useState(props.relso)
    return(
        <div class="p-4 items-center">
            <h1>릴레이소설</h1>
            <br/>
            <tr>
                <td>회차</td>
                <td class="px-4">{relso[0].round}</td>
            </tr>
            <tr>
                <td>주제</td>
                <td class="px-4">{relso[0].topic}</td>
            </tr>
            <tr>
                <td>시작</td>
                <td class="px-4">{convertDate(relso[0].main_start)}</td>
            </tr>
            <tr>
                <td>종료</td>
                <td class="px-4">{convertDate(relso[0].main_end)}</td>
            </tr>
            <tr>
                <td>남은 시간</td>
                <td class="px-4"><input id='mainTimer' class="bg-black" value='' readOnly/></td>
            </tr>
        </div>
    )
}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }