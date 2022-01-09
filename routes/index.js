const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const shueYears = {
        "0": "ноль",
        "1": "целковый",
        "2": "чекушка",
        "3": "порнушка",
        "4": "пердушка",
        "5": "засирушка",
        "6": "жучок",
        "7": "мудачок",
        "8": "хуй на воротничок",
        "9": "дурачок",
        "a": "ВСЕ"
    }

    let currentYear = new Date().getFullYear() + 1;
    let shueYear = '';

    while (currentYear % 11 >= 1) {
        shueYear += Math.floor(currentYear % 11);
        currentYear = Math.floor(currentYear / 11);
    }

    shueYear = shueYear.split("").reverse().map(value => shueYears[value]).join(" ");

    res.render('index', {title: `C новым ${shueYear} годом!`});
});

module.exports = router;
