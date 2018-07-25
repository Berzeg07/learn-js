window.onload = function() {

    // Окно оповещений
    var messWindow = document.getElementById('messWindow');
    var messWindowInner = document.getElementById('messWindowInner');


    // Персонаж ==================================
    var HeroPowerAbility = 1;
    var weapon = false;
    var HeroPower = document.getElementById('hero_power');
    var HeroGold = document.getElementById('hero_gold');
    var HeroGoldInner = 100;
    HeroGold.innerHTML = HeroGoldInner;


    // Товары в магазине
    // var object = {
    //     'Кожаная броня': 300,
    //     'Дубинка': 150,
    //     'Ржавый меч': 400,
    //     'Полуторный меч': 800,
    //     'Сырая сталь': 200,
    // };
    // console.log(object);

    // var array = [{
    //         name: "Булава",
    //         price: 300,
    //         damage: 200,
    //         count: 1
    //     },
    //     {
    //         name: "Платок Аслана",
    //         count: 4
    //     },
    // ]

    // for (var f = 0; f < array.length; f++){
    //     console.log(array[1].name);
    //     // array[0].name
    // }

    // Предметы в сундуке
    // var HeroItem = [];
    var HeroItemName = [
        [],
        []
    ];
    var bye = document.getElementById('bye');
    bye.addEventListener('click', BuyItem);
    // var count = 1;

    function BuyItem() {

        var itemCheck = $('input[name=shopItem]:checked'),
            itemCheckVal = $('input[name=shopItem]:checked').val(),
            itemPrice = itemCheck.next().html(),
            damage = itemCheck.next().siblings('em').html(),
            ul = document.getElementById('ul'),
            // Получаем индекс названия предмета
            HeroItemIndex = HeroItemName[0].indexOf(itemCheckVal),
            // Обращаемся к индексу кол-ва предметов во втором подмассиве
            HeroCountIndex = HeroItemName[1][HeroItemIndex];

        if (HeroItemIndex != -1) {

            alert('есть такой элемент!');
            alert(HeroItemIndex);
            HeroCountIndex++;
            console.log(HeroCountIndex);
            // HeroItemName[1][HeroItemIndex];
            // for(var j = 0; j < HeroItemName.length; j++){
            //     var li = document.createElement('li');
            //     li.innerHTML = '<input type=radio>' + ' <span class="fff">' + HeroItemName[j];
            //     ul.appendChild(li);
            // }
            // alert(HeroItemIndex);
            // HeroItemName.push([]);
            // for (var k = 0; k < HeroItem.length; k++) {
            // HeroItem[HeroItemIndex][3]++;
            // ul.innerHTML = '';
            // var li = document.createElement('li');
            // li.innerHTML = '<input type=radio>' + ' <span class="fff">' + HeroItem[k][0] + ' </span>' + '<span class="counter">' + HeroItem[0][3] + '</span>';
            // ul.appendChild(li);
            // }

        } else {

            // var arr = [
            //     [1, 2, 3],
            //     [4, 5, 6],
            //     [7, 8, 9]
            // ];
            //
            // for (let j = 0; j < arr.length; j++) {
            //     for (let n = 0; n < arr.length; n++) {
            //
            //             console.log(arr[n][0]);
            //
            //     }
            // }

            // HeroItem.push(
            //     [
            //         itemCheckVal,
            //         itemPrice,
            //         damage,
            //         1
            //     ]
            // );

            HeroItemName[0].push(itemCheckVal);
            HeroItemName[1].push(1);
            // Получаем последний элемент в подмассиве названия предметов
            var NameMassiveLastEl = HeroItemName[0][HeroItemName[0].length - 1],
                CountMassiveLastEl = HeroItemName[1][HeroItemName[1].length - 1],
                li = document.createElement('li');
            li.innerHTML = '<input type=radio>' + ' <span class="fff">' + NameMassiveLastEl + ' </span>' + '<span class="counter">' + CountMassiveLastEl + '</span>';
            ul.appendChild(li);
        }
    }

    // Журнал
    var JournalList = false;
    var JournalBox = document.getElementById('journal_box__inner');
    var quest = {};
    var Btnjournal = document.getElementById('journal');

    if (JournalList == false) {
        Btnjournal.addEventListener('click', journalOpenEmpty);
    }

    // Открываем пустой журнал
    function journalOpenEmpty() {
        var li = document.createElement('li');
        li.innerHTML = '<p>' + 'Ваш журнал пуст' + '</p>';
        JournalBox.appendChild(li);
        JournalList = true;
        Btnjournal.removeEventListener('click', journalOpenEmpty);
        Btnjournal.addEventListener('click', journalOpenFull);
        $('.overlay, .journal_box').fadeIn(500);
    }

    function journalOpenFull() {
        $('.overlay, .journal_box').fadeIn(500);
    }

    $('.close').click(function journalClose() {
        $('.overlay, .messWindow').fadeOut(500);
    });

    // Конец Персонаж ==================================

    // Мастер Ларс ==========================================
    // Совет
    var BtnAdvice = document.getElementById('btn_advice');
    BtnAdvice.addEventListener('click', masterAdvice);

    function masterAdvice() {
        $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Думаешь я раздаю советы каждому встречному!' + '</p>');
        $('.master .db').fadeIn();
        btnDisabledTrue();
    }

    // Показ/Скрытие диалоговых окон

    $('.db_close').click(function() {
        $('.dialog_box').fadeOut();
        btnDisabledFalse();
    });

    // document.onclick = function(event) {
    //   var target = event.target;
    //   if (target.className != 'btn' ){
    //       $('.dialog_box').fadeOut();
    //       btnDisabledFalse();
    //   }
    // };

    // Тренировка
    var BtnMaster = document.getElementById('btn_master');
    BtnMaster.addEventListener('click', training);
    // var trainResolution = false;
    var trainResolution = true;

    var haveWeapon = false;

    function training() {
        if (trainResolution == false) {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Кто ты такой? Я не тренерую всех подряд!' + '</p>');
            $('.master .db').fadeIn();
            btnDisabledTrue();
        } else if (haveWeapon == false && trainResolution == true) {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Онар хорошо отзывался о тебе. У тебя есть оружие? возвращайся когда будет с чем тренироваться!' + '</p>');
            $('.master .db').fadeIn();
            btnDisabledTrue();
        } else if (haveWeapon == true && trainResolution == true) {

            alert('есть оружие');
        }
        // if (HeroPowerAbility < 3 ){
        //     HeroPowerAbility++;
        //     HeroPower.innerHTML = HeroPowerAbility;
        //     alert('Ваша сила увеличиалсь на 1')
        // }
        // else if (HeroPowerAbility == 3){
        //     this.removeEventListener('click', training);
        //     alert("На сегодня тренировка закончена")
        // }
        // localStorage.setItem('HeroPowerAbility', HeroPowerAbility);
    }
    // Конец мастер Ларс ==============================================

    // Таверна ==============================================
    var BtnRumors = document.getElementById('btn_rumors');
    BtnRumors.addEventListener('click', rumors);

    // Значение для активации разговора с Онаром
    var aboutMissing = false;

    // Слухи с таверны активируем возможность разговора с Онаром в aboutMissing
    function rumors() {
        $('.taverna .db_1').fadeIn();
        // alert('На ферме Харальда пропали два работника, никто не знает, что с ними. Люди обеспокоены ');
        aboutMissing = true;
        quest.name = 'Где все пропавшие люди?';
        questList = ' В таверне говорят о пропавших людях с фермы Онара, нужно разобраться ';
        JournalBox.firstElementChild.remove();
        var li = document.createElement('li');
        li.innerHTML = '<p>' + '<b>' + quest.name + '</b>' + '</p>' + '<p>' + questList + '</p>';
        JournalBox.appendChild(li);
        BtnRumors.removeEventListener('click', rumors);
    }
    // Конец таверна ========================================

    // Ферма ================================================
    var BtnOnar = document.getElementById('btn_onar');
    var BtnWorkFarm = document.getElementById('btn_workFarm');
    // BtnOnar.disabled = true;
    // BtnWorkFarm.disabled = true;

    // Разговор с охраной
    var BtnFarmeGuard = document.getElementById('btn_farmeGuard');
    var BtnPaySenteza = document.getElementById('btn_pay_senteza');
    var BtnNotPaySenteza = document.getElementById('btn_not_pay_senteza');
    var dinamicTxtSenteza = document.getElementById('dinamicTxtSenteza');
    var btnNextSenteza = document.getElementById('btnNextSenteza');

    // Флаг на оплату 100 зол Сентезе
    var PaySenteza = false;
    BtnFarmeGuard.addEventListener('click', FarmeGuard);
    BtnNotPaySenteza.addEventListener('click', NotPaySenteza);
    BtnPaySenteza.addEventListener('click', PaySentezaTrue);
    // Флаг на блокировку кнопки Онара, если квест на беседу с ним еще не получен от Сентезы
    btnOnarDisabled = false;

    // Разговор с Сентезой aboutMissing = false;
    function FarmeGuard() {
        FarmeGuardFalse();
    }

    function FarmeGuardFalse() {
        SentezaDB1();
    }

    function afterDialog() {
        dinamicTxtSenteza.innerHTML = '<p>' + 'Сентеза: Я тебе все сказал!' + '</p>';
        btnNextSenteza.innerHTML = '';
        DinamicDBSenteza();
    }

    function afterFirstDialog() {
        AfterPaySentreza();
        // Разговор с Сентезой aboutMissing == true;
        if (aboutMissing == true && PaySenteza == true) {
            dialogGuard();
        }
    }

    function dialogGuard() {
        dinamicTxtSenteza.innerHTML = '<p>' + 'Что тебе опять?' + '</p>';
        btnNextSenteza.innerHTML = '<button class="btn GuardNext">' + 'Далее' + '</button>';
        i = 0;
        $('.GuardNext').click(function() {
            i = i + 1;
            switch (i) {
                case 1:
                    dinamicTxtSenteza.innerHTML = '<p>' + 'Вы: Говорят у вас пропадают люди?' + '</p>';
                    break;
                case 2:
                    dinamicTxtSenteza.innerHTML = '<p>' + 'Сентеза: Небось в таверне об этом только и твердят, тебе какое дело?' + '</p>';
                    break;
                case 3:
                    dinamicTxtSenteza.innerHTML = '<p>' + 'Вы: Я могу решить эту проблему!' + '</p>';
                    break;
                case 4:
                    dinamicTxtSenteza.innerHTML = '<p>' + 'Сентеза: Ха!) Поговори с Онаром, он на складах, верну 100 золотых на твоих похоронах :)' + '</p>';
                    break;
            }
            BtnFarmeGuard.removeEventListener('click', afterFirstDialog);
            BtnFarmeGuard.addEventListener('click', afterDialog);
            if (i == 5) {
                $('#dinamicDbSenteza').fadeOut();
                btnOnarDisabled = true;
            }
        });
        DinamicDBSenteza();
    }

    // Диалоговые окна с Сентезой ==============================

    // Сентеза требует оплатить 100 монет
    function PaySentezaTrue() {
        if (HeroGoldInner >= 100) {
            PaySenteza = true;
            dinamicTxtSenteza.innerHTML = '<p>' + 'Сентеза: Такой разговор мне по душе, можешь проходить :)' + '</p>';
            HeroGoldInner = HeroGoldInner - 100;
            HeroGold.innerHTML = HeroGoldInner;
            DinamicDBSenteza();
            BtnFarmeGuard.removeEventListener('click', FarmeGuard);
            BtnFarmeGuard.addEventListener('click', afterFirstDialog);
            BtnWorkFarm.disabled = false;
        } else if (HeroGoldInner < 100) {
            dinamicTxtSenteza.innerHTML = '<p>' + 'Сентеза: У тебя и 100 монет не наберется, пошел прочь оборванец!' + '</p>';
            DinamicDBSenteza();
            return;
        }
    }

    // Посылаем Сентезу к черту
    function NotPaySenteza() {
        PaySenteza = true;
        messWindowInner.innerHTML = 'Сентеза избил вас и забрал все деньги...';
        $('.farm .db_1').fadeOut();
        $('.overlay, #messWindow').fadeIn();
        BtnFarmeGuard.removeEventListener('click', FarmeGuard);
        BtnFarmeGuard.addEventListener('click', afterFirstDialog);
        HeroGoldInner = 0;
        HeroGold.innerHTML = HeroGoldInner;
    }

    // Фраза после оплаты Сентезе
    function AfterPaySentreza() {
        dinamicTxtSenteza.innerHTML = '<p>' + 'Сентеза: С тобой приятно иметь дело :)' + '</p>';
        DinamicDBSenteza();
    }

    function SentezaDB1() {
        $('.farm .db_1').fadeIn();
    }

    function DinamicDBSenteza() {
        $('.farm .db_1').fadeOut();
        $('#dinamicDbSenteza').fadeIn();
    }

    // Разговор с Онаром
    BtnOnar.addEventListener('click', TalkToOnar);

    function TalkToOnarAfterQuest() {
        dinamicTxtSenteza.innerHTML = '<p>' + 'Онар: Удачи!' + '</p>';
        btnNextSenteza.innerHTML = '';
        DinamicDBSenteza();
    }

    // Скрытие оповещений на кнопках
    document.onclick = function(event) {
        var target = event.target;
        if (target.id != 'btn_onar') {
            $('.tooltip').css('display', 'none');
        }
        if (target.id != 'btn_workFarm') {
            $('.tooltip2').css('display', 'none');
        }
    };

    function TalkToOnar() {
        if (btnOnarDisabled !== true) {
            $('.master_btn__box .tooltip').fadeIn();
        }
        if (btnOnarDisabled == true) {
            dinamicTxtSenteza.innerHTML = '<p>' + 'Онар: Слышал ты из тех кто решает проблемы?' + '</p>';
            btnNextSenteza.innerHTML = '<button class="btn GuardNext">' + 'Далее' + '</button>';
            i = 0;
            $('.GuardNext').click(function() {
                i = i + 1;
                switch (i) {
                    case 1:
                        dinamicTxtSenteza.innerHTML = '<p>' + 'Вы: Да, я готов расследовать это дело, что известно о пропавших людях?' + '</p>';
                        break;
                    case 2:
                        dinamicTxtSenteza.innerHTML = '<p>' + 'Онар: На окраинах Хориниса видели орка, может дезертир, может разведчик. В общем, теперь он обосновался не далеко от моих угодий в горах, вблизи от проезжей части. Готов поспорить это его рук дело!' + '</p>';
                        break;
                    case 3:
                        dinamicTxtSenteza.innerHTML = '<p>' + 'Вы: Я разберусь с этим орком!' + '</p>';
                        break;
                    case 4:
                        dinamicTxtSenteza.innerHTML = '<p>' + 'Онар: Тебе нужно подготовиться и хорошо экипироваться. Cходи ка к Ларсу, я замолвлю за тебя словечко, он поможет в этом деле' + '</p>';
                        break;
                }
                if (i == 5) {
                    $('#dinamicDbSenteza').fadeOut();
                    trainResolution = true;
                    BtnOnar.removeEventListener('click', TalkToOnar);
                    BtnOnar.addEventListener('click', TalkToOnarAfterQuest);
                }
            });
            DinamicDBSenteza();
        }
    }

    // Наняться на работу =======================================
    var timeOfwork = document.getElementById('timeOfwork');
    BtnWorkFarm.addEventListener('click', GoToWork);
    var timeStop = document.getElementById('stop');
    var arrButtons = [];
    var arrButtons = document.getElementsByTagName('button');

    function btnDisabledTrue() {
        for (var i = 0; i < arrButtons.length; i++) {
            arrButtons[i].disabled = true;
        }
    }

    function btnDisabledFalse() {
        for (var i = 0; i < arrButtons.length; i++) {
            arrButtons[i].disabled = false;
        }
    }

    function GoToWork() {
        if (PaySenteza !== true) {
            $('.master_btn__box .tooltip2').fadeIn();
        }
        if (PaySenteza == true && HeroGoldInner >= 200) {
            timeStop.innerHTML = ' ';
            timeOfwork.innerHTML = ' ';
            messWindowInner.innerHTML = 'На данный момент нет работы';
            $('.overlay, #messWindow').fadeIn();
        }
        if (PaySenteza == true && HeroGoldInner < 200) {
            $('.overlay, #messWindow').fadeIn();
            $('.close').html('');
            messWindowInner.innerHTML = '';
            timeOfwork.innerHTML = 10;
            window.timerId = window.setInterval(timer, 300);
            timeStop.innerHTML = 'Вы работайте в поле: ';
        }
    }

    //Останавливает таймер
    function stop() {
        window.clearInterval(window.timerId);
        number = 10;
        timeOfwork.innerHTML = number;
    }

    // Таймер
    function timer() {
        var timeOfwork = document.getElementById('timeOfwork');
        var number = parseInt(timeOfwork.innerHTML) - 1;
        timeOfwork.innerHTML = number;
        if (number == 0) {
            stop();
            HeroGoldInner = HeroGoldInner + 100;
            HeroGold.innerHTML = HeroGoldInner;
            timeOfwork.innerHTML = '';
            timeStop.innerHTML = 'Вы заработали 100 золотых';
            $('.close').html('x');
        }
    }
    // Конец ферма ======================================================

    // Кузница =============================================
    // var SwordForge = document.getElementById('sword_forge');
    // var BtnForge = document.getElementById('btn_forge');
    // var HeroItem = document.getElementById('item');
    // BtnForge.addEventListener('click', forge);

    // function forge() {
    //     if (SwordForge.checked) {
    //         alert("Поздравляю! Теперь у вас есть меч");
    //         this.removeEventListener('click', forge);
    //         HeroItem.innerHTML = 'Меч';
    //     } else {
    //         alert('Выберите предмет для ковки!');
    //     }
    // }
    // Конец функции кузницы =================================

    // Битва =================================================
    // var BtnEnemy = document.getElementById('btn_enemy');
    // BtnEnemy.addEventListener('click', fight);
    //
    // function fight() {
    //     if (HeroPowerAbility < 3 || HeroItem.innerHTML != 'Меч') {
    //         alert('Вы убиты!')
    //         HeroPowerAbility = 1;
    //         HeroPower.innerHTML = HeroPowerAbility;
    //         // localStorage.setItem('HeroPowerAbility', HeroPowerAbility);
    //     } else {
    //         alert('Поздравляю! Вы победили в дуэли! Игра окончена')
    //     }
    // }
    // Конец функции дуэли ====================================

    // Выводим данные с локального хранилища ======================
    // if (localStorage.getItem('HeroPowerAbility')!==null){
    //     HeroPowerAbility = localStorage.getItem('HeroPowerAbility');
    //     HeroPower.innerHTML = HeroPowerAbility;
    // }
    // if (localStorage.getItem('backgroundColor')!==null){
    //     bgColor = localStorage.getItem('backgroundColor');
    //     document.body.style.backgroundColor = (bgColor);
    // }

    // Конец вывод данных с локального хранилища ===================
}
// конец onload
