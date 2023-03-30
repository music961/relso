import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState, useEffect } from "preact/hooks"
import IconWriting from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/writing.tsx"

interface PropEntity {
  entry: any,
  relso: any,
  th : number,
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
        <div class="py-4 cursor-pointer hover:underline" onClick={()=>location.href=`${relso.topic_link}`}>
          {relso.round}.{relso.topic}
        </div>
        <div>
          {props.th}번째 [{entry.entry_name}]님
        </div>
        <div className="float-right">
          <button type="button" class="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex gap-2">
            <IconWriting class="w-6 h-6" />
          </button>
        </div>
        <div>
            <textarea 
                type="text"
                id="bbsTxt"
                placeholder="본문"
                class="w-full border-2 rounded-md mt-2 px-2 bg-black border-green-500 focus:border-green-600 outline-none" 
                rows={12}
                value={''}
            />
        </div>
      </div>
    )
  }
}
