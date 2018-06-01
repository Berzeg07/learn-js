window.onload = function() {

    // Персонаж ==================================
    var HeroPowerAbility = 1;
    var weapon = false;
    var HeroPower = document.getElementById('hero_power');
    var HeroGold = document.getElementById('hero_gold');

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
    function training() {
        if(trainResolution == false){
            alert('Ларс: Кто ты такой? Я не тренирую всех подряд');
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
    // Значение для квеста на ферме
    var aboutMissing = false;
    function rumors() {
        aboutMissing = true;
        alert('На ферме Харальда пропали два работника, никто не знает, что с ними. Люди обеспокоены ');
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
    BtnFarmeGuard.addEventListener('click', FarmeGuard);
    function FarmeGuard() {
        if(aboutMissing == false){
            var paySenteza = confirm('Сентеза: Что тебе нужно, хочешь наняться на работу? Как бы там ни было если хочешь пройти дальше, плати 100 монет');
            if (paySenteza = true){
                alert('Сентеза: такой разговор мне по душе, можешь проходить :)');
                BtnWorkFarm.disabled = false;
                BtnFarmeGuard.removeEventListener('click', FarmeGuard);
                BtnFarmeGuard.addEventListener('click', afterFirstDialog);
            }
        }
    }
    function afterDialog(){
        alert('Сентеза: я тебе все сказал!');
    }
    function afterFirstDialog(){
        alert('С тобой приятно иметь дело :)!');
        if(aboutMissing == true){
            var dialogGuard1 = confirm('Сентеза: Что тебе опять?');
            var dialogGuard2 = confirm('Вы: Говорят у вас пропадают люди?');
            var dialogGuard3 = confirm('Сентеза: Небось в таверне об этом только и твердят, тебе какое дело?');
            var dialogGuard4 = confirm('Вы: Я могу помочь с проблемой');
            var dialogGuard5 = confirm('Сентеза: Поговори с Онаром, он сейчас на складах');
            BtnFarmeGuard.removeEventListener('click', afterFirstDialog);
            BtnFarmeGuard.addEventListener('click', afterDialog);
            BtnOnar.disabled = false;
        }
    }

    // Наняться на работу
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
		function timer(){
			var timeOfwork = document.getElementById('timeOfwork');
			var number = parseInt(timeOfwork.innerHTML)-1;
			timeOfwork.innerHTML = number;
			if(number == 0) {
				stop();
                for(var i=0; i < arrButtons.length; i++){
                    arrButtons[i].disabled = false;
                }
				timetStop.innerHTML = 'Вы заработали 100 золотых';
		     }
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
