import { Button, Input } from "../components/Button.tsx"
import { GoogleOAuth } from "https://deno.land/x/google@0.0.7/oauth.ts"
import { useState } from "preact/hooks"
import { oauthId, oauthRedirect, oauthSecret } from "../const/Const.ts"

interface AdminProps {
    isLogin : boolean,
    session : Record<string, string>
  }

export default function Admin(props: AdminProps) {
    const ga = new GoogleOAuth({
        // client_id : Deno.env.get('oauth_id')||'',
        // client_secret : Deno.env.get('oauth_secret')||'',
        // redirect_uri : Deno.env.get('oauth_redirect')||'',
        client_id : oauthId,
        client_secret : oauthSecret,
        redirect_uri : oauthRedirect,
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
                <Button 
                    onClick={
                        ()=>{
                            location.href = "/admin/relList"
                        }
                    }>릴레이관리
                </Button>
                <Button 
                    onClick={
                        ()=>{
                            location.href = "/admin/adminList"
                        }
                    }>관리계정
                </Button>
                <Button 
                    onClick={
                        ()=>{
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
            </div>
            <div>
                <a>관리자 : {adminEmail}</a>
            </div>
          </div>
        )
    }
    return result
  }
  