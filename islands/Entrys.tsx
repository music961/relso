import { useState } from "preact/hooks"

interface RelsProps {
    entrys : any,
    novels : string[]
}

export default function Entrys(props: RelsProps) {
    const entrys = props.entrys
    if(entrys){
        return (
            <div>
                <hr/>
                {
                    entrys.map((entry,idx)=>(
                        <div class='flex'>
                        <a>{idx}.[entry.entry_name]님</a>
                        {idx!==entrys.length-1 && <a>&gt;</a>}
                        </div>
                    ))
                }
                <hr/>
                {
                    entrys.map((entry, idx) => (
                        <div>
                            <br/>
                            <div>
                                {idx+1}번째 [{entry.entry_name}]님
                            </div>
                            <br/>
                            <pre class='block w-full overflow-x-auto max-w-md mx-auto whitespace-pre-wrap'>
                                {props.novels[idx]}
                            </pre>
                            <br/>
                        </div>
                    ))
                    }

            </div>
        )
    }else{
        return(<div/>)
    }
  }
