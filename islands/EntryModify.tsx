import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState, useEffect } from "preact/hooks"

interface PropEntity {
  entry: any,
  url : string
}

export default function EntryModify(props : PropEntity){
  const [entry, setEntry] = useState(props.entry);

  pintoLog(`모디파이에서 받은거 ${JSON.stringify(entry)}`)

  useEffect(() => {
    setEntry(props.entry);
  }, [props.entry]);

  let result = (<div/>);

  if(entry){
    result = (
      <div>
        {JSON.stringify(entry)}
        <table class="p-4 shadow-md">
            <tr>
                <td class="px-4">라운드</td>
                <td><Input id="relRound" value={JSON.stringify(entry)}/></td>
            </tr>
            <tr>
                <td class="px-4">제목</td>
                <td><Input id="relTitle" value={entry.age}/></td>
            </tr>
        </table>
      </div>
    );
  }

  return result;
}
