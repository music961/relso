import { useSignal } from "@preact/signals";

const oauthId = "602990314098-bvs1v7oj71pmbb9m4ptp9aq68jeg10k7.apps.googleusercontent.com"
const oauthSecret = "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"
const oauthRedirect = "https://relso.deno.dev/DB/runGoogleAuth"

// 240322 앤디 : Entrys를 초기화시키는 용도로 사용
// const cxtEntry = useSignal({
//     round : '',
//     topic : '',
//     novel : ''
// })

export { oauthId, oauthRedirect, oauthSecret}