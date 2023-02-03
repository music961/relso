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
                <td>마감</td>
                <td class="px-4">{convertDate(relso[0].main_end)}</td>
            </tr>
        </div>
    )
}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }