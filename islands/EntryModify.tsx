import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState } from "preact/hooks"

interface PropsRel {
  entry: any,
  url : string
}

export default function EntryModify(props : PropsRel){
  const [entry, setEntry] = useState(props.entry)
  
  const handleChange = (event: any) => {
    const { id, value } = event.target
    setEntry((prevEntry) => ({
      ...prevEntry,
      [id]: value
    }))
  }
  
  pintoLog(`모디파이에서 받은거 ${JSON.stringify(entry)}`)
  let result = (<div/>)
  if(entry){
    result = (
      <div>
        {JSON.stringify(entry)}
        <table class="p-4 shadow-md">
            <tr>
                <td class="px-4">라운드</td>
                <td><Input id="relRound" value={entry.relRound} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td class="px-4">제목</td>
                <td><Input id="relTitle" value={entry.relTitle} onChange={handleChange}/></td>
            </tr>
        </table>
      </div>
    )
  }
  return result
}
