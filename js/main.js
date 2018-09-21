window.onload = function() {

    // Окно оповещений
    var messWindow = document.getElementById('messWindow'),
        messWindowInner = document.getElementById('messWindowInner'),
        // Персонаж ================================================================
        HeroPowerAbility = 1,
        weapon = false,
        HeroPower = document.getElementById('hero_power'),
        HeroGold = document.getElementById('hero_gold'),
        HeroAtack = document.getElementById('hero_atack'),
        HeroArmor = document.getElementById('hero_armor'),
        HeroCriticalAtack = document.getElementById('hero_krit'),
        HeroHP = document.getElementById('hero_hp'),
        HeroHPInner = 10;
        HeroGoldInner = 100;
    HeroPowerInner = 1;
    HeroPower.innerHTML = HeroPowerInner;
    HeroGold.innerHTML = HeroGoldInner;
    HeroHP.innerHTML = HeroHPInner;


    // Покупка предметов =======================================================
    var HeroItem = [
        [],
        [],
        [],
        []
    ];
    var bye = document.getElementById('bye');
    bye.addEventListener('click', BuyFromSeller);

    // Разговор с продавцом
    talkToSellerBtn = document.getElementById('talkToSeller');
    talkToSellerBtn.addEventListener('click', TalkToSeller);

    function TalkToSeller() {
        $('.marketPlace .db .dinamicTxt').html('<p>' + 'Торговец: Продаю по полной цене, выкупаю за половину :)' + '</p>');
        $('.marketPlace .db').fadeIn();
        btnDisabledTrue();
    }

    function BuyFromSeller() {
        var itemCheck = $('input[name=shopItem]:checked'),
            itemCheckVal = $('input[name=shopItem]:checked').val();
        BuyItem(itemCheck, itemCheckVal);
    }

    function BuyItem(parameter1, parameter2) {
        // var itemCheck = $('input[name=shopItem]:checked'),
        //     itemCheckVal = $('input[name=shopItem]:checked').val(),
            var itemPrice = parameter1.next().html(),
            damage = parameter1.next().siblings('em').html(),
            HomeInventory = document.getElementById('inventory'),
            // Проверяем массив и получаем индекс предмета в массиве
            HeroItemIndex = HeroItem[0].indexOf(parameter2);
        // Если не хватает золота
        if (HeroGoldInner < itemPrice) {
            $('.marketPlace .db .dinamicTxt').html('<p>' + 'Торговец: Эта вещь тебе явно не по карману :)' + '</p>');
            $('.marketPlace .db').fadeIn();
            btnDisabledTrue();
        }
        // Если предмет не выбран для покупки
        if (typeof parameter2 === 'undefined') {
            $('.marketPlace .db .dinamicTxt').html('<p>' + 'Торговец: Ты не выбрал предмет для покупки :)' + '</p>');
            $('.marketPlace .db').fadeIn();
            btnDisabledTrue();
            return;
        }
        // Покупка
        if (HeroGoldInner >= itemPrice) {
            HeroGoldInner = HeroGoldInner - itemPrice;
            HeroGold.innerHTML = HeroGoldInner;
            // Если предмет уже куплен увеличиваем счетчик
            if (HeroItemIndex != -1) {
                HeroItem[1][HeroItemIndex] = +HeroItem[1][HeroItemIndex] + 1;
                document.querySelector('.counter-' + (HeroItemIndex)).innerHTML = HeroItem[1][HeroItemIndex];
            } else {
                // Добавляем предметы в список
                HeroItem[0].push(parameter2);
                HeroItem[1].push(1);
                HeroItem[2].push(itemPrice);
                HeroItem[3].push(damage);
                // Цепляем последние элементы в массиве
                var NameMassiveLastEl = HeroItem[0][HeroItem[0].length - 1],
                    CountMassiveLastEl = HeroItem[1][HeroItem[1].length - 1],
                    PriceMassiveLastEl = HeroItem[2][HeroItem[2].length - 1] / 2,
                    DamageMassiveLastEl = HeroItem[3][HeroItem[3].length - 1],
                    li = document.createElement('li');
                li.innerHTML = '<label>' + '<input type=radio name="inventory">' + ' <span class="itemName">' + NameMassiveLastEl + '</span>' + ' <span class="counter counter-' + (HeroItem[0].length - 1) + ' ">' + CountMassiveLastEl + '</span>' + ', ' + '<span class="priceItemHero">' + PriceMassiveLastEl + '</span>' + ', ' + '<span class="damageItemHero">' + DamageMassiveLastEl + '</span>' + '</label>';
                HomeInventory.appendChild(li);
            }
        }
    }

    // Продажа предметов =======================================================
    var sellTheItemBtn = document.getElementById('sellItem');

    sellTheItemBtn.addEventListener('click', SellItem);

    function SellItem() {
        var itemCheckInv = $('input[name=inventory]:checked').next().html(),
            HeroItemPrice = $('input[name=inventory]:checked').siblings('.priceItemHero').html();
        HeroItemIndexInv = HeroItem[0].indexOf(itemCheckInv);
        if (HeroItemIndexInv != -1) {
            HeroItem[1][HeroItemIndexInv] = +HeroItem[1][HeroItemIndexInv] - 1;
            document.querySelector('.counter-' + (HeroItemIndexInv)).innerHTML = HeroItem[1][HeroItemIndexInv];
            HeroGoldInner = HeroGoldInner + Number(HeroItemPrice);
            HeroGold.innerHTML = HeroGoldInner;
        }
        if (HeroItem[1][HeroItemIndexInv] == 0) {
            var DeleteItem = document.querySelector('.counter-' + (HeroItemIndexInv)),
                itemCheckInvName = $('input[name=inventory]:checked').next().html(),
                RemoveItem = $(DeleteItem).parents()[1];
            HeroItemIndex = HeroItem[0].indexOf(itemCheckInvName);
            delete HeroItem[0][HeroItemIndex];
            $(RemoveItem).empty();
            var HeroArmorEquiped = $('#hero_armor_equiped span').html(),
                HeroWeaponEquiped = $('#hero_weapon span').html();
            if (HeroArmorEquiped == itemCheckInvName) {
                $('#hero_armor_equiped span').html('Пусто');
                $('#hero_armor').html(0);
            }
            if (HeroWeaponEquiped == itemCheckInvName) {
                $('#hero_weapon span').html('Пусто');
                $('#hero_atack').html(0);
            }
        }
    }

    // Экипировка предметов ====================================================
    var EquipItem = document.getElementById('equipItem');
    EquipItem.addEventListener('click', EqipItemFunc);
    var ItemTypesArr = [
        ['Ржавый меч', 'Полуторный меч', 'Палаш', 'Дубинка'],
        ['Кожаная броня', 'Тяжелый доспех'],
        ['Сырая сталь']
    ];

    function EqipItemFunc() {
        var itemCheckInvName = $('input[name=inventory]:checked').next().html(),
            itemChecked = $('input[name=inventory]:checked'),
            ItemStats = $(itemChecked).siblings(".damageItemHero").html();
        HeroItemIndex = ItemTypesArr[1].indexOf(itemCheckInvName);
        HeroItemWeapon = ItemTypesArr[0].indexOf(itemCheckInvName);
        HeroItemMaterial = ItemTypesArr[2].indexOf(itemCheckInvName);
        if (HeroItemIndex != -1) {
            $('#hero_armor_equiped span').html(itemCheckInvName);
            HeroArmor.innerHTML = ItemStats;
        }
        if (HeroItemMaterial != -1) {
            $('.HomeMessageAlert').fadeIn();
        }
        if (HeroItemWeapon != -1) {
            $('#hero_weapon span').html(itemCheckInvName);
            HeroAtack.innerHTML = ItemStats;
        }
    }

    // Журнал ==================================================================
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

    // Конец Персонаж ====================================================================

    // Мастер Ларс ==========================================
    var trainResolution = false;
    // var trainResolution = true;
    // Совет
    var BtnAdvice = document.getElementById('btn_advice');
    BtnAdvice.addEventListener('click', masterAdvice);
    function masterAdvice() {
        if (trainResolution == true) {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Сила увеличит мощь твоих ударов!' + '</p>');
            $('.master .db').fadeIn();
            btnDisabledTrue();
        } else {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Думаешь я раздаю советы каждому встречному!' + '</p>');
            $('.master .db').fadeIn();
            btnDisabledTrue();
        }
    }

    // Показ/Скрытие диалоговых окон
    $('.db_close').click(function() {
        $('.dialog_box').fadeOut();
        btnDisabledFalse();
    });

    // Тренировка
    var BtnMaster = document.getElementById('btn_master');
    BtnMaster.addEventListener('click', training);

    function MasterDb() {
        $('.master .db').fadeIn();
    }

    function training() {
        HeroWeaponEquiped = $('#hero_weapon span').html();
        if (trainResolution == false) {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Кто ты такой? Я не тренерую всех подряд!' + '</p>');
            $('.master .db').fadeIn();
            btnDisabledTrue();
        } else if(HeroPowerInner >= 5){
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Ты достаточно силен, мне больше нечему тебя учить!' + '</p>');
            MasterDb();
            btnDisabledTrue();
        }else if (trainResolution == true && HeroWeaponEquiped == 'Пусто') {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Онар хорошо отзывался о тебе. У тебя есть оружие? возвращайся когда будет с чем тренироваться!' + '</p>');
            MasterDb();
            btnDisabledTrue();
        } else if (trainResolution == true && HeroWeaponEquiped !== 'Пусто') {
            if (HeroWeaponEquiped == 'Дубинка') {
                $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Дубинкой можешь крыс в лесу погонять! Возвращайся с достойным оружием!' + '</p>');
                MasterDb();
                btnDisabledTrue();
            } else if (HeroWeaponEquiped == 'Ржавый меч') {
                $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Какой болван приходит тренироваться с ржавым мечом!' + '</p>');
                MasterDb();
                btnDisabledTrue();
            } else if (HeroGoldInner < 200) {
                $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Тренировка стоит 200 монет, возваращайся когда будет чем платить!' + '</p>');
                MasterDb();
                btnDisabledTrue();
            } else if (HeroWeaponEquiped !== 'Ржавый меч' && HeroWeaponEquiped !== 'Дубинка' && HeroGoldInner >= 200) {
                TimerFunc(10, HeroGold, HeroGoldInner = HeroGoldInner - 200, 'Вы тренеруйтесь: ', 'Ваша сила увеличилась на 1');
                HeroPowerInner = HeroPowerInner + 1;
                HeroPower.innerHTML = HeroPowerInner;
            }
        }
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

    // Диалоговые окна с Сентезой ==============================================

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
        if (target.id != 'equipItem') {
            $('.HomeMessageAlert').css('display', 'none');
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

    // Отдых ===================================================================
    var rest = document.getElementById('toRest');
    rest.addEventListener('click', ToRest);
    function ToRest(){
        TimerFunc(15, HeroHP, 100, 'Вы спите: ', 'Здоровье восстановлено!');
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
            Overlay();
        }
        if (PaySenteza == true && HeroGoldInner < 200) {
            TimerFunc(10, HeroGold, HeroGoldInner = HeroGoldInner + 100, 'Вы работайте в поле: ', 'Вы заработали 100 монет');
        }
    }

    // Функция обратного отсчета ===============================================
    function TimerFunc(time, parameter1, parameter2, messBefore, messAfter){
        function TimeFuncInner() {
            var number = parseInt(timeOfwork.innerHTML) - 1;
            timeOfwork.innerHTML = number;
            if (number == 0) {
                window.clearInterval(window.timerId);
                parameter1.innerHTML = parameter2;
                timeOfwork.innerHTML = '';
                timeStop.innerHTML = messAfter;
                $('.close').html('x');
                console.log(parameter2);
            }
        }
        Overlay();
        $('.close').html('');
        messWindowInner.innerHTML = '';
        timeOfwork.innerHTML = time;
        window.timerId = window.setInterval(TimeFuncInner, 300);
        timeStop.innerHTML = messBefore;
    }

    //Затемнение экрана
    function Overlay() {
        $('.overlay, #messWindow').fadeIn();
    }
    // Конец ферма =============================================================

    // Кузница =================================================================
    var btn_talkToHarald = document.getElementById('btn_talkToHarald');
    var BtnForge = document.getElementById('btn_forge');
    btn_talkToHarald.addEventListener('click', TalkToHarald);
    BtnForge.addEventListener('click', Forge);

    function Forge(){
        var itemCheck = $('input[name=forgeItem]:checked'),
            itemCheckVal = $('input[name=forgeItem]:checked').val();
        BuyItem(itemCheck, itemCheckVal);
    }

    function TalkToHarald(){
        $('#db_forge .dinamicTxt').html('<p>Ищешь лучшее оружие!? Ты зашел в правильное место!</p>');
        $('#db_forge').fadeIn();
        btnDisabledTrue();
    }
    // Конец кузница ===========================================================

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
