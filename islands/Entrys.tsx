import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/copy.tsx"
import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/edit.tsx"

interface RelsProps {
    entrys : any,
    novels : string[]
}

export default function Entrys(props: RelsProps) {
    const entrys = props.entrys
    if(entrys){
        return (
            <div class='block w-full overflow-x-auto max-w-md mx-auto whitespace-pre-wrap'>
                <div>
                    🏃🏻‍♀️주자
                </div>
                {
                    entrys.map((entry,idx)=>(
                        <a>
                        {idx+1}.[{entry.entry_name}]님
                        {idx!==entrys.length-1 && <a> &gt; </a>}
                        </a>
                    ))
                }
                <div><br/></div>
                <hr/>
                {
                    entrys.map((entry, idx) => (
                        <div>
                            <br/>
                            <div class="flex justify-between">
                                <div>
                                    {idx+1}번째 [{entry.entry_name}]님
                                </div>
                                <div class="flex">
                                    <IconEdit 
                                        class="w-6 h-6"
                                        onClick={()=>
                                            alert('수정버튼 준비중')
                                        }
                                    />
                                    <IconCopy 
                                        class="w-6 h-6" 
                                        onClick={()=>
                                            window.navigator.clipboard.writeText(
                                                `${idx+1}번째 [${entry.entry_name}]님\n\n`+props.novels[idx]
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <br/>
                            <div 
                                class='block w-full overflow-x-auto max-w-md mx-auto whitespace-pre-wrap text-base'
                            >
                                {props.novels[idx]}
                            </div>
                            <br/><br/>
                        </div>
                    ))
                    }

            </div>
        )
    }else{
        return(<div/>)
    }
  }