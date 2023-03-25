import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState } from "preact/hooks"

interface PropsRel {
  entry: any,
  url : string
}

export default function EntryModify(props : PropsRel){
  const [entry, setEntry] = useState(props.entry); // useState 훅을 이용해 entry 상태를 관리합니다.
  
  pintoLog(`모디파이에서 받은거 ${JSON.stringify(entry)}`)
  let result = (<div/>)
  
  if(entry){
    result = (
      <div>
        {JSON.stringify(entry)}
        <table class="p-4 shadow-md">
            <tr>
                <td class="px-4">라운드</td>
                <td><Input id="relRound" value={entry.round} onChange={(e) => setEntry({...entry, round: e.target.value})}/></td>
                {/* onChange 핸들러를 이용해 Input 컴포넌트의 값을 업데이트합니다. */}
            </tr>
            <tr>
                <td class="px-4">제목</td>
                <td><Input id="relTitle" value={entry.title} onChange={(e) => setEntry({...entry, title: e.target.value})}/></td>
                {/* onChange 핸들러를 이용해 Input 컴포넌트의 값을 업데이트합니다. */}
            </tr>
        </table>
      </div>
    )
  }
  
  return result;
}