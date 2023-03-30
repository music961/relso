import { Button, Input } from "../components/Button.tsx"
import { useState } from "preact/hooks"
import { convertDate } from "../const/Function.ts"

interface RelsProps {
    cnt: number,
    rels : any
  }

export default function Rels(props: RelsProps) {
    const rels = props.rels
    return (
        <div>
            <div>
                <Button class="p-4" onClick={()=>location.href =`./relCreate`}>새 릴레이</Button>
            </div>
            <table class="p-4 items-center shadow-md">
                <th>회차</th>
                <th>주제</th>
                <th>제목</th>
                <th>시작</th>
                <th>종료</th>
                <th>첫글</th>
                {
                rels.map((rel)=>
                    <tr class="mx-4 cursor-pointer hover:underline" onClick={()=>location.href=`./relModify/${rel.main_key}`}>
                        <td class="px-4">{rel.round}</td>
                        <td class="px-4">{rel.topic}</td>
                        <td class="px-4">{rel.title}</td>
                        <td class="px-4">{convertDate(rel.main_start)}</td>
                        <td class="px-4">{convertDate(rel.main_end)}</td>
                        <td class="px-4">{rel.entry_name}</td>
                    </tr>
                )
                }
            </table>
        </div>

    )
  }
