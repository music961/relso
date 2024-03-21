interface RelsProps {
    entrys : any,
    novels : string[]
}

export default function Entrys(props: RelsProps) {
    const entrys = props.entrys
    if(entrys){
        return (
            <div class='block w-full overflow-x-auto max-w-md mx-auto whitespace-pre-wrap'>
                <div class="flex">
                    <div class="mr-2">
                        주자
                    </div>
                    <div>
                        복사
                    </div>
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
                            <div>
                                {idx+1}번째 [{entry.entry_name}]님
                            </div>
                            <br/><br/>
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
