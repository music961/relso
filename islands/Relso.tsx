import { convertDate, convertTimeScale } from "../const/Function.ts"
import { sigRelso } from "../const/sig.tsx"

export default function Relso(){
    const relso = sigRelso.value
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
                    <td>⏳ {convertDate(relso.main_end)} ({convertTimeScale(relso.main_end,Date.now(),false)})</td>
                </div>
                <br/>
                <div>📜 규칙</div>
                <div>
                    {relso.role}
                </div>
                <br/>
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