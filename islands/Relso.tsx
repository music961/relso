import { convertDate, convertTimeScale } from "../const/Function.ts"

interface RelsoProps {
    relso: any
}

export default function Relso(props: RelsoProps){
    const relso = props.relso
    if(relso){
        return(
            <div class='block w-full overflow-x-auto max-w-md mx-auto whitespace-pre-wrap'>
                <div>
                    <td>{relso.round}.{relso.cat}/{relso.concept}</td>
                </div>
                <div onClick={()=>location.href=`${relso.topic_link}`}>
                    <td class="cursor-pointer hover:underline">{relso.topic}</td>
                </div>
                <div>
                    <td>마감 : {convertDate(relso.main_end)} ({convertTimeScale(relso.main_end,Date.now(),false)})</td>
                </div>
                <br/>
                <div>규칙</div>
                <div>
                    {relso.role}
                </div>
            </div>
        )
    }else{
        return(
            <div class="items-center">
                진행중인 릴레이가 없습니다.
            </div>
        )
    }
}