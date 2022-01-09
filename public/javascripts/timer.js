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

const documentTimer = document.getElementById('timer');

let newYearTime = +new Date(`Jan 1, ${new Date().getFullYear() + 1}`);

setInterval(function () {
    let currentTime = +new Date;
    let deltaTime = newYearTime - currentTime;

    deltaTime /= 1000;
    let seconds = Math.floor(deltaTime % 60).toString(11).split("").map(value => shueYears[value]).join(" ");

    deltaTime /= 60;
    let minutes = Math.floor(deltaTime % 60).toString(11).split("").map(value => shueYears[value]).join(" ");

    deltaTime /= 60;
    let hours = Math.floor(deltaTime % 24).toString(11).split("").map(value => shueYears[value]).join(" ");

    let days = Math.floor(deltaTime / 24).toString(11).split("").map(value => shueYears[value]).join(" ");

    documentTimer.innerHTML = days + "<strong> дней </strong><br>" +
        hours + "<strong> часов</strong><br>" +
        minutes + "<strong> минут</strong><br>" +
        seconds + "<strong> секунд</strong>";

}, 1000);