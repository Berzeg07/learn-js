window.onload = function() {

    // Баг - экипировка брони все плюсуется (исправлен)
    // Баг - исчезает окно предметов у продавца при клике на товар (исправлен)

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
        HeroArmorBase = 5,
        HeroArmorInner = HeroArmorBase;

    HeroArmor.innerHTML = HeroArmorInner;
    HeroAtack.innerHTML = HeroAtackInner;
    HeroCriticalAtack.innerHTML = HeroCritInner + '%';
    HeroPower.innerHTML = HeroPowerInner;
    HeroGold.innerHTML = HeroGoldInner;
    HeroHP.innerHTML = HeroHPInner;

    function HeroBaseAtack() {
        HeroAtackInner = HeroDamageInner + HeroPowerInner;
        HeroAtack.innerHTML = HeroAtackInner;
    }

    function HeroBaseArmor() {
        HeroArmorInner = HeroArmorBase;
        HeroArmor.innerHTML = HeroArmorInner;
    }

    // Крыса ============================================================
    var RatHPBase = 5,
        RatHP = RatHPBase,
        RatPower = 10,
        RatDamage = RatPower + 5,
        RatCrit = 10,
        RatArmor = 5,
        // Волк ============================================================
        WoolfHPBase = 5,
        WoolfHP = WoolfHPBase,
        WoolfPower = 15,
        WoolfDamage = WoolfPower + 10,
        WoolfCrit = 20,
        WoolfArmor = 10,

        // Мракорис ====================================================
        MrakHPBase = 10,
        MrakHP = MrakHPBase,
        MrakPower = 0,
        MrakDamage = MrakPower + 5,
        MrakCrit = 10,
        MrakArmor = 5,

        // Орк =========================================================
        OrkHPBase = 10,
        OrkHP = OrkHPBase,
        OrkPower = 10,
        OrkDamage = OrkPower + 5,
        OrkCrit = 10,
        OrkArmor = 1;

    // Покупка предметов ===============================================

    // Работа с объектом event
    function ProductfadeOut(class_1, class_2) {
        if ($(event.target).closest(class_1).length)
            return;
        $(class_2).fadeOut("300");
        event.stopPropagation();
    }

    $('#ShowTheProduct').click(function() {
        $(".shop_box").slideToggle(300);
    });
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
                HeroBaseArmor();
            }
            if (HeroWeaponEquiped == itemCheckInvName) {
                $('#hero_weapon span').html('Пусто');
                HeroBaseAtack();
            }
        }
        ItemImgFadeOut();
    }

    function ItemImgFadeOut() {
        var EquipArmor = $('#hero_armor_equiped span').html();
        var EquipWeapon = $('#hero_weapon span').html();
        if (EquipArmor == 'Пусто') {
            $('.Hero_Armor').css('display', 'none');
        }
        if (EquipWeapon == 'Пусто') {
            $('.Hero_Weapon').css('display', 'none');
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
    // Не забыт ьпоменять значение
    var AccessToTheForge = false;
    var HaraldMission = false;
    var HornOfMrakoris = false;

    $('#HaraldProduct').click(function() {
        $('.bg_inner__forge').slideToggle(300);
    });

    function Forge() {
        var itemCheck = $('input[name=forgeItem]:checked'),

            HeroItemPrice = $('input[name=forgeItem]:checked').siblings('.priceItemHero').html(),
            itemCheckVal = $('input[name=forgeItem]:checked').val();

        if (AccessToTheForge == true) {
            var ItemSteel = HeroItem[0].indexOf('Сырая сталь');
            var ItemMrakoris = HeroItem[0].indexOf('Рог Мракориса');

            if (typeof itemCheckVal === 'undefined') {
                TalkToHaraldTxt('<p>Выберите предмет!</p>');
                FadeInForgeDB();
            }
            if (HeroGoldInner < HeroItemPrice) {
                TalkToHaraldTxt('<p>Не достаточно денег!</p>');
                FadeInForgeDB();
            }

            if (ItemSteel != -1 && ItemMrakoris != -1 && typeof itemCheckVal != 'undefined') {
                BuyItem(itemCheck, itemCheckVal);
                TalkToHaraldTxt('<p>' + itemCheckVal + ' в вашем инвентаре!' + '</p>');
                FadeInForgeDB();
                PassTheItems(ItemSteel, 1);
                PassTheItems(ItemMrakoris, 1);
            }

            if (ItemSteel == -1 && typeof itemCheckVal != 'undefined') {
                TalkToHaraldTxt('<p>Не хватает сырья! </p>');
                FadeInForgeDB();
            }

            if (ItemMrakoris == -1 && typeof itemCheckVal != 'undefined') {
                TalkToHaraldTxt('<p>Говоришь нужно легендарное оружие? Изготовка оружия такого уровня это ритуал в высшем смысле этого слова, требуется особый состав для обработки стали. Добудь мне рог Мракориса! </p>');
                FadeInForgeDB();
                var HaraldQuestWeapon = '<span class="QuestTitle">' + 'Легендарное оружие' + '</span>';
                var HaraldQuestWeaponTxt = '<ul class="HaraldQuestWeapon">' + '<li>' + HaraldQuestWeapon + '<br>' + ' - Харальд может изготовить мне уникальное оружие и броню. Чтобы приготовить состав для обработки стали требуется вытащить рог из опасного зверя, конечно же перед этим убив его, но как убить Мракориса?' + '</li>' + '</ul>';
                QuestListArr(HaraldQuestWeapon, HaraldQuestWeaponTxt, '#journal_box__inner');
                HornOfMrakoris = true;
            }
        } else {
            TalkToHaraldTxt('<p>Харальд: Наша кузница производит снаряжение только для ополчения и граждан этого города! Тебя я не знаю.</p>');
            HaraldMission = true;
            var HaraldQuest = '<span class="QuestTitle">' + 'Гражданин Хориниса' + '</span>';
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
        ['Полуторный меч', 'Двуручный меч', 'Дубинка', 'Потрошитель Дракона'],
        ['Кожаная броня', 'Пластинчатый доспех', 'Доспех Ворона'],
        ['Сырая сталь', 'Охотничий нож', 'Рог Мракориса', 'Хвост крысы', 'Волчья шкура']
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
            HeroArmorInner = HeroArmorBase;
            HeroArmorInner = HeroArmorInner + Number(ItemStats);
            HeroArmor.innerHTML = HeroArmorInner;
        }
        if (HeroItemMaterial != -1) {
            $('.HomeMessageAlert').fadeIn();
        }
        if (HeroItemWeapon != -1) {
            var checkWeapon = $('#hero_weapon span').html();
            if (checkWeapon != itemCheckInvName) {
                $('#hero_weapon span').html(itemCheckInvName);
                HeroAtackInner = HeroDamageInner + HeroPowerInner;
                HeroAtackInner = HeroAtackInner + Number(ItemStats);
                HeroAtack.innerHTML = HeroAtackInner;
            }
        }
        ItemsImg();
    }

    function ItemsImg() {
        var EquipArmor = $('#hero_armor_equiped span').html();
        var EquipWeapon = $('#hero_weapon span').html();
        if (EquipArmor != 'Пусто') {
            switch (EquipArmor) {
                case 'Кожаная броня':
                    HeroItemImgDN('.Hero_Armor');
                    $('.leather-armor').css('display', 'block');
                    break;

                case 'Пластинчатый доспех':
                    HeroItemImgDN('.Hero_Armor');
                    $('.heavy-armor').css('display', 'block');
                    break;

                case 'Доспех ворона':
                    HeroItemImgDN('.Hero_Armor');
                    $('.armor-crow').css('display', 'block');
                    break;
            }
        }
        if (EquipWeapon != 'Пусто') {
            switch (EquipWeapon) {
                case 'Дубинка':
                    HeroItemImgDN('.Hero_Weapon');
                    $('.stick').css('display', 'block');
                    break;

                case 'Полуторный меч':
                    HeroItemImgDN('.Hero_Weapon');
                    $('.sword').css('display', 'block');
                    break;

                case 'Двуручный меч':
                    HeroItemImgDN('.Hero_Weapon');
                    $('.long-sword').css('display', 'block');
                    break;

                case 'Потрошитель дракона':
                    HeroItemImgDN('.Hero_Weapon');
                    $('.ripper').css('display', 'block');
                    break;
            }
        }
    }

    function HeroItemImgDN(ItemImgClassName) {
        $(ItemImgClassName).css('display', 'none');
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

    // Незабыть поменять булево значение
    // var trainResolution = false;
    var trainResolution = true;
    // Совет
    var BtnAdvice = document.getElementById('btn_advice');
    BtnAdvice.addEventListener('click', masterAdvice);

    function PassTheItems(ItemName, number) {
        if (ItemName != -1) {
            HeroItem[1][ItemName] = +HeroItem[1][ItemName] - number;
            document.querySelector('.counter-' + (ItemName)).innerHTML = HeroItem[1][ItemName];
        }
        if (HeroItem[1][ItemName] == 0) {
            var DeleteItem = document.querySelector('.counter-' + (ItemName));
            var RemoveItem = $(DeleteItem).parents()[1];
            delete HeroItem[0][ItemName];
            $(RemoveItem).empty();
        }
    }

    var HornOfMrakoris = false;

    function masterAdvice() {
        if (trainResolution == true) {
            if (HaraldMission == true) {
                $('.master .db .dinamicTxt').html('<p class="LarsTxt LarsTxtFirst" id="QuestionToLars-1">' + 'На что влияет сила?' + '</p>' + '<p class="LarsTxt LarsTxtSecond" id="QuestionToLars-3">' + 'Какую броню лучше носить?' + '</p>' + '<p class="LarsTxt" id="QuestionToLars-2">' + 'Как стать гражданином Хориниса?' + '</p>');
            }
            if (HornOfMrakoris == true) {
                $('.master .db .dinamicTxt').html('<p class="LarsTxt LarsTxtFirst" id="QuestionToLars-1">' + 'На что влияет сила?' + '</p>' + '<p class="LarsTxt LarsTxtSecond" id="QuestionToLars-3">' + 'Какую броню лучше носить?' + '</p>' + '<p class="LarsTxt" id="QuestionToLars-4">' + 'Что можешь рассказать о Мракорисе?' + '</p>');
            }
            if (HornOfMrakoris != true && HaraldMission != true) {
                $('.master .db .dinamicTxt').html('<p class="LarsTxt LarsTxtFirst" id="QuestionToLars-1">' + 'На что влияет сила?' + '</p>' + '<p class="LarsTxt LarsTxtSecond" id="QuestionToLars-3">' + 'Какую броню лучше носить?' + '</p>');
            }
            $('.master .db').fadeIn();
            btnDisabledTrue();
            $('#QuestionToLars-1').click(function() {
                $('.master .db .dinamicTxt').html('<p>' + 'Сила увеличивает мощь твоих ударов!' + '</p>');
            });
            $('#QuestionToLars-3').click(function() {
                $('.master .db .dinamicTxt').html('<p>' + 'Тяжелая броня делает тебя крепче, но в ней ты более медлительный и быстрее устаешь, в некоторых ситуациях в тяжелом снаряжении ты будешь более уязвимым.' + '</p>');
            });
            $('#QuestionToLars-4').click(function() {
                $('.master .db .dinamicTxt').html('<p>' + 'Ларес: Опасный зверь, но довольно медлительный. Даже не думай подобраться незаметно, учуит за сотню шагов. Если уж встретился  с этой зверюгой лицом к лицу, тебя спасет только скорость и проворство!' + '</p>');
                var HaraldQuestMrakoris = '<span class="QuestTitle">' + 'Рог Мракориса' + '</span>';
                var HaraldQuestMrakorisTxt = '<li>' + ' - Ларес сказал, чтобы победить медлительного Мракориса нужно быть налегке.' + '</li>';
                QuestListArr(HaraldQuestMrakoris, HaraldQuestMrakorisTxt, '.HaraldQuestWeapon');
            });
            $('#QuestionToLars-2').click(function() {
                $('.master .db .dinamicTxt').html('<p>' + 'Чтобы стать гражданином, кто то из влиятельных жителей города должен за тебя поручиться!' + '</p>' + '<button class="btn LaresQuest">' + 'Помоги стать гражданином...' + '</button>');
                $('.LaresQuest').click(function() {
                    $('.master .db .dinamicTxt').html('<p>' + 'Ты должен проявить себя в каком либо деле, скажем охотничем... Добудь мне три хвоста болотной крысы и две волчьи шкуры.' + '</p>');
                    var LaresQuest = '<span>' + 'Задание Лареса' + '</span>';
                    var LaresQuestTxt = '<li>' + '- Ларес поможет мне стать гражданином, но для этого я должен добыть для него 2 хвоста болотной крысы и 3 волчьи шкуры' + '</li>';
                    QuestListArr(LaresQuest, LaresQuestTxt, '.HaraldQuest');
                    $('.lares_btn').append('<button class="btn" id="PassLarsQuest">Сдать задание</button>');

                    $('#PassLarsQuest').click(function() {
                        var ItemIndexRatTail = HeroItem[0].indexOf('Хвост крысы');
                        var ItemIndexWoolfSkin = HeroItem[0].indexOf('Волчья шкура');
                        if (ItemIndexRatTail != -1 && ItemIndexWoolfSkin != -1) {
                            var CountTail = $('.counter-' + (ItemIndexRatTail)).html();
                            var CountSkin = $('.counter-' + (ItemIndexWoolfSkin)).html();

                            if (CountTail >= 2 && CountSkin >= 3) {
                                $('.master .db .dinamicTxt').html('Ларес: Ну чтож, мы поздравления, ты теперь гражданин Хориниса!');
                                $('.db_lares').fadeIn();
                                $("#PassLarsQuest").remove();
                                PassTheItems(ItemIndexRatTail, 2);
                                PassTheItems(ItemIndexWoolfSkin, 3);
                                AccessToTheForge = true;
                                var LaresQuestPass = '<span>' + 'Я гражданин' + '</span>';
                                var LaresQuestPassTxt = '<li>' + '- Ларес поручился за меня, я теперь гражданин Хориниса!' + '</li>';
                                QuestListArr(LaresQuestPass, LaresQuestPassTxt, '.HaraldQuest');
                            } else {
                                $('.master .db .dinamicTxt').html('Условие не выполнено!');
                                $('.db_lares').fadeIn();
                            }
                        } else {
                            $('.master .db .dinamicTxt').html('Условие не выполнено!');
                            $('.db_lares').fadeIn();
                        }
                    });
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
        var HeroWeaponEquiped = $('#hero_weapon span').html();
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

    // Квест Онара взят
    var OnarQuestTaken = false;

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
        ProductfadeOut('.marketPlace', '#shop_box');
        ProductfadeOut('.forge', '.bg_inner__forge');
    };

    function TalkToOnar() {

        // if (btnOnarDisabled !== true) {
        //     $('.master_btn__box .tooltip').fadeIn();
        // }
        if(OnarQuestTaken == true){
            $('.db-onar .dinamicTxt').html('');
            $('.db-onar .dinamicTxt').html(
                '<div class="BanditsAnswears ba-1"><p><b>Онар:</b> Удачи! </p></div>' +
                '> <i class="leave" style="cursor:pointer;">Покинуть ферму</i>'
            );
            $('.OnarDialogBox').fadeIn();
            $('.overlay').fadeIn();

            $('.leave').click(function(){
                $('.OnarDialogBox').fadeOut();
                $('.overlay').fadeOut();
            });
        }

        if (btnOnarDisabled != true) {
            $('.db-onar .dinamicTxt').append(
                '<div class="BanditsAnswears ba-1"><p><b>Онар:</b> Слышал ты из тех кто решает проблемы? </p></div>' +
                '<div class="tab__box" id="tab-1"><p><b>Онар:</b> Борка и Дерек, два неразлучных собутыльника. Сначала исчез Дерек, через день сгинул Борка. Он нужен был мне утром, хотел задать пару вопросов, охрана доложила, что он ушел ближе к ночи и не вернулся, решили, как обычно идет нажираться в таверне. </p></div>' +
                '<div class="tab__box" id="tab-2"><p><b>Онар:</b> Ты не должен об этом никому говорить, пропал мой сундук с золотом. Борка заправлял частью моей казны, Дерек его давнешний телохранитель, вместе они и провернули это дельце.</p></div>' +
                '<div class="tab__box" id="tab-3"><p><b>Онар:</b> Кругом отвесные скалы, из этой долины только два выхода, по морю или через перевал. Ни там, ни там муха не пролезет без моего ведома. Мои люди обшарили все окрестности, есть только одно место где они могли спрятаться и куда мне не добраться, туманная лощина! Туда я своих людей не пошлю, в этих топях сгинуло не мало народу.</p></div>' +
                '<div class="tab__box" id="tab-4"><p><b>Онар:</b> Они хорошо экипированы, Дерек искусен в обращении с двуручным мечом, ты должен быть хорошо подготовлен, если конечно не передумал браться за это дело. Я замолвлю за тебя словечко, Ларес тебя потренерует.</p></div>' +
                '<div class="tab__box" id="tab-5"><p><b>Онар:</b> В обиде не останешься, 2000 золотых за их головы и еще 5000 за возврат сундука с содержимым.</p></div>' +
                '<div class="tab__box" id="tab-6"><p><b>Онар:</b> (Усмехается) Как я и сказал, в этой долине ничего не происходит без моего ведома, король слаб, мои люди повсюду, я все вижу :)</p> </div>' +
                '<ul class="HeroQuestionsList tab">' +
                '<li> > <i class="HeroAnswear-2"><a href="#tab-1">Я готов расследовать это дело, что известно о пропавших людях?</i></a></li>' +
                    '<ul class="toogleHeroQuestions" style="display:none;">'+
                        '<li> > <i class="HeroAnswear-3"><a href="#tab-2">Они ушли с пустыми руками?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-4"><a href="#tab-3">Есть предположения куда они могли податься?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-5"><a href="#tab-4">Чего мне стоит ожидать?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-6"><a href="#tab-5">Сколько я получу за это дело?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-7"><a href="#tab-6">Почему ты уверен, что я не сбегу с твоим золотом в случае успеха?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-8"> <a style="cursor:pointer;">Покинуть ферму</a></i></li>' +
                    '</ul>'+
                '</ul>'
            );

            $('.HeroAnswear-2').click(function(){
                trainResolution = true;
                var OnarQuest = '<span>' + 'Задание Онара' + '</span>';
                var OnarQuestTxt = '<li>' + ' - Пропавшие Борка и Дерек вовсе не пропали, захватили с собой сундук с золотом Онара и скрылись. Онар уверен, что они прячутся в туманной лощине. Нужно найти их живыми или мертвыми и вернуть сундук с золотом' + '</li>' + '<li>' + ' - Онар за меня поручился, теперь я могу тренироваться у Лареса' + '</li>';
                QuestListArr(OnarQuest, OnarQuestTxt, '.LostPeopleQuest');
            });

            $('.HeroAnswear-8').click(function(){
                $('.OnarDialogBox').fadeOut();
                $('.overlay').fadeOut();
                OnarQuestTaken = true;
                btnOnarDisabled = true;
            });

            $('.db-onar').fadeIn();
            DialogBox('.OnarDialogBox');
            $('.tab a').click(function(e) {
                e.preventDefault();
                $('.toogleHeroQuestions').slideDown();
                $('.ba-1').css('display', 'none');
                var tab = $(this).attr('href');
                $('.tab__box').not(tab).css({
                    'display': 'none'
                });
                $(tab).fadeIn(400);
            });
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
    // не забыть поменять значение
    var DefeatOrk = true;

    function DefeatTheOrk() {
        var EnemyAttr = $('#AtackToBattle').attr('name');
        if (EnemyAttr == 'ork') {
            DefeatOrk = true;
            console.log(DefeatOrk);
        }
    }

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
        }
        if (EnemyCrit <= BattleEnemyCrit) {
            BattleEnemyDamageNew = BattleEnemyDamageNew * 2;
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
                BattleMess('<p>' + 'Ты едва выжил в этой схватке и еле унес ноги побросав все снаряжение!' + '</p>' + '<div class="RunAway">' + '>> ' + ' &npbsp; <button class="RunAwayBtn DbBtn">' + 'Бежать со всех ног!' + '</button> ' + ' <<' + '</div>');
                CloseTheBattleWindow();

            } else {
                BattleMess('<p>' + 'Ты тяжело ранен, но чудом сумел скрыться, истекая кровью!' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Бежать со всех ног!' + '</button> ' + ' <<' + '</div>');
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
                        DropItem(150, 'Волчья шкура');
                        BattleMess('<p>' + 'Вы победили! Добыча: ' + '<span style="font-weight:bold;">Волчья шкура</span>' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
                        break;
                    case 'mrakoris':
                        DropItem(300, 'Рог Мракориса');
                        BattleMess('<p>' + 'Вы победили! Добыча: ' + '<span style="font-weight:bold;">Рог Мракориса</span>' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
                        break;
                    case 'ork':
                        DefeatTheOrk();
                        break;
                }
            } else {
                BattleMess('<p>' + 'Ты победил!' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
                DefeatTheOrk();
            }
            CloseTheBattleWindow();
        }
        if (HeroHPInner <= 10 && BattleEnemyHP <= 0) {
            BattleMess('<p>' + 'Ты победил с большим трудом и истек кровью, здоровье на минимуме!' + '</p>' + '<div class="RunAway">' + '>> ' + ' <button class="RunAwayBtn DbBtn">' + 'Покинуть место боя' + '</button> ' + ' <<' + '</div>');
            DefeatTheOrk();
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
        $('#RetreatFromBattle').css('display', 'inline-block');
        RatHP = RatHPBase;
        console.log(RatHP);
    });
    $('#woolf').click(function() {
        BeastInner('Волк', '<img class="woolf_img" src="img/woolf.png" alt="">', 'woolf');
        $('#RetreatFromBattle').css('display', 'inline-block');
        WoolfHP = WoolfHPBase;
    });
    $('#mrakoris').click(function() {
        BeastInner('Мракорис', '<img class="mrakoris_img" src="img/mrakoris.png" alt="">', 'mrakoris');
        $('#RetreatFromBattle').css('display', 'inline-block');
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
            HeroBaseAtack();
            HeroBaseArmor();
        }
        ItemImgFadeOut();
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


    // Туманная Лощина =========================================================
    var MapHollow = true;

    function FightOrkHollow() {
        BeastInner('Орк', '<img class="ork_img" src="img/orkavatar.png" alt="">', 'ork');
        OrkHP = OrkHPBase;
        $('.db-hollow').fadeOut();
    }

    $('#FoggyHollow').click(function() {
        if (MapHollow == false && DefeatOrk == false) {
            $('#dinamicTxtHollow').html('<p>Кругом сплошные болота! Ты не знаешь эти места, нужна карта или проводник, иначе рискуешь угодить в трясину!</p> <button class="btn GoToHollow">Пройти дальше</button> <button class="btn close_db-hollow">Вернуться</button>');
            $('.db-hollow').fadeIn();
            $('.close_db-hollow').click(function() {
                $('.dialog_box').fadeOut();
            });
            $('.GoToHollow').click(function() {
                var HeroWeaponBattle = $('#hero_weapon span').html(),
                    HeroArmorBattle = $('#hero_armor_equiped span').html();
                if (HeroWeaponBattle != 'Пусто') {
                    LostTheItem(HeroWeaponBattle);
                }
                if (HeroArmorBattle != 'Пусто') {
                    LostTheItem(HeroArmorBattle);
                }
                if (HeroWeaponBattle != 'Пусто' || HeroArmorBattle != 'Пусто') {
                    $('#dinamicTxtHollow').html('<p>' + 'Ты почти захлебнулся в трясине, но чудом спасся освободившись от тянущего на дно снаряжения. Здоровье на минимуме!' + '</p>');
                }
                if (HeroWeaponBattle == 'Пусто' && HeroArmorBattle == 'Пусто') {
                    $('#dinamicTxtHollow').html('<p>Ты едва не захлебнулся в трясине. Здоровье на минимуме!</p>');
                }
                HeroHPInner = 1;
                HeroHP.innerHTML = HeroHPInner;
            });
        }
        if (MapHollow == true && DefeatOrk == false) {
            $('#dinamicTxtHollow').html('<p>Битый час ты петлял по тропам указаным на карте, пока не наткнулся на пещеру в большом холме. Из пещеры исходит свет играющего пламени, что ты предпримешь?</p> <button class="btn AtackTheCave">Ворваться внутрь!</button> <button class="btn FollowTheCave">Наблюдать</button>');
            $('.db-hollow').fadeIn();
            $('.AtackTheCave').click(function() {
                $('#RetreatFromBattle').css('display', 'none');
                FightOrkHollow();
            });
            $('.FollowTheCave').click(function() {
                $('#dinamicTxtHollow').html('<p>Просидев в кустах битый час ты услышал звук глухих шагов доносящийся из глубины пещеры. Скоро наружу вышел устрашающего вида Орк с огромным топором, который он держал на правом плече. Он осмотрелся по сторонам, фыркая и нюхая воздух, и остановил взгляд на зарослях, в которых ты прятался! Твои действия?</p> <button class="btn AtackTheOrk">Атаковать!</button> <button class="btn RunFromOrk">Бежать</button>');
                $('.AtackTheOrk').click(function() {
                    $('#RetreatFromBattle').css('display', 'none');
                    FightOrkHollow();
                });
            });
        }
        if (DefeatOrk == true) {
            $('.HollowDB .dinamicTxt').html('<p>Исследовав местность вокруг пещеры орка ты нашел тропу, которая не указана на карте. Проследовав по ней ты вышел на деревянную хижину. Из дымохода шел густой дым, внутри кто-то был, и тут тебя заметили!</p> <button class="btn NextBtn">Далее...</button>');
            DialogBox('.HollowDB');

            $('.NextBtn').click(function() {
                $('.db-bandits .dinamicTxt').html('<p><b>Борка:</b> Так так! Кто здесь у нас, быстро говори откуда и зачем пришел!?</p>' +
                    '<ul>' +
                    '<li><span>></span> <i class="HeroAnswear-1">Онар обеспокоен вашим неожиданным исчезновением, он почти уверен, что вы метрвы, меня послали разобраться с этим </i></li>' +
                    '</ul>'
                );
                $('.HeroAnswear-1').click(function() {
                    $('.db-bandits .dinamicTxt').html('');
                    $('.db-bandits .dinamicTxt').append(
                        '<div class="BanditsAnswears ba-1"><p><b>Борка:</b> Слушай, не будем ходить вокруг да около, тебя мы не знаем, как и ты нас. Вот как мы поступим, забирай этот мешочек с золотом, да, да там 1000 золотых. Возвращайся на ферму и пусть Онар продолжает быть уверенным, что мы мертвы, что скажешь?</p></div>' +
                        '<div class="BanditsAnswears tab__box" id="tab-1"><p><b>Борка:</b> Нам не нужны проблемы и у тебя нет выбора. Тысяча золотых хорошее предложение, подумай, кому нужны лишние трупы... (Поглаживает рукоять меча) </p></div>' +
                        '<div class="BanditsAnswears tab__box" id="tab-2"><p><b>Борка:</b> Онар кинул нас на одном крупном деле, эти деньги ему не принадлежат, мы лишь забрали свое</p></div>' +
                        '<div class="BanditsAnswears tab__box" id="tab-3"><p><b>Борка:</b> Нам лучше, если для всех будем мертвы и ты сообщишь об этом. Все знают, что ты пришел сюда, если ты не вернешься, Онар наверняка пошлет по твоему следу отряд наемников, если уже этого не сделал. Тем более ты лишил нас единственной защиты, бедный Орк (Ухмыляется)</p></div>' +
                        '<div class="BanditsAnswears tab__box" id="tab-4"><p><b>Борка:</b> Мы ожидаем нашего человека, проводника, он выведет нас отсюда другим путем</p></div>' +
                        '<div class="BanditsAnswears tab__box" id="tab-5"><p><b>Борка:</b> Хорошее решение, в долгу не останемся. Держи (Кидает кошелек с золотом)</p></div>' +
                        '<div class="BanditsAnswears tab__box" id="tab-6"><p><b>Борка:</b> Зря ты так... </p> <button class="btn AtackTheBandits">В атаку!</button></div>' +
                        '<ul class="HeroQuestionsList tab">' +
                        '<li> > <i class="HeroAnswear-2"><a href="#tab-1">Что будет если я откажусь?</i></a></li>' +
                        '<li> > <i class="HeroAnswear-3"><a href="#tab-2">Онара больше заботит его сундук с золотом, чем  ваша судьба</a></i></li>' +
                        '<li> > <i class="HeroAnswear-4"><a href="#tab-3">Почему вы решили меня отпустить, еще и с золотом?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-5"><a href="#tab-4">Думайте, вы сможете долго тут скрываться?</a></i></li>' +
                        '<li> > <i class="HeroAnswear-6"><a href="#tab-5">Ладно, я согласен, давайте золото</a></i></li>' +
                        '<li> > <i class="HeroAnswear-7"><a href="#tab-6">Вам меня не провести, готовьтесь к битве!</a></i></li>' +
                        '</ul>'
                    );
                    $('.tab a').click(function(e) {
                        e.preventDefault();
                        $('.ba-1').css('display', 'none');
                        var tab = $(this).attr('href');
                        $('.tab__box').not(tab).css({
                            'display': 'none'
                        });
                        $(tab).fadeIn(400);
                    });
                    var HeroGoldCurrent = $('#hero_gold').html();
                    $('.HeroAnswear-6').click(function() {
                        HeroGoldCurrent = Number(HeroGoldCurrent) + 1000;
                        HeroGold.innerHTML = HeroGoldCurrent;
                        console.log(HeroGoldCurrent);
                        $('.tab').html('<li> > <i class="LeaveTheHollow">Покинуть лощину</i></li>');
                    });
                });
                $('.db-bandits').fadeIn();
                DialogBox('.BanditsDialogBox');
                $('.HollowDB').fadeOut();
            })
        }
    });

    // $('.tab a').click(function(e) {
    // 		e.preventDefault();
    // 		// $('a').removeClass('active');
    // 		// $(this).addClass('active');
    // 		var tab = $(this).attr('href');
    // 		$('.tab__box').not(tab).css({'display':'none'});
    // 		$(tab).fadeIn(400);
    // 	});
    //     $('.tab a:first').click();

    function DialogBox(ClassName) {
        $(ClassName).fadeIn(300);
        $('.overlay').fadeIn(300);
    }

    function BanditsDBLists(BanditsAnswears) {
        $('.db-bandits .dinamicTxt').html(BanditsAnswears +
            '<ul>' +
            '<li><span>></span> <i class="HeroAnswear-2">Что будет если я откажусь?</i></li>' +
            '<li><span>></span> <i class="HeroAnswear-3">Онара больше заботит его сундук с золотом, чем  ваша судьба</i></li>' +
            '<li><span>></span> <i class="HeroAnswear-4">Почему вы решили меня отпустить, еще и с золотом?</i></li>' +
            '<li><span>></span> <i class="HeroAnswear-5">Думайте, вы сможете долго тут скрываться?</i></li>' +
            '<li><span>></span> <i class="HeroAnswear-6">Ладно, я согласен, давайте золото</i></li>' +
            '<li><span>></span> <i class="HeroAnswear-7">Вам меня не провести, готовьтесь к битве!</i></li>' +
            '</ul>'
        );
    }



    // Конец туманная лощина ===================================================

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
