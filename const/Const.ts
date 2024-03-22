import { signal } from "@preact/signals"

const oauthId = "602990314098-bvs1v7oj71pmbb9m4ptp9aq68jeg10k7.apps.googleusercontent.com"
const oauthSecret = "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"
const oauthRedirect = "https://relso.deno.dev/DB/runGoogleAuth"

const sigRelso = signal<any>({})
const sigEntry = signal<any>({})
 

export { oauthId, oauthRedirect, oauthSecret}