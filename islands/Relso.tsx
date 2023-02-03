import { useState } from "preact/hooks"

interface RelsoProps {
    isProgress : boolean,
    progressLabel : string,
    relso: any
}

export default function Relso(props: RelsoProps){
    const [relso, setRelso] = useState(props.relso)
    let progressColor : string

    if(props.isProgress){
        progressColor = "text-green-600 font-bold"
    }else{
        progressColor = "text-red-600 font-bold"
    }
    
    return(
        <div class="p-4 items-center">
            <a>릴레이소설</a> <a class={progressColor}>{props.progressLabel}</a>
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