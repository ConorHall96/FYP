const Promise = require('bluebird')
const Settings = require('./settings')
const db = require('./db')

const run = async () => {
    job = 1;
    for( i = 0; i < 10; i ++){
        console.log('Job' + job)
        const records = Array(Settings.maxRows)
            .fill()
            .map((e, x) => [x + 1, `product${x}${i}`])
        
        var start=Date.now();
        console.time('insert')
        const conn = await db()
        const stmt = `insert into ${Settings.table} values ?`
        await conn.query(`truncate table ${Settings.table}`)
        await Promise.each(records, r => {
            return conn.query(stmt, [[r]])
        })
        await conn.end()
        var end=Date.now();
        console.log("Job#" + job + ' inserted ' + Settings.maxRows + ' in ' + (end - start)/1000.0 + 's');
        job = job + 1
    }
}
run()
