var fs = require('fs'),
    path = require('path');

const JSONdb = require('simple-json-db');

// Сохранять данные за две недели
const LOG_ROTATE = 60*60*24*14;
// const LOG_ROTATE = 60;

const database = {

    logsList : (hwid) => {
        const db_path = path.join('.', 'database', hwid, 'logs');
        try {
            const logDirs = fs.readdirSync(db_path);
            return logDirs.map(n => path.basename(n, path.extname(n)));
        } catch (e) {
            return [];
        }
    },

    getLogs : (hwid, key) => {
        const db_path = path.join('.', 'database', hwid, 'logs');
        // Пересоздадим каталого чтобы уменьшить вероятность ошибки
        if (!fs.existsSync(db_path)){
            fs.mkdirSync(db_path, { recursive: true });
        }
        const db_file = path.join(db_path, key+'.json');
        const db = new JSONdb(db_file);
        const data = db.JSON();
        // console.log("  ===> data", data);
        let as_list = [];
        for(d in data) {
            if(data.hasOwnProperty(d)) {
                as_list.push({
                    t: d | 0,
                    v: data[d]
                })
            }
        }
        return as_list;
    },

    saveLog : (hwid, key, value) => {
        console.log("saveLog", hwid, key, value);
        // Сформируем путь до базы данных
        const db_path = path.join('.', 'database', hwid, 'logs');
        console.log("Save log to", db_path);
        if (!fs.existsSync(db_path)){
            fs.mkdirSync(db_path, { recursive: true });
        }
        const db_file = path.join(db_path, key+'.json');
        const db = new JSONdb(db_file, {syncOnWrite: true});

        // Создадим метку времени
        const ts = Math.round(+new Date() / 1000);

        // Оставим в базе данных только записи, свежее чем ts-LOG_ROTATE
        const records = db.JSON();
        for(let r in records) {
            if(records.hasOwnProperty(r)) {
                const rts = r | 0;
                if(rts + LOG_ROTATE < ts ) {
                    delete records[r];
                }
            }
        }

        console.log("Records: ", records);
        db.JSON(records);
        // db.get(state_key) || {};
        db.set(ts, value)
    }
}


module.exports = database;
