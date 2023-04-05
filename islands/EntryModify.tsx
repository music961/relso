import { Button, Input } from "../components/Button.tsx"
import { dbTimeToDateTimeLocal, pintoLog } from "../const/Function.ts"
import { useState, useEffect } from "preact/hooks"
import IconPencil from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/pencil.tsx"

interface PropEntity {
  entry: any,
  relso: any,
  th : number,
  url : string
}

export default function EntryModify(props : PropEntity){
  const [entry, setEntry] = useState(props.entry)
  const [relso, setRelso] = useState(props.relso)

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
          <button 
            class="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex gap-2" 
            onClick={()=>entrySummit(entry.entry_key)}
          >
            <IconPencil class="w-4 h-4" />
          </button>
        </div>
        <div>
            <textarea 
                type="text"
                id="entryNovel"
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

const entrySummit = (entryKey:number)=>{
  let summitOK = true
  const chkValue = (label:string)=> {
    const elem = document.getElementById(label).value
    // 공백이 입력되면, 실행하지 않는다.
    if(elem==''){
      summitOK = false
    }
    return elem
  }
  const novel = chkValue('entryNovel')
  if(summitOK){
    if(confirm(`제출하시겠습니까? ${entryKey}`)){
      const model = {
          entryKey : entryKey,
          state : 1,
          novel : novel
      }
      fetch('../DB/entry/runEntryWrited',{
          method:'POST',
          headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
          },
          body: JSON.stringify(model)
      })    
      location.replace('/')
    }
  }else{
    alert('바르게 입력해 주세요')
  } 

}