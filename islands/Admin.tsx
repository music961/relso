import { Button, Input } from "../components/Button.tsx"
import { GoogleOAuth } from "https://deno.land/x/google@0.0.7/oauth.ts"
import { useState } from "preact/hooks"

interface AdminProps {
    isLogin : boolean,
    session : Record<string, string>
  }

export default function Admin(props: AdminProps) {
    const ga = new GoogleOAuth({
        client_id : "602990314098-bvs1v7oj71pmbb9m4ptp9aq68jeg10k7.apps.googleusercontent.com",
        client_secret : "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",
        redirect_uri : "https://relso.deno.dev/DB/runGoogleAuth",
        "scopes" : [
            "https://www.googleapis.com/auth/userinfo.email",
        ]
    })
    const link = ga.buildAuthLink()
    const [isLogin, setIsLogin] = useState(props.isLogin)
    const [adminEmail, setAdminEmail] = useState(props.session.aabbcc)
    let result = (
        <div>
            <Button onClick={()=>    
                location.href = link
                }>로그인</Button>
        </div>
    )
    if(isLogin){
        result= (
            <div>
            <div>
                <Button onClick={()=>
                    location.href = link
                    }>로그인</Button>
                <Button onClick={()=>{
                    setAdminEmail('')
                    setIsLogin(false)
                    fetch(
                        `../DB/admin/runLogout`,
                        {
                            method:'GET',
                            headers : {
                                'Accept' : 'application/json',
                                'Content-Type' : 'application/json'
                            }
                        }
                    ) 
                }
                    }>로그아웃</Button>
                <Button onClick={()=>{
                    location.href = "/admin/adminList"
                }
                }>관리계정</Button>
            </div>
            <div>
                <a>관리자 : {adminEmail}</a>
            </div>
          </div>
        )
    }
    return result
  }
  