window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    // Примеры создания модулей
    // let number = 1;
    //
    // (function() {
    //     let number = 2;
    //     console.log(number);
    //
    //     return console.log(number + 3);
    // }());
    //console.log(number);

    // let user = (function() {
    //     // эта часть не видна снаружи
    //     let privat = function() {
    //         console.log('i am privat');
    //     };
    //     return {
    //         sayHello: function() {
    //             console.log('Hello');
    //         }
    //     };
    // }());

    // let user = (function() {
    //     let privat = function() {
    //         console.log('i am privat');
    //     };
    //     let sayHello = function() {
    //         console.log('Hello');
    //     };
    //     return {
    //         sayHello: sayHello
    //     };
    // }());
    // console.log(user);
    // console.log(user.sayHello());



    // пример использования класса =============================================
    // class Options {
    //     constructor(height, width, bg, fontSize, textAlign) {
    //         this.height = height;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize = fontSize;
    //         this.textAlign = textAlign;
    //     }
    //
    //     createDiv() {
    //         let elem = document.createElement('div');
    //         document.body.appendChild(elem);
    //         let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
    //         elem.style.cssText = param;
    //     }
    // }
    //
    // const item = new Options(300, 350, "red", 14, "center");
    //
    // item.createDiv();

    // var rand = 1 - 0.5 + Math.random() * (10 - 1 + 1);
    // var rand = 1 - 0.5 + Math.random() * (10 - 1 + 1);
    // console.log(rand);
    // console.log(Math.ceil(rand));


    // Промисы пример ==========================================================
    // Пример без промиса -----------
    // let drink = 1;
    //
    // function shoot(headshot, fail) {
    //     console.log('Вы сделали выстрел');
    //     setTimeout(function() {
    //
    //         function randomInteger(min, max) {
    //             var rand = min - 0.5 + Math.random() * (max - min + 1)
    //             rand = Math.round(rand);
    //             return rand;
    //         }
    //
    //         var numRandom = randomInteger(1, 10);
    //
    //         if (numRandom <= 5) {
    //             headshot();
    //         } else {
    //             fail('Вы промахнулись')
    //         }
    //     }, 3000)
    // };
    //
    // function win() {
    //     console.log("Вы победили!");
    //     (drink == 1) ? buyBeer(): giveMoney();
    // }
    //
    // function buyBeer() {
    //     console.log("Вам купили пиво");
    // }
    //
    // function giveMoney() {
    //     console.log("Вам заплатили");
    // }
    //
    // function loose() {
    //     console.log('Вы проиграли!');
    // }
    //
    // shoot(
    //     function() {
    //         console.log('Вы попали в цель!');
    //         win();
    //     },
    //     function() {
    //         loose();
    //     }
    // )

    // Пример с промисом -----------
    // let drink = 1;
    //
    // function shoot() {
    //     console.log('Вы сделали выстрел');
    //     let promise = new Promise(function(resolve, reject) {
    //         setTimeout(function() {
    //
    //             function randomInteger(min, max) {
    //                 var rand = min - 0.5 + Math.random() * (max - min + 1)
    //                 rand = Math.round(rand);
    //                 return rand;
    //             }
    //
    //             var numRandom = randomInteger(1, 10);
    //
    //             if (numRandom <= 5) {
    //                 resolve();
    //             } else {
    //                 reject('Вы промахнулись')
    //             }
    //         }, 3000);
    //     });
    //
    //     return promise;
    // };
    //
    // function win() {
    //     console.log("Вы победили!");
    //     (drink == 1) ? buyBeer(): giveMoney();
    // }
    //
    // function buyBeer() {
    //     console.log("Вам купили пиво");
    // }
    //
    // function giveMoney() {
    //     console.log("Вам заплатили");
    // }
    //
    // function loose() {
    //     console.log('Вы проиграли!');
    // }
    //
    // shoot().then(function(){console.log('Вы попали в цель!')}).then(win).catch(loose)
    // =========================================================================

    const tabs = require('./parts/tabs.js');

    tabs();

    // Timer

    let deadline = '2019-11-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });


});
