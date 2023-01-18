const time = new Date();
const month = time.getMonth();
const firstDay = new Date(time.getFullYear(), time.getMonth(), 1);
const lastDay = new Date(time.getFullYear(), time.getMonth() + 1, 0);
const targetMonth = document.querySelector('.month');
const targetWeekDay = document.querySelector('.weekday');
const endTime = new Date();
const personWorkDay = document.querySelector('.personWorkDay');
const personWorkNight = document.querySelector('.personWorkNight');
const thisMonth = document.querySelector('.thisMonth');
const user = sessionStorage.getItem('myKey');

const createMonthElement = (box, element, soText, soClass) => { //функция принимет: элемент, родителя, текст, класс
    const newElement = document.createElement(box);       // создаем элемент
    element.appendChild(newElement);                     // присваиваем созданный выше элемент родителю
    newElement.classList.add(soClass);                  // присваиваем созданному элементу div класс
    newElement.innerHTML = soText;                     // присваиваем созданному элементу текст
};

const bigPerson = {
    name: [
        {name: 'Сверчков А.А.'},
        {name: 'Руф Э.А.'},
        {name: 'Беляев Д.В.'},
        {name: 'Сушков Ю.В.'},
        {name: 'Поддубный С.А.'},
        {name: 'Готовцев А.Ю.'},
        {name: 'Осовский А.И.'},
        {name: 'Бураков П.В.'},
        {name: 'Станчев С.С.'},
        {name: 'Попов М.С.'},
        // {name: 'Градинар Д.В.'}
    ],
    id: [
        {id: 'person1'},
        {id: 'person2'},
        {id: 'person3'},
        {id: 'person4'},
        {id: 'person5'},
        {id: 'person6'},
        {id: 'person7'},
        {id: 'person8'},
        {id: 'person9'},
        {id: 'person10'},
        // {id: 'person11'},
    ],
    day: [
        {day: [18, 22, 26, 30]},       
        {day: [2, 7, 11, 15, 20, 24]},       
        {day: [1, 6, 10, 16, 19, 23, 27, 31]},       
        {day: [4, 8, 13, 17, 21, 25, 29]},       
        {day: [5, 8, 12]},       
        {day: [3, 9, 14, 20, 24, 28, 30]},       
        {day: [1, 5, 10, 14, 18]},       
        {day: [3, 7, 11, 15, 19, 23, 27, 30]},       
        {day: [2, 6, 12, 16, 21, 25, 28]},       
        {day: [4, 9, 13, 17, 22, 26, 29]},       
        // {day: [18, 22, 26, 30]},       
    ],
    night: [
        {night: [19, 23, 27, 31]},
        {night: [3, 8, 12, 16, 21, 25]},
        {night: [2, 7, 11, 17, 20, 24, 28]},
        {night: [1, 5, 9, 14, 18, 22, 26, 30]},
        {night: [6, 9, 13]},
        {night: [4, 10, 15, 21, 25, 29]},
        {night: [2, 6, 11, 15, 19]},
        {night: [4, 8, 12, 16, 20, 24, 28, 31]},
        {night: [3, 7, 13, 17, 22, 26, 29]},
        {night: [1, 5, 10, 14, 18, 23, 27, 30]},
        // {night: [19, 23, 27, 31]},
    ]
};

const monthDay = [];
const week = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].forEach(item => { createMonthElement('div', targetWeekDay, item, 'weekDay')});

for (i = 1; i <= lastDay.getDate(); i++) {
    monthDay.push(i);
};

const createDays = () => {
    const childElem = document.querySelectorAll('.day')
    childElem.forEach(item => { item.remove() });
    monthDay.forEach(item => { createMonthElement('div', targetMonth, item, 'day') });
    thisMonth.innerHTML = time.toLocaleDateString('default', {month: 'long'}).toUpperCase();
};

createDays();

const firstDayAttribut = document.querySelector('.month')
firstDayAttribut.firstElementChild.style.gridColumn = firstDay.getDay();

const dropButton = document.querySelectorAll('.dropButton');

dropButton.forEach((item, index) => item.addEventListener('click', function (){
    sessionStorage.setItem('myKey', index);
    document.location.reload();
    console.log(index);
}))

let getTimeRemaining = (endTime) => {

    let t = Date.parse(endTime) - Date.parse(new Date());
    let second = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor((t / (1000 * 60 * 60 * 24)));
    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: second,
    };
};

// отображение отсчёта до "дедлайна"
let initializeClock = (classNameClock, endTime) => {
    let clock = document.querySelector(classNameClock);
    let updateClock = () => {
        let t = getTimeRemaining(endTime);
        clock.innerHTML = `${t.days} д. ${t.hours}:${('0' + t.minutes).slice(-2)}:${('0' + t.seconds).slice(-2)}`;
    };
    updateClock();
    setInterval(updateClock, 1000);
};

const getEndTime = (e) => {
    const arr = bigPerson.day[e].day.concat(bigPerson.night[e].night);

    const lineArr = arr.sort((a, b) => {
        return a - b;
    });
    
    const newArr = lineArr.filter(num => num > time.getDate());
    
    endTime.setDate(newArr[0]);
    endTime.setHours(0, 0, 0, 0);

        if (bigPerson.day[e].day.includes(newArr[0])) {
            endTime.setHours(08);
        } else {endTime.setHours(20);}
};

const graficFunc = (e) => {
    const personChild = document.querySelectorAll('.wday');
    const dayElem = document.querySelectorAll('.day');
    personChild.forEach(item => { item.classList.remove('wday') });
    bigPerson.day[e].day.forEach(item => {
        if (item <= dayElem.length) {
            dayElem[item - 1].classList.add('wday');
        } else { }
    });
    const personChilds = document.querySelectorAll('.night');
    personChilds.forEach(item => { item.classList.remove('night') });
    bigPerson.night[e].night.forEach(item => {
        if (item <= dayElem.length) {
            dayElem[item - 1].classList.add('night');
        } else { }
        return graficFunc;
    });
};

const arrPersonDay = [];
const arrPersonNight = [];


for (i = 1; i <= lastDay.getDate(); i++) {
    arrPersonDay.push({key: i})
    arrPersonNight.push({key: i})
};

const innerNameDay = (e) => {
    bigPerson.day[e].day.forEach(item => {
        if (arrPersonDay[item - 1].hasOwnProperty('firstNameDay')) {
            arrPersonDay[item - 1].lastNameDay = bigPerson.name[e].name;
        } else {
            arrPersonDay[item - 1].firstNameDay = bigPerson.name[e].name;
        }
    });
};

const innerNameNight = (e) => {
    bigPerson.night[e].night.forEach(item => {
        if (arrPersonNight[item - 1].hasOwnProperty('firstNameNight')) {
            arrPersonNight[item - 1].lastNameNight = bigPerson.name[e].name;
        } else {
            arrPersonNight[item - 1].firstNameNight = bigPerson.name[e].name;
        }
    });
};

getEndTime(user);
initializeClock('.clock', endTime);
graficFunc(user);

bigPerson.name.forEach((item, index) => {innerNameDay(index)});
bigPerson.name.forEach((item, index) => {innerNameNight(index)});

const target = document.querySelectorAll('.day');

target.forEach((item, index) => item.addEventListener('click', function () {
    const elem = document.querySelectorAll('.personDown');
    const toDay = document.querySelector('.toDay');
    const toNight = document.querySelector('.toNight');
    elem.forEach(item => { item.remove() });
    createMonthElement('div', personWorkDay, `${arrPersonDay[index].firstNameDay}  ${arrPersonDay[index].lastNameDay}`, 'personDown');
    createMonthElement('div', personWorkNight, `${arrPersonNight[index].firstNameNight}  ${arrPersonNight[index].lastNameNight}`, 'personDown');
    createMonthElement('div', toDay, 'В День', 'personDown');
    createMonthElement('div', toNight, 'В Ночь', 'personDown');

}));

const shiftPerson = document.querySelector('.shift');

const shift = (e) => {
    if (arrPersonDay[(endTime.getDate())-1].firstNameDay == bigPerson.name[e].name) {
        shiftPerson.innerHTML = `${arrPersonDay[(endTime.getDate())-1].lastNameDay}`;
    } else if (arrPersonDay[(endTime.getDate())-1].lastNameDay == bigPerson.name[e].name) {
        shiftPerson.innerHTML = `${arrPersonDay[(endTime.getDate())-1].firstNameDay}`;
    } else if (arrPersonNight[(endTime.getDate())-1].firstNameNight == bigPerson.name[e].name) {
        shiftPerson.innerHTML = `${arrPersonNight[(endTime.getDate())-1].lastNameNight}`;
    } else if (arrPersonNight[(endTime.getDate())-1].lastNameNight == bigPerson.name[e].name) {
        shiftPerson.innerHTML = `${arrPersonNight[(endTime.getDate())-1].firstNameNight}`;
    }
};

shift(user);

const shiftUpDown = (e) => {
    if (bigPerson.day[e].day.includes(endTime.getDate())) {
        const nextPerson = document.querySelector('.nextPerson');
        const downPerson = document.querySelector('.downPerson');
        nextPerson.innerHTML = `${arrPersonNight[(endTime.getDate())-2].firstNameNight}, ${arrPersonNight[(endTime.getDate())-2].lastNameNight}`;
        downPerson.innerHTML = `${arrPersonNight[(endTime.getDate())-1].firstNameNight}, ${arrPersonNight[(endTime.getDate())-1].lastNameNight}`;
    } else {
        const nextPerson = document.querySelector('.nextPerson');
        const downPerson = document.querySelector('.downPerson');
        nextPerson.innerHTML = `${arrPersonDay[(endTime.getDate())-1].firstNameDay}, ${arrPersonDay[(endTime.getDate())-1].lastNameDay}`;
        downPerson.innerHTML = `${arrPersonDay[endTime.getDate()].firstNameDay}, ${arrPersonDay[endTime.getDate()].lastNameDay}`;
    }
};

shiftUpDown(user);

console.log(shiftPerson);