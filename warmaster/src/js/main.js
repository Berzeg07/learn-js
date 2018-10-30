window.onload = function() {

    // Окно оповещений
    var messWindow = document.getElementById('messWindow'),
        messWindowInner = document.getElementById('messWindowInner'),

        // Персонаж ============================================================
        HeroPowerAbility = 1,
        weapon = false,
        HeroPower = document.getElementById('hero_power'),
        HeroGold = document.getElementById('hero_gold'),
        HeroAtack = document.getElementById('hero_atack'),
        HeroArmor = document.getElementById('hero_armor'),
        HeroCriticalAtack = document.getElementById('hero_krit'),
        HeroHP = document.getElementById('hero_hp'),

        HeroGoldInner = 500,
        HeroHPInner = 100,
        HeroPowerInner = 10,
        HeroDamageInner = 10,
        HeroAtackInner = HeroDamageInner + HeroPowerInner,
        HeroCritInner = 0,
        HeroArmorInner = 5;

    HeroArmor.innerHTML = HeroArmorInner;
    HeroAtack.innerHTML = HeroAtackInner;
    HeroCriticalAtack.innerHTML = HeroCritInner + '%';
    HeroPower.innerHTML = HeroPowerInner;
    HeroGold.innerHTML = HeroGoldInner;
    HeroHP.innerHTML = HeroHPInner;

    // Крыса ============================================================
    var RatHPBase = 100,
        RatHP = RatHPBase,
        RatPower = 10,
        RatDamage = RatPower + 5,
        RatCrit = 10,
        RatArmor = 5,
        // Волк ============================================================
        WoolfHPBase = 10,
        WoolfHP = WoolfHPBase,
        WoolfPower = 15,
        WoolfDamage = WoolfPower + 10,
        WoolfCrit = 20,
        WoolfArmor = 10,

        // Мракорис ====================================================
        MrakHPBase = 5,
        MrakHP = MrakHPBase,
        MrakPower = 0,
        MrakDamage = MrakPower + 20,
        MrakCrit = 10,
        MrakArmor = 5,

        // Орк =========================================================
        OrkHPBase = 500,
        OrkHP = OrkHPBase,
        OrkPower = 40,
        OrkDamage = OrkPower + 15,
        OrkCrit = 50,
        OrkArmor = 45;

    // Покупка предметов ===============================================
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
                li.innerHTML = '<label>' + '<input class="inp_radio" type=radio name="inventory">' + ' <span class="itemName">' + NameMassiveLastEl + '</span>' + ' <span class="counter counter-' + (HeroItem[0].length - 1) + ' ">' + CountMassiveLastEl + '</span>' + ', ' + '<span class="priceItemHero">' + PriceMassiveLastEl + '</span>' + ', ' + '<span class="damageItemHero">' + DamageMassiveLastEl + '</span>' + '</label>';
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

        IndexOf(itemCheckInv);

        if (HeroItemIndexInv != -1) {
            CounterMinus();
            HeroGoldInner = HeroGoldInner + Number(HeroItemPrice);
            HeroGold.innerHTML = HeroGoldInner;
        }

        if (HeroItem[1][HeroItemIndexInv] == 0) {

            var DeleteItem = document.querySelector('.counter-' + (HeroItemIndexInv)),
                itemCheckInvName = $('input[name=inventory]:checked').next().html();

            var RemoveItem = $(DeleteItem).parents()[1];
            HeroItemIndex = HeroItem[0].indexOf(itemCheckInvName);
            delete HeroItem[0][HeroItemIndex];
            $(RemoveItem).empty();

            var HeroArmorEquiped = $('#hero_armor_equiped span').html(),
                HeroWeaponEquiped = $('#hero_weapon span').html();
            if (HeroArmorEquiped == itemCheckInvName) {
                $('#hero_armor_equiped span').html('Пусто');
                HeroArmorInner = 5;
                HeroArmor.innerHTML = HeroArmorInner;
                //$('#hero_armor').html(0);
            }
            if (HeroWeaponEquiped == itemCheckInvName) {
                $('#hero_weapon span').html('Пусто');
                HeroDamageInner = 5;
                HeroAtack.innerHTML = HeroDamageInner;
                //$('#hero_atack').html(0);
            }
        }
    }

    // Вспомогательные функции =================================================
    function IndexOf(string) {
        HeroItemIndexInv = HeroItem[0].indexOf(string);
    }

    function CounterMinus() {
        HeroItem[1][HeroItemIndexInv] = +HeroItem[1][HeroItemIndexInv] - 1;
        document.querySelector('.counter-' + (HeroItemIndexInv)).innerHTML = HeroItem[1][HeroItemIndexInv];
    }

    function TalkToHaraldTxt(text) {
        $('#db_forge .dinamicTxt').html(text);
    }

    function FadeInForgeDB() {
        $('#db_forge').fadeIn();
    }
    // Конец Вспомогательные функции ===========================================

    // Кузница =================================================================
    var btn_talkToHarald = document.getElementById('btn_talkToHarald');
    var BtnForge = document.getElementById('btn_forge');
    btn_talkToHarald.addEventListener('click', TalkToHarald);
    BtnForge.addEventListener('click', Forge);

    // Флаг доступа к кузнице
    var AccessToTheForge = false;

    function Forge() {
        var itemCheck = $('input[name=forgeItem]:checked'),

            HeroItemPrice = $('input[name=forgeItem]:checked').siblings('.priceItemHero').html(),
            itemCheckVal = $('input[name=forgeItem]:checked').val();

        if (AccessToTheForge == true) {
            IndexOf('Сырая сталь');
            if (typeof itemCheckVal === 'undefined') {
                TalkToHaraldTxt('<p>Выберите предмет!</p>');
                FadeInForgeDB();
            }
            if (HeroGoldInner < HeroItemPrice) {
                TalkToHaraldTxt('<p>Не достаточно денег!</p>');
                FadeInForgeDB();
            }
            if (HeroItemIndexInv != -1 && HeroGoldInner >= HeroItemPrice) {
                CounterMinus();
                BuyItem(itemCheck, itemCheckVal);
                TalkToHaraldTxt('<p>' + itemCheckVal + ' в вашем инвентаре!' + '</p>');
                FadeInForgeDB();
            }
            if (HeroItemIndexInv == -1 && typeof itemCheckVal != 'undefined') {
                TalkToHaraldTxt('<p>У вас нет нужного сырья! </p>');
                FadeInForgeDB();
            }
            if (HeroItem[1][HeroItemIndexInv] == 0) {
                var DeleteItem = document.querySelector('.counter-' + (HeroItemIndexInv)),
                    RemoveItem = $(DeleteItem).parents()[1];
                HeroItemIndex = HeroItem[0].indexOf('Сырая сталь');
                delete HeroItem[0][HeroItemIndex];
                $(RemoveItem).empty();
            }
        } else {
            TalkToHaraldTxt('<p>Харальд: Наша кузница производит снаряжение только для ополчения и граждан этого города! Тебя я не знаю.</p>');
            var HaraldQuest = '<span class="QuestTitle">' + 'Кузнец Харальд' + '</span>';
            var HaraldQuestTxt = '<ul class="HaraldQuest">' + '<li>' + HaraldQuest + '<br>' + ' - Чтобы Харальд выковал мне хорошее оружие, мне нужно стать гражданином Хориниса' + '</li>' + '</ul>';
            QuestListArr(HaraldQuest, HaraldQuestTxt, '#journal_box__inner');
            FadeInForgeDB();
        }
    }

    function TalkToHarald() {
        TalkToHaraldTxt('<p>Харальд: Лучшее оружие и броня!</p>');
        FadeInForgeDB();
        btnDisabledTrue();
    }

    // Конец кузница ===========================================================

    // Экипировка предметов ====================================================
    var EquipItem = document.getElementById('equipItem');
    EquipItem.addEventListener('click', EqipItemFunc);
    var ItemTypesArr = [
        ['Ржавый меч', 'Полуторный меч', 'Палаш', 'Дубинка', 'Потрошитель Дракона'],
        ['Кожаная броня', 'Тяжелый доспех', 'Доспех Ворона'],
        ['Сырая сталь', 'Охотничий нож']
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
            HeroArmorInner = HeroArmorInner + Number(ItemStats);
            HeroArmor.innerHTML = HeroArmorInner;
        }
        if (HeroItemMaterial != -1) {
            $('.HomeMessageAlert').fadeIn();
        }
        if (HeroItemWeapon != -1) {
            var checkWeapon = $('#hero_weapon span').html();
            console.log(checkWeapon);
            if (checkWeapon != itemCheckInvName) {
                $('#hero_weapon span').html(itemCheckInvName);
                HeroAtackInner = HeroAtackInner + Number(ItemStats);
                HeroAtack.innerHTML = HeroAtackInner;
            }
        }
    }

    // Журнал ==================================================================
    var JournalBox = document.getElementById('journal_box__inner');
    var QuestList = [];

    function QuestListArr(QuestName, QuestArticle, QuestClass) {
        var QuestNameIn = QuestName;
        var QuestArticleIn = QuestArticle;
        var HeroQuestIndex = QuestList.indexOf(QuestName);
        var QuestClassIn = QuestClass;
        if (HeroQuestIndex == -1) {
            QuestList.push(QuestNameIn);
            $(QuestClassIn).append(QuestArticleIn);
        }
    }
    $('#journal').click(function() {
        $('.overlay, .journal_box').fadeIn(500);
    });
    $('.close').click(function journalClose() {
        $('.overlay, .messWindow').fadeOut(500);
    });

    // Конец Персонаж ====================================================================

    // Мастер Ларс ==========================================
    // Флаги для доступа к Ларсу
    // var trainResolution = false;
    var trainResolution = true;
    // Совет
    var BtnAdvice = document.getElementById('btn_advice');
    BtnAdvice.addEventListener('click', masterAdvice);

    function masterAdvice() {
        if (trainResolution == true) {
            $('.master .db .dinamicTxt').html('<p class="LarsTxt LarsTxtFirst" id="QuestionToLars-1">' + 'На что влияет сила?' + '</p>' + '<p class="LarsTxt" id="QuestionToLars-2">' + 'Как стать гражданином этого города?' + '</p>');
            $('.master .db').fadeIn();
            btnDisabledTrue();
            $('#QuestionToLars-1').click(function() {
                $('.master .db .dinamicTxt').html('<p>' + 'Сила увеличивает мощь твоих ударов!' + '</p>');
            });
            $('#QuestionToLars-2').click(function() {
                $('.master .db .dinamicTxt').html('<p>' + 'Чтобы стать гражданином, кто то из влиятельных жителей города должен за тебя поручиться!' + '</p>' + '<button class="btn LaresQuest">' + 'Помоги стать гражданином...' + '</button>');
                $('.LaresQuest').click(function() {
                    $('.master .db .dinamicTxt').html('<p>' + 'Ты должен проявить себя в каком либо деле, скажем охотничем... Добудь мне три хвоста болотной крысы и две волчьи шкуры.' + '</p>');
                    var LaresQuest = '<span>' + 'Задание Лареса' + '</span>';
                    var LaresQuestTxt = '<li>' + '- Ларес поможет мне стать гражданином, но для этого я должен добыть для него 2 хвоста болотной крысы и 3 волчьи шкуры' + '</li>';
                    QuestListArr(LaresQuest, LaresQuestTxt, '.HaraldQuest');
                });
            });

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
        } else if (HeroPowerInner >= 5) {
            $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Ты достаточно силен, мне больше нечему тебя учить!' + '</p>');
            MasterDb();
            btnDisabledTrue();
        } else if (trainResolution == true && HeroWeaponEquiped == 'Пусто') {
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
        $('.taverna .db_1 .DialogWithSelina').html('Селина: Неделю назад на ферме Онара пропал работник, два дня назад пропал еще один. Никто не знает, что с ними. Люди обеспокоены...');
        $('.taverna .db_1').fadeIn();
        aboutMissing = true;
        var SelinasQuest = '<span class="QuestTitle">' + 'Где все пропавшие люди?' + '</span>';
        var SelinasQuestTxt = '<ul class="LostPeopleQuest">' + '<li>' + SelinasQuest + '<br>' + ' - С фермы Онара пропадают люди, надо разобраться' + '</li>' + '</ul>';
        QuestListArr(SelinasQuest, SelinasQuestTxt, '#journal_box__inner');
    }
    var BackToQuestions = '<br>' + '<button class="BackToQuestions">' + 'Назад' + '</button>';
    var btn_talkToSelina = document.getElementById('btn_talkToSelina');
    btn_talkToSelina.addEventListener('click', talkToSelina);

    function ReturnToSelinasQuestions() {
        $('.BackToQuestions').click(function() {
            talkToSelina();
        });
    }

    function SelinaAnswers(AnswerTxt) {
        $('.taverna .db_1 .DialogWithSelina').html(AnswerTxt);
    }

    function talkToSelina() {
        $('.taverna .db_1 .DialogWithSelina').html('<ul>' + '<li class="QuestionToSelina-1">' + 'Как обстановка в городе?' + '</li>' + '<li class="QuestionToSelina-2">' + 'Что находится на востоке?' + '</li>' + '<li class="QuestionToSelina-3">' + 'Что значит быть гражданином Хориниса?' + '</li>' + '<li class="QuestionToSelina-4">' + 'Расскажи о туманной лощине?' + '</li>' + '</ul>');
        $('.taverna .db_1').fadeIn();
        $('.QuestionToSelina-1').click(function() {
            SelinaAnswers('Селина: В последнее время народ всполошился, слухи полнятся о надвигающейся войне с орками. Город готовит припасы, кузница дни и ночи кует оружие для ополчения, многие покидают город. Все это очень тревожно.' + BackToQuestions);
            ReturnToSelinasQuestions();
        });
        $('.QuestionToSelina-2').click(function() {
            SelinaAnswers('Селина: Ферма Онара, раньше он состоял в подданстве короля. Онар нанял армию наемников, отказался платить налоги и объявил полную независимость от короны. ' + BackToQuestions);
            ReturnToSelinasQuestions();
        });
        $('.QuestionToSelina-3').click(function() {
            SelinaAnswers('Селина: Граждане пользуются особыми привилегиями, имеют доступ к отдельным услугам.' + BackToQuestions);
            ReturnToSelinasQuestions();
        });
        $('.QuestionToSelina-4').click(function() {
            SelinaAnswers('Селина: Опасное место, непроходимые топи, жуткие твари.' + BackToQuestions);
            ReturnToSelinasQuestions();
        });
    }
    $('#btn_toEat').click(function() {
        var PriceOfFood = 150;
        SelinaAnswers('Селина: Лучшее жаркое в Хоринисе :) Цена 150 монет!' + '<br>' + '<button class="ToEat" style="margin-top:10px;">' + 'Кушать' + '</button>' + '<button class="CancelToEat" style="margin-left:10px; margin-top:10px;">' + 'Отмена' + '</button>');
        $('.taverna .db_1').fadeIn();
        $('.ToEat').click(function() {
            if (HeroGoldInner >= PriceOfFood) {
                HeroHPInner = 100;
                HeroHP.innerHTML = HeroHPInner;
                HeroGoldInner = HeroGoldInner - PriceOfFood;
                HeroGold.innerHTML = HeroGoldInner;
                SelinaAnswers('Здоровье полностью восстановлено!');
            }
            if (HeroGoldInner < PriceOfFood) {
                SelinaAnswers('Селина: Боюсь твоих денег не достаточно для оплаты :) ');
            }
        });
        $('.CancelToEat').click(function() {
            $('.taverna .db_1').fadeOut();
        });
    });

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
            var FarmQuest = '<span class="QuestTitle">' + 'Ферма Онара' + '</span>';
            var FarmQuestTxt = '<ul class="OnarsFarm">' + '<li>' + FarmQuest + '<br>' + ' - Меня пропустили на ферму, теперь я могу заработать не много денег в полях. Но для этого пришлось отвалить Сентезе 100 золотых (Надо будет с ним разобраться попозже!)' + '</li>' + '</ul>';
            QuestListArr(FarmQuest, FarmQuestTxt, '#journal_box__inner');
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
        timeStop.innerHTML = '';
        $('.farm .db_1').fadeOut();
        $('.overlay, #messWindow').fadeIn();
        BtnFarmeGuard.removeEventListener('click', FarmeGuard);
        BtnFarmeGuard.addEventListener('click', afterFirstDialog);
        HeroGoldInner = 0;
        HeroGold.innerHTML = HeroGoldInner;
        var FarmQuest = '<span class="QuestTitle">' + 'Ферма Онара' + '</span>';
        var FarmQuestTxt = '<ul class="OnarsFarm">' + '<li>' + FarmQuest + '<br>' + ' - Меня пропустили на ферму, теперь я могу заработать не много денег в полях. Этот ублюдок, Сентеза навалял мне по полной и отжал все бабло, он еще поплатится!)' + '</li>' + '</ul>';
        QuestListArr(FarmQuest, FarmQuestTxt, '#journal_box__inner');
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
                        dinamicTxtSenteza.innerHTML = '<p>' + 'Онар: Можно сказать ничего, правда Борка как то обмолвился, что собирался наведаться в туманную лощину. Дерек его закадычный друг, может они и вправду туда направились и не вернулись, в любом случае если они мертвы, мне нужно подтверждение. Борка заправлял частью моей казны, сундук с золотом тоже пропал, ему повезет если он мертв!' + '</p>';
                        break;
                    case 3:
                        dinamicTxtSenteza.innerHTML = '<p>' + 'Вы: Я разберусь с этим делом!' + '</p>';
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
                    var OnarQuest = '<span>' + 'Задание Онара' + '</span>';
                    var OnarQuestTxt = '<li>' + ' - Пропавшие Борка и Дерек захватили с собой сундук с золотом Онара, может они вовсе не пропали? Нужно найти их живыми или мертвыми.' + '</li>' + '<li>' + ' - Онар за меня поручился, теперь я могу тренироваться у Лареса' + '</li>';
                    QuestListArr(OnarQuest, OnarQuestTxt, '.LostPeopleQuest');
                }
            });
            DinamicDBSenteza();
        }
    }

    // Отдых ===================================================================
    var rest = document.getElementById('toRest');
    rest.addEventListener('click', ToRest);

    function ToRest() {
        TimerFunc(15, HeroHP, 100, 'Вы спите: ', 'Здоровье восстановлено!');
        HeroHPInner = 100;
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
    function TimerFunc(time, parameter1, parameter2, messBefore, messAfter) {
        function TimeFuncInner() {
            var number = parseInt(timeOfwork.innerHTML) - 1;
            timeOfwork.innerHTML = number;
            if (number == 0) {
                window.clearInterval(window.timerId);
                parameter1.innerHTML = parameter2;
                // $('.HeroHP').html(parameter2);
                timeOfwork.innerHTML = '';
                timeStop.innerHTML = messAfter;
                $('.close').html('x');
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

    // Битва ===================================================================
    function ShowFightBox() {
        $('.overlay, .fight-box').fadeIn(1500);
    }

    function HeroParamInner() {
        $('.HeroPower').html(HeroPowerInner);
        $('.HeroDamage').html(HeroAtackInner);
        $('.HeroCrit').html(HeroCritInner + '%');
        $('.HeroArmor').html(HeroArmorInner);
        $('.HeroHP').html(HeroHPInner);
    }

    function ShowEnemyImg(string, img) {
        var EnemyName = document.getElementById('enemy_name'),
            EnemyAvatar = document.getElementById('enemy_avatar');
        EnemyAvatar.innerHTML = img;
        EnemyName.innerHTML = string;
    }

    // Критический удар ==============================
    function CritChance() {
        var rand = 1 - 0.5 + Math.random() * (100 - 1 + 1)
        rand = Math.round(rand);
        return rand;
    }

    function Atack(BattleEnemyHP, BattleEnemyCrit, BattleEnemyDamage, BattleEnemyArmor) {
        var HeroCrit = CritChance();
        var EnemyCrit = CritChance();
        // console.log('Крит героя ' + HeroCrit);
        // console.log('Крит врага ' + EnemyCrit);
        var HeroAtackInnerNew = HeroAtackInner - BattleEnemyArmor;
        var BattleEnemyDamageNew = BattleEnemyDamage - HeroArmorInner;

        if (Math.sign(HeroAtackInnerNew) == -1) {
            HeroAtackInnerNew = 0;
        }

        if (Math.sign(BattleEnemyDamageNew) == -1) {
            BattleEnemyDamageNew = 0;
        }

        if (HeroCrit <= HeroCritInner) {
            HeroAtackInnerNew = HeroAtackInnerNew * 2;
            // console.log('Урон героя ' + HeroAtackInnerNew);
        }
        if (EnemyCrit <= BattleEnemyCrit) {
            BattleEnemyDamageNew = BattleEnemyDamageNew * 2;
            // console.log('Урон врага ' + HeroAtackInnerNew);
        }

        HeroHPInner = HeroHPInner - BattleEnemyDamageNew;
        HeroHP.innerHTML = HeroHPInner;
        $('.HeroHP').html(HeroHPInner);
        BattleEnemyHP = BattleEnemyHP - HeroAtackInnerNew;

        console.log('Атака героя ' + HeroAtackInnerNew);

        var EnemyAttr = $('#AtackToBattle').attr('name');

        switch (EnemyAttr) {
            case 'rat':
                RatHP = BattleEnemyHP;
                break;
            case 'woolf':
                WoolfHP = BattleEnemyHP;
                break;
            case 'mrakoris':
                MrakHP = BattleEnemyHP;
                break;
            case 'ork':
                OrkHP = BattleEnemyHP;
                break;
        }

        if (HeroHPInner <= 10 && BattleEnemyHP >= 1) {
            var HeroWeaponBattle = $('#hero_weapon span').html(),
                HeroArmorBattle = $('#hero_armor_equiped span').html();
            if (HeroWeaponBattle != 'Пусто') {
                LostTheItem(HeroWeaponBattle);
            }
            if (HeroArmorBattle != 'Пусто') {
                LostTheItem(HeroArmorBattle);
            }
            if (HeroWeaponBattle != 'Пусто' || HeroArmorBattle != 'Пусто') {
                BattleMess('<p>' + 'Вас почти загрызли живьем! Вы еле унесли ноги побросав все снаряжение!' + '</p>' + '<div class="RunAway">' + '>> ' + ' &npbsp; <button class="RunAwayBtn DbBtn">' + 'Бежать со всех ног!' + '</button> ' + ' <<' + '</div>');
                CloseTheBattleWindow();
            } else {
                BattleMess('<p>' + 'Вас почти загрызли живьем! Вы еле унесли ноги!' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Бежать со всех ног!' + '</button> ' + ' <<' + '</div>');
                CloseTheBattleWindow();
            }
        }
        console.log(BattleEnemyHP);
        if (HeroHPInner >= 10 && BattleEnemyHP <= 0) {
            var HeroItemIndex = HeroItem[0].indexOf('Охотничий нож');
            if (HeroItemIndex != -1) {
                switch (EnemyAttr) {
                    case 'rat':
                        DropItem(50, 'Хвост крысы');
                        BattleMess('<p>' + 'Вы победили! Добыча: ' + '<span style="font-weight:bold;">Хвост крысы</span>' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
                        break;
                    case 'woolf':
                        DropItem(150, 'Волчья Шкура');
                        BattleMess('<p>' + 'Вы победили! Добыча: ' + '<span style="font-weight:bold;">Волчья шкура</span>' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
                        break;
                    case 'mrakoris':
                        DropItem(300, 'Рог Мракориса');
                        BattleMess('<p>' + 'Вы победили! Добыча: ' + '<span style="font-weight:bold;">Рог Мракориса</span>' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
                        break;
                }
            } else {
                BattleMess('<p>' + 'Вы победили!' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
            }
            CloseTheBattleWindow();
        }
        if (HeroHPInner <= 10 && BattleEnemyHP <= 0) {
            BattleMess('<p>' + 'Вы победили с большим трудом и истекли кровью, срочно восполните здоровье!' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
            CloseTheBattleWindow();
        }
        if (HeroHPInner <= 0) {
            HeroHpAfterFight();
        }
    }

    function BeastInner(BeastName, BeastImg, BeastAttrName) {
        HeroParamInner();
        ShowEnemyImg(BeastName, BeastImg);
        ShowFightBox();
        $('#AtackToBattle').attr('name', BeastAttrName);
    }

    $('#rat').click(function() {
        BeastInner('Крыса', '<img class="rat_img" src="img/rat.png" alt="">', 'rat');
        RatHP = RatHPBase;
        console.log(RatHP);
    });
    $('#woolf').click(function() {
        BeastInner('Волк', '<img class="woolf_img" src="img/woolf.png" alt="">', 'woolf');
        WoolfHP = WoolfHPBase;
    });
    $('#mrakoris').click(function() {
        BeastInner('Мракорис', '<img class="mrakoris_img" src="img/mrakoris.png" alt="">', 'mrakoris');
        MrakHP = MrakHPBase;
    });
    $('#ork').click(function() {
        BeastInner('Орк', '<img class="ork_img" src="img/orkavatar.png" alt="">', 'ork');
        OrkHP = OrkHPBase;
    });

    // Кнопка атаки
    $('#AtackToBattle').click(function() {
        var EnemyAttr = $('#AtackToBattle').attr('name');
        console.log('Атрибут врага ' + EnemyAttr);
        switch (EnemyAttr) {
            case 'rat':
                Atack(RatHP, RatCrit, RatDamage, RatArmor);
                console.log('HP крысы ' + RatHP);
                break;
            case 'woolf':
                Atack(WoolfHP, WoolfCrit, WoolfDamage, WoolfArmor);
                console.log('HP волка ' + WoolfHP);
                break;
            case 'mrakoris':
                Atack(MrakHP, MrakCrit, MrakDamage, MrakArmor);
                break;
            case 'ork':
                Atack(OrkHP, OrkCrit, OrkDamage, OrkArmor);
                console.log('HP Орка ' + OrkHP);
                break;
        }
    });

    function CloseTheBattleWindow() {
        $('.RunAwayBtn').click(function() {
            RetreatFunc();
        });
    }

    function HeroHpAfterFight() {
        HeroHPInner = 1;
        $('.HeroHP').html(HeroHPInner);
        HeroHP.innerHTML = HeroHPInner;
    }

    function BattleMess(TextMess) {
        $('.db_fight .dinamicTxt').html(TextMess);
        $('.db_fight').fadeIn(500);
        $('.fb_overlay').fadeIn(500);
    }

    function LostTheItem(heroItem) {
        IndexOf(heroItem);
        if (HeroItemIndexInv != -1) {
            CounterMinus();
        }
        if (HeroItem[1][HeroItemIndexInv] == 0) {
            var DeleteItem = document.querySelector('.counter-' + (HeroItemIndexInv));
            var RemoveItem = $(DeleteItem).parents()[1];
            HeroItemIndex = HeroItem[0].indexOf(heroItem);
            delete HeroItem[0][HeroItemIndex];
            $(RemoveItem).empty();
            $('#hero_weapon span').html('Пусто');
            $('#hero_armor_equiped span').html('Пусто');
            HeroDamageInner = 5;
            HeroAtack.innerHTML = HeroDamageInner;
        }
    }

    var Retreat = document.getElementById('RetreatFromBattle');
    Retreat.addEventListener('click', RetreatFunc);

    function RetreatFunc() {
        $('.overlay, .fight-box').fadeOut(1000);
        $('.db_fight').fadeOut();
        $('.fb_overlay').fadeOut(500);
    }

    // Дроп предметов с мобов ==================================================
    function DropItem(parameter1, parameter2) {
        var itemPrice = parameter1,
            HomeInventory = document.getElementById('inventory'),
            HeroItemIndex = HeroItem[0].indexOf(parameter2);
        if (HeroItemIndex != -1) {
            HeroItem[1][HeroItemIndex] = +HeroItem[1][HeroItemIndex] + 1;
            document.querySelector('.counter-' + (HeroItemIndex)).innerHTML = HeroItem[1][HeroItemIndex];
        } else {
            HeroItem[0].push(parameter2);
            HeroItem[1].push(1);
            HeroItem[2].push(itemPrice);
            var NameMassiveLastEl = HeroItem[0][HeroItem[0].length - 1],
                CountMassiveLastEl = HeroItem[1][HeroItem[1].length - 1],
                PriceMassiveLastEl = HeroItem[2][HeroItem[2].length - 1],
                li = document.createElement('li');
            li.innerHTML = '<label>' + '<input class="inp_radio" type=radio name="inventory">' + ' <span class="itemName">' + NameMassiveLastEl + '</span>' + ' <span class="counter counter-' + (HeroItem[0].length - 1) + ' ">' + CountMassiveLastEl + '</span>' + ', ' + '<span class="priceItemHero">' + PriceMassiveLastEl + '</span>';
            HomeInventory.appendChild(li);
        }
    }
    // Конец Битва ====================================

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
