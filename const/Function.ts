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
		param = Date.now()
	}
	return new Date(new Date(param).getTime()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,-5)
}

const dateTimeLocalToDbTime = (dateTimeLocal:string)=>{
	return 0
}

const convertDate = (time:number)=>{
    const d = new Date(time)
    return d.toLocaleString()
  }


export { convertDate, jwtokenDecode, pintoLog, usrKeyEnc, usrKeyDec,dbTimeToDateTimeLocal  }