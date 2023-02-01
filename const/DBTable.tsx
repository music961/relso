import { Client } from 'mariaDB'
import { pintoLog } from "./Function.ts"
import { pintoDBHostName, pintoDBUsrName, pintoDBPassword} from "./Const.ts"

const maria = new Client()

const restartMaria = () => {
	maria.close()
	maria.connect({
		charset : "utf8mb4",
		hostname : pintoDBHostName,
		username: pintoDBUsrName,
		password: pintoDBPassword,
		db:`relso`
	})
}
restartMaria()

let lastQuery = ''

const exe = (query:string,param?:any[]) => {
	lastQuery =`${query} : ${param}`
	pintoLog(lastQuery)
	maria.execute(query,param)
}

const select = (query:string,param?:any[]) : Promise<any> => {
	lastQuery = `${query} : ${param}`
	pintoLog(lastQuery)
	return maria.query(`select ${query}`,param)
}

const insert = (query:string,param?:any[]) => {
	exe(`insert ${query}`,param)
}

const update = (query:string,param?:any[]) => {
	exe(`update ${query}`,param)
}

const del = (query:string,param?:any[]) => {
	exe(`delete from ${query}`,param)
}

const cnt = async(query:string,param?:any[]) : Promise<number> => {
	const result = await select(`count(*) cnt from ${query}`,param)
	return result[0].cnt
}

const sum = async(query:string,param?:any[]) : Promise<number> => {
	const result = await select(`sum(*) sum from ${query}`,param)
	return result[0].sum
}

const isHave = async(query:string,param?:any[]) : Promise<boolean> => {
	const result = await select(`exists(select * from ${query}) as have`,param)
	return result[0].have>0
}

const insertReturning = async(query:string,keyName:string,param?:any[]) : Promise<any> => {
	lastQuery = `${query} : ${param}`
	pintoLog(lastQuery)
	return await maria.query(`insert ${query} returning ${keyName}`,param)
}

export { cnt, del, exe, maria , select, insert,insertReturning, isHave,
	sum, update}