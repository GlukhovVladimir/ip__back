const express = require('express')
const port = 3000   
const app = express()
var winston = require('winston');
app.use(express.json());

var logger = winston.createLogger({
    format: winston.format.json (),
    transports: [
        new winston.transports.File({
            filename: 'glukhov_lab_log.log',
            handleExceptions: true
        })
    ]
})

//все запросы
app.use((req, res, next) => {
    logger.info(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode);
    next();
});

app.get('/pingOne', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(`pingOne app listening at http://localhost:${port}/pingOne`)
    console.log(`ping app listening at http://localhost:${port}/ping`) 
    console.log(`weekDay app listening at http://localhost:${port}/weekDay`)
    console.log(`calc at http://localhost:${port}/calc`);
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/weekDay', (req, res) => {
    var selectDay = Number(req.query.selectDay);
    if (selectDay >= 1 && selectDay <= 31 && selectDay != null) {
        res.json({
            weekday: getWeekDay(selectDay)
        });
    } else {
        throw new Error("День выбран некорректно")
    }
});

app.post('/calc',(req, res) => {
    console.log("body is ", req.body);
    res.json({
        status: 'ok',
        body: score(req.body)
    });
})

function score({
    value1,
    value2,
    operation 
}) {
    switch (operation) {    
        case 'subtraction':
            return value1 - value2;
        case 'addition':
            return  value1 + value2;
        case 'multiplication':
            return value1 * value2;
        case 'division':
            if (value2 != 0)
                return value1 / value2;
            else throw new Error("На 0 делить нельзя!!!")
        default:
            throw new Error("Что-то пошло не так")
    }
}; 

function getWeekDay(selectDay) {
    var now = new Date(new Date().getFullYear(), new Date().getMonth(), selectDay)
    var result = 0
    switch (now.getDay()) {
        case 0:
            result = 'Воскресенье'
            break;
        case 1:
            result = 'Понедельник'
            break;
        case 2:
            result = 'Вторник'
            break;
        case 3:
            result = 'Среда'
            break;
        case 4:
            result = 'Четверг'
            break;
        case 5:
            result = 'Пятница'
            break;
        case 6:
            result = 'Суббота'
            break;
        default:
            throw new Error("Неизвестная ошибка")
    }
    return result;
};

//ошибки
app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
    logger.error(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode + " " + err.message);
})