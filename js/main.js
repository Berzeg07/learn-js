window.onload = function() {

    // Персонаж ==================================
    var HeroPowerAbility = 1;
    var weapon = false;
    var HeroPower = document.getElementById('hero_power');
    var HeroGold = document.getElementById('hero_gold');
    var HeroGoldInner = 100;
    HeroGold.innerHTML = HeroGoldInner;

    // Журнал
    var JournalList = false;
    var JournalBox  = document.getElementById('journal_box__inner');
    var quest = {};
    var Btnjournal = document.getElementById('journal');

    if(JournalList == false){
        Btnjournal.addEventListener('click', journalOpenEmpty);
    }

    // Открываем пустой журнал
    function journalOpenEmpty(){
        var li = document.createElement('li');
        li.innerHTML = '<p>'+'Ваш журнал пуст'+'</p>';
        JournalBox.appendChild(li);
        JournalList = true;
        Btnjournal.removeEventListener('click', journalOpenEmpty);
        Btnjournal.addEventListener('click', journalOpenFull);
        $('.overlay, .journal_box').fadeIn(500);
    }

    function journalOpenFull(){
        $('.overlay, .journal_box').fadeIn(500);
    }

    $('.close').click(function journalClose(){
        $('.overlay, .journal_box').fadeOut(500);
    });

    // Конец Персонаж ==================================

    // Мастер Ларс ==========================================
    // Совет
    var BtnAdvice = document.getElementById('btn_advice');
    BtnAdvice.addEventListener('click', masterAdvice);
    var adviceResolution = false;
    function masterAdvice(){
        if(adviceResolution == false){
            alert("Ларс: Думаешь я консультирую каждого встречного?!");
        }
    }
    // Тренировка
    var BtnMaster = document.getElementById('btn_master');
    BtnMaster.addEventListener('click', training);
    var trainResolution = false;
    var haveWeapon = false;
    function training() {
        if(trainResolution == false){
            alert('Ларс: Кто ты такой? Я не тренирую всех подряд');
        }
        else if(haveWeapon == false && trainResolution == true){
            alert('Онар хорошо отзывался о тебе, у тебя есть оружие? возвращайся когда будем с чем тренироваться');
        }
        else if(haveWeapon == true && trainResolution == true){
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
        alert('На ферме Харальда пропали два работника, никто не знает, что с ними. Люди обеспокоены ');
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
    BtnOnar.disabled = true;
    BtnWorkFarm.disabled = true;

    // Разговор с охраной
    var BtnFarmeGuard = document.getElementById('btn_farmeGuard');
    var afterDialogBull = false;
    var alreadyPaySenteza = false;
    BtnFarmeGuard.addEventListener('click', FarmeGuard);

    // Разговор с Сентезой aboutMissing = false;
    function FarmeGuardFalse(){
        var paySenteza = confirm('Сентеза: Что тебе нужно, хочешь наняться на работу? Как бы там ни было если хочешь пройти дальше, плати 100 монет');
        if(paySenteza == true && HeroGoldInner >= 100){
            alert('Сентеза: такой разговор мне по душе, можешь проходить :)');
            HeroGoldInner = HeroGoldInner - 100;
            HeroGold.innerHTML = HeroGoldInner;
            BtnFarmeGuard.removeEventListener('click', FarmeGuard);
            BtnFarmeGuard.addEventListener('click', afterFirstDialog);
            alreadyPaySenteza = true;
            BtnWorkFarm.disabled = false;
        }
        else if(paySenteza == true && HeroGoldInner < 100){
            alert('У тебя и 100 монет не наберется, иди прочь оборванец!');
            return;
        }
        else if (paySenteza == false){
            return;
        }
    }
    // Разговор с Сентезой aboutMissing == false;
    function FarmeGuard() {
        FarmeGuardFalse();
    }
    function afterDialog(){
        alert('Сентеза: я тебе все сказал!');
    }

    // флаг на блокировку кнопки Онара, при работе на ферме, если квест на беседу с ним еще не получен от Сентезы
    btnOnarDisabled = false;

    function afterFirstDialog(){
        alert('С тобой приятно иметь дело :)!');
        // Разговор с Сентезой aboutMissing == true;
        if(aboutMissing == true && alreadyPaySenteza == true){
            var dialogGuard1 = confirm('Сентеза: Что тебе опять?');
            if (dialogGuard1 == false){
                return;
            }
            var dialogGuard2 = confirm('Вы: Говорят у вас пропадают люди?');
            if (dialogGuard2 == false){
                return;
            }
            var dialogGuard3 = confirm('Сентеза: Небось в таверне об этом только и твердят, тебе какое дело?');
            if (dialogGuard3 == false){
                return;
            }
            var dialogGuard4 = confirm('Вы: Я могу помочь с проблемой');
            if (dialogGuard4 == false){
                return;
            }
            var dialogGuard5 = confirm('Сентеза: Поговори с Онаром, он сейчас на складах');
            if (dialogGuard5 == false){
                return;
            }
            else{
                btnOnarDisabled = true;
                BtnOnar.disabled = false;
                BtnFarmeGuard.removeEventListener('click', afterFirstDialog);
                BtnFarmeGuard.addEventListener('click', afterDialog);
            }
        }
    }

    // Наняться на работу =======================================
    BtnWorkFarm.addEventListener('click', GoToWork);
    var timetStop = document.getElementById('stop');
    var arrButtons = [];
    var arrButtons = document.getElementsByTagName('button');
    function GoToWork(){
			window.timerId = window.setInterval(timer, 300);
            for(var i=0; i < arrButtons.length; i++){
                arrButtons[i].disabled = true;
            }
            timetStop.innerHTML = 'Вы работайте в поле';
		}

		//Останавливает таймер
		function stop(){
			window.clearInterval(window.timerId);
            number = 10;
            timeOfwork.innerHTML = number;
		}

        // Таймер
		function timer(){
			var timeOfwork = document.getElementById('timeOfwork');
			var number = parseInt(timeOfwork.innerHTML)-1;
			timeOfwork.innerHTML = number;
			if(number == 0) {
				stop();
                for(var i=0; i < arrButtons.length; i++){
                    arrButtons[i].disabled = false;
                }
                HeroGoldInner = HeroGoldInner + 100;
                HeroGold.innerHTML = HeroGoldInner;
                if(btnOnarDisabled !== true){
                    BtnOnar.disabled = true;
                }
				// timetStop.innerHTML = 'Вы заработали 100 золотых';
                alert('Вы заработали 100 золотых');
		     }
	    }

        // Разговор с Онаром
        BtnOnar.addEventListener('click', TalkToOnar);
        function TalkToOnarAfterQuest(){
            alert('Удачи');
        }
        function TalkToOnar(){
            var dialogOnar1 = confirm('Онар: Говорят ты из тех кто решает проблемы...');
            if (dialogOnar1 == false){
                return;
            }
            var dialogOnar2 = confirm('Вы: Да, я готов расследовать это дело, что известно о пропавших людях?');
            if (dialogOnar2 == false){
                return;
            }
            var dialogOnar3 = confirm('Онар: На окраинах Хориниса видели орка, может дезертир, может разведчик. В общем, теперь он обосновался не далеко от моих угодий в горах, вблизи от проезжей части. Готов поспорить это его рук дело');
            if (dialogOnar3 == false){
                return;
            }
            var dialogOnar4 = confirm('Вы: Я разберусь с этим орком!');
            if (dialogOnar4 == false){
                return;
            }
            var dialogOnar5 = confirm('Онар: Тебе нужно подготовиться и хорошо экипироваться. Я замолвлю за тебя словечко, сходи ка к Ларсу, он поможет в этом деле.');
            if (dialogOnar5 == false){
                return;
            }
            BtnOnar.removeEventListener('click', TalkToOnar);
            BtnOnar.addEventListener('click', TalkToOnarAfterQuest);
            trainResolution = true;
        }
    // Конец ферма ======================================================

    // Кузница =============================================
    var SwordForge = document.getElementById('sword_forge');
    var BtnForge = document.getElementById('btn_forge');
    var HeroItem = document.getElementById('item');
    BtnForge.addEventListener('click', forge);

    function forge() {
        if (SwordForge.checked) {
            alert("Поздравляю! Теперь у вас есть меч");
            this.removeEventListener('click', forge);
            HeroItem.innerHTML = 'Меч';
        }
        else{
            alert('Выберите предмет для ковки!');
        }
    }
    // Конец функции кузницы =================================

    // Битва =================================================
    var BtnEnemy = document.getElementById('btn_enemy');
    BtnEnemy.addEventListener('click', fight);

    function fight() {
        if(HeroPowerAbility < 3 || HeroItem.innerHTML != 'Меч'){
            alert('Вы убиты!')
            HeroPowerAbility = 1;
            HeroPower.innerHTML = HeroPowerAbility;
            // localStorage.setItem('HeroPowerAbility', HeroPowerAbility);
        }
        else{
            alert('Поздравляю! Вы победили в дуэли! Игра окончена')
        }
    }
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
