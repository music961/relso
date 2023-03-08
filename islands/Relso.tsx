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
        progressColor = "text-green-600"
    }else{
        progressColor = "text-red-600"
    }
    
    return(
        <div class="p-4 items-center">
            <br/>
            <tr>
                <td>회차</td>
                <td class="px-4">{relso.round} <a class={progressColor}>{props.progressLabel}</a> </td>
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
}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }