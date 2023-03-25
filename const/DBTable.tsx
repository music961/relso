import { Client } from 'mariaDB'
import { pintoLog } from "./Function.ts"

const maria = new Client()

const restartMaria = () => {
	maria.close()
	maria.connect({
		charset : "utf8mb4",
		hostname : Deno.env.get('db_host_name'),
		username: Deno.env.get('db_usr_name'),
		password: Deno.env.get('db_password'),
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
	const [returning] = await maria.query(`insert ${query} returning ${keyName}`,param)
	return returning
}

export { cnt, del, exe, maria , select, insert,insertReturning, isHave,
	sum, update}