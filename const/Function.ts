const pintoLog = (params:any) => {
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


export { convertDate,convertTimeScale, pintoLog, dbTimeToDateTimeLocal  }