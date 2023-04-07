import { jwtDec, format, validate, hexEnc, hexDec} from "../deps.ts"

function jwtokenDecode(token: any) {
	const a = validate(jwtDec(token))
	return a.payload
}

const rawKey = new TextEncoder().encode("studio_machete_pinto_sanlim_proj") // 16 의 배수여야 한다.
const iv = new TextEncoder().encode("studiomachete961") // 16글자여야 한다.

const key = await crypto.subtle.importKey(
  "raw",
  rawKey.buffer,
  "AES-CBC",
  true,
  ["encrypt", "decrypt"],
)

async function usrKeyEnc(usrKey : any) : Promise<string> {
	const encrypted = await crypto.subtle.encrypt(
		{ name : "AES-CBC" , iv},
		key,
		new TextEncoder().encode(usrKey)
	)
	const encryptedBytes = new Uint8Array(encrypted)
	const hexBytes = new TextDecoder().decode((hexEnc(encryptedBytes)))
	return hexBytes
}

async function usrKeyDec(token : any) : Promise<number> {
	const decrypted = await crypto.subtle.decrypt(
		{ name : "AES-CBC", iv},
		key,
		hexDec(new TextEncoder().encode(token))
	)
	return +new TextDecoder().decode(new Uint8Array(decrypted))
}

let lastLogTime = ""

const pintoLog = (params:any) => {
	const nowTime = format(new Date(), "yyyy-MM-dd HH:mm:ss")
	if(nowTime!=lastLogTime){
		lastLogTime = nowTime
		console.log(`[${nowTime}]`)
	}
	console.log(params)
}

const dbTimeToDateTimeLocal = (dbTime : number)=>{
	let param = dbTime
	if(!dbTime){
		const now = new Date()
		now.setMinutes(0)
		now.setSeconds(0)
		param = now.getTime()
	}
	return new Date(new Date(param).getTime()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,-5)
}

const dateTimeLocalToDbTime = (dateTimeLocal:string)=>{
	return 0
}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString('default',{dateStyle:'short',timeStyle:'short',hour12:false})
  }

const convertTimeScale = (t1:number,t2:number,isAgo:boolean) =>{
	const diff = (t1-t2)/1000
	let tail = '후'
	if(isAgo){
		tail = '전'
	}

	const interval = {
	  년: 31536000,
	  월: 2592000,
	  주: 604800,
	  일: 86400,
	  시간: 3600,
	  분: 60
	}
  
	for (const [unit, secondsInUnit] of Object.entries(interval)) {
	  const count = Math.floor(diff / secondsInUnit);
	  if (count > 0) {
		return `${count} ${unit} ${tail}`;
	  }
	}
	if(isAgo){
		return '방금'
	}else{
		if(diff>0){
			return '곧'
		}else{
			return '시간 초과'
		}
	}
}


export { convertDate,convertTimeScale, jwtokenDecode, pintoLog, usrKeyEnc, usrKeyDec,dbTimeToDateTimeLocal  }