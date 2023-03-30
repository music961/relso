import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState, useEffect } from "preact/hooks"

interface PropEntity {
  entry: any,
  relso: any,
  url : string
}

export default function EntryModify(props : PropEntity){
  const [entry, setEntry] = useState(props.entry)
  const [relso, setRelso] = useState(props.relso)
  // useEffect(() => {
  //   setEntry(props.entry);
  // }, [entry]);

  if (!entry) {
    return <div>Loading...</div>;
  }else{
    return (
      <div>
        <table class="p-4 shadow-md">
            <tr>
                <td class="px-4">이름</td>
                <td><Input id="relRound" value={entry.name}/></td>
            </tr>
            <tr>
                <td class="px-4">제목</td>
                <td><Input id="relTitle" value={relso.topic}/></td>
            </tr>
        </table>
      </div>
    )
  }
}
