var fs = require('fs'),
    path = require('path');


const JSONdb = require('simple-json-db');

var crypto = require("crypto");
var Id = () => crypto.randomBytes(8).toString('hex');

// const Database = require('better-sqlite3');


// Сохранять данные за две недели
const LOG_ROTATE = 60*60*24*14;
// const LOG_ROTATE = 60;

const dbPath = (...args) => {
    const db_path = path.join('.', ...args);
    if (!fs.existsSync(db_path)){
        fs.mkdirSync(db_path, { recursive: true });
    }
    return db_path;
}

const seriesFilename = (hwid, id) => {
    const db_path = dbPath('database', hwid, 'series');
    return path.join(db_path, `${id}.txt`);
}

const seriesDB = (hwid) => {
    const db_path = dbPath('database', hwid);
    // База данных для серии будет .... думаем

    // Управляющие файл, где хранится информация о текущей серии
    const db_file = path.join(db_path, 'series.json');
    const db = new JSONdb(db_file, {syncOnWrite: true});

    return db;
}

const database = {

    startSeries : (hwid, key) => {
        console.log("Start series:", hwid, key);
        // const db_path = `./test-series-${hwid}-${key}.db`;
        const db = seriesDB(hwid);

        // Создадим метку времени для начала серии
        const ts = Math.round(+new Date() / 1000);

        const id = `${ts}_${Id()}`;

        // Проверим, возможно уже открыта серия.
        var active = db.get("active");
        if(active) {
            // TODO: Закроем предыдущую серию с флагом "незакрытася серия"
            console.log("Warning! (TODO) Incorrect closed series:", active.key);
        }

        // Создадим файл для сохранения серии
        // const db_path = dbPath('database', hwid, 'series');
        fs.closeSync(fs.openSync(seriesFilename(hwid, id), 'w'));

        // Откроем новую серию
        db.set("active", {
            id, ts, key,
            start: ts
        });

    },
    insertDataToSeries : (hwid, data) => {
        console.log("Data for series:", hwid, data);
        // const db_path = dbPath('database', hwid, 'series');
        // const db = seriesDB(hwid);

        // Создадим метку времени
        const ts = Math.round(+new Date() / 1000);
        // const db = new Database(`./test-series-${hwid}-${key}.db`, { verbose: console.log });
        // const result = db.exec(`INSERT INTO series (ts, value) VALUES (${ts}, ${value})`);

        const db = seriesDB(hwid);
        var active = db.get("active");
        if(!active) {
            console.log("Series is not started.");
            return;
        }

        // const dataLines = data.map(JSON.stringify).join('\n');

        fs.appendFileSync(seriesFilename(hwid, active.id), JSON.stringify({ts, data}) + '\n');

    },
    stopSeries : (hwid, key) => {
        console.log("Stop series:", hwid, key);
        // const db_path = dbPath('database', hwid, 'series');
        // База данных для серии будет .... думаем

        const db = seriesDB(hwid);
        var active = db.get("active");
        if(!active) {
            console.log("Series is not started.");
            return;
        }
        const ts = Math.round(+new Date() / 1000);

        // const db = new Database('./test-series.db', { verbose: console.log });
        // const insert = db.prepare(`INSERT INTO series (ts, value) VALUES (${ts}, ${})`);

        // TODO: Это бы сделать через транзакцию
        const series = db.get("series") || [];
        const s = {
            key: active.key,
            start: active.start,
            stop: ts,
            id: active.id
        };
        series.push(s);
        db.set("series", series);

        // Создадим файл для сохранения серии
        // const db_path = dbPath('database', hwid, 'series');
        // fs.closeSync(fs.openSync(seriesFilename(hwid, id), 'w'));

        // Закроем активную серию
        db.delete("active");

    },

    seriesList : (hwid) => {
        const db = seriesDB(hwid);
        const series = db.get("series") || [];
        return series;
    },


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
        // const db_path = path.join('.', 'database', hwid, 'logs');
        const db_path = dbPath('database', hwid, 'logs');
        console.log("Save log to", db_path);
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
