import { PageProps, Handlers } from "$fresh/server.ts"
import Layout from "../../components/Layouts.tsx"
import Admin from "../../islands/Admin.tsx"

export default function main({data}:PageProps){
  return(
    <Layout>
        <div>
            <br/>
            [사용자]<br/><br/>
            릴소사의 규칙대로 릴레이를 선언하고 예약할 수 있습니다.<br/>
            이 앱은 로그인 기능이 없기 때문에,<br/>
            진행이나 예약시 내 닉네임이 등록되었는지 잘 확인해야 합니다.<br/>
            릴레이 선언이나 예약시, 채팅방에도 같이 선언하는 것을 권장합니다.<br/>
            화면이 갱신되지 않을 경우, 새로고침을 한 번 해주세요.<br/>
            <br/>
            [관리자]<br/><br/>
            관리하기 위해서는 구글 로그인이 필요합니다.<br/>
            관리계정에서 구글 로그인이 가능한 email 을 추가하거나 삭제할 수 있습니다.<br/>
            관리페이지에서 새 릴레이를 생성할 수 있습니다.<br/>
            <a class="text-red-400">주의사항</a> : 첫 글을 쓴 사람을 자동으로 등록하는 기능은 아직 없습니다.<br/>
            릴레이 회차 시작시, 첫번째 글을 쓴 사람을 등록하고 제출해야 합니다.<br/>
            이것을 자동으로 하는 기능은 곧 구현할 예정입니다.<br/>
            <br/>
            [문의사항 및 피드백]<br/><br/>
            릴소사 민호<br/><br/>
            [패치노트]<br/><br/>
            v.0.0.1(10th Mar 23')<br/><br/>
            - 릴레이소설의 등록, 예약이 가능합니다.<br/>
            - 관리페이지에서 릴레이소설을 등록하고 일정을 조정할 수 있습니다.


        </div>
    </Layout>
  )  
}