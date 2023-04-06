import { useState } from "preact/hooks"

interface RelsProps {
    entrys : any,
    novels : string[]
}

export default function Entrys(props: RelsProps) {
    const entrys = props.entrys
    if(entrys){
        return (
            <div class='block w-full overflow-x-auto max-w-md mx-auto whitespace-pre-wrap'>
                <div>주자</div>
                {
                    entrys.map((entry,idx)=>(
                        <a>
                        {idx}.[{entry.entry_name}]님
                        {idx!==entrys.length-1 && <a> &gt; </a>}
                        </a>
                    ))
                }
                <br/>
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
