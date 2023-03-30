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
        <div class="py-4 cursor-pointer hover:underline" onClick={()=>location.href=`${relso.topic_link}`}>
          {relso.round}.{relso.topic}
        </div>
        <div class="py-4" >
          규칙
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
