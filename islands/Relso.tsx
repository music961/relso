import { convertDate, convertTimeScale } from "../const/Function.ts"

interface RelsoProps {
    relso: any
}

export default function Relso(props: RelsoProps){
    const relso = props.relso
    if(relso){
        return(
            <div class="p-4 items-center">
                <tr onClick={()=>location.href=`${relso.docs}`}>
                    <td class="px-4">{relso.round}.{relso.topic}</td>
                </tr>
                <tr>
                    <td class="px-4">마감 : {convertDate(relso.main_end)} ({convertTimeScale(relso.main_end,Date.now(),false)})</td>
                </tr>
                <tr>
                    <td class="px-4"></td>
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