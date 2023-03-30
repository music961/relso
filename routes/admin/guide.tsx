import Layout from "../../components/Layouts.tsx"

export default function main(){
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
            <br/>
            [문의사항 및 피드백]<br/><br/>
            릴소사 민호<br/><br/>
            [패치노트]
            <br/><br/>
            v.0.1.2(30th Mar 23')<br/><br/>
            - 릴레이 등록시, 규칙을 추가할 수 있습니다.
            - 제출시, 본문을 입력하도록 변경했습니다.
            <br/><br/>
            v.0.1.1(26th Mar 23')<br/><br/>
            - 그림, 음악 등 링크가 있는 주제일 경우, 주제를 클릭하면 링크를 볼 수 있습니다.
            - 구글독스 링크를 제거했습니다.
            <br/><br/>
            v.0.1.0(17th Mar 23')<br/><br/>
            - 관리자가 릴레이를 등록할 때, 첫글과 구글독스 링크를 첨부해야 합니다. 이것은 수정할 수 있습니다.<br/>
            - 상단 릴레이 주제를 클릭하면 릴레이 구글독스로 이동할 수 있습니다.<br/>
            - 릴레이 첫글을 쓴 사람은 주자 목록에 자동 등록됩니다.<br/>
            - 예약자에게 선언기회가 주어졌을 때 예약을 포기할 수 있습니다.<br/>
            <br/><br/>
            v.0.0.2(16th Mar 23')<br/><br/>
            - 예약이 지속되던 문제가 개선되었습니다.<br/>
            - 마지막 주자와 같은 닉네임으로 주자등록 할 수 있었던 문제가 개선되었습니다.<br/>
            - 진행중인 주자와 같은 닉네임으로 예약할 수 있었던 문제가 개선되었습니다.<br/>
            - 주자 등록시, placeholder에 몇 번째 주자인지 제대로 표시되지 않던 문제가 개선되었습니다.<br/>
            <br/><br/>
            v.0.0.1(10th Mar 23')<br/><br/>
            - 릴레이소설의 등록, 예약이 가능합니다.<br/>
            - 관리페이지에서 릴레이소설을 등록하고 일정을 조정할 수 있습니다.

        </div>
    </Layout>
  )  
}