window.onload = function() {

    // Персонаж ==================================
    var HeroPowerAbility = 1;
    var weapon = false;
    var HeroPower = document.getElementById('hero_power');
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
    // Конец совет

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
    // Конец тренировки
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
    // Разговор с охраной
    var BtnFarmeGuard = document.getElementById('btn_farmeGuard');
    // var afterDialogBull = false;
    BtnFarmeGuard.addEventListener('click', FarmeGuard);

    function FarmeGuard() {
        // if(afterDialogBull == true){
        //     alert('Охрана: я тебе все сказал!');
        // }
        if(aboutMissing == false){
            alert('Охрана: Что тебе нужно? Хочешь наняться на работу? Жми соответствующую кнопку');
        }
        else if(aboutMissing == true){
            var dialogGuard1 = confirm('Охрана: Что тебе нужно? Хочешь наняться на работу? Жми соответствующую кнопку');
            var dialogGuard2 = confirm('Вы: Говорят у вас пропадают люди?');
            var dialogGuard3 = confirm('Охрана: Небось в таверне об этом только и твердят, тебе какое дело?');
            var dialogGuard4 = confirm('Вы: Я могу помочь с проблемой');
            var dialogGuard5 = confirm('Охрана: Поговори с Харальдом, он сейчас на складах');
            BtnFarmeGuard.removeEventListener('click', FarmeGuard);
            BtnFarmeGuard.addEventListener('click', afterDialog);
        }
    }
    function afterDialog(){
        alert('Охрана: я тебе все сказал!');
        // afterDialogBull = true;
        localStorage.setItem('afterDialogBull', afterDialogBull);
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
            localStorage.setItem('HeroPowerAbility', HeroPowerAbility);
        }
        else{
            alert('Поздравляю! Вы победили в дуэли! Игра окончена')
        }
    }
    // Конец функции дуэли ====================================

    // Выводим данные с локального хранилища ======================
    if (localStorage.getItem('HeroPowerAbility')!==null){
        HeroPowerAbility = localStorage.getItem('HeroPowerAbility');
        HeroPower.innerHTML = HeroPowerAbility;
    }
    if (localStorage.getItem('backgroundColor')!==null){
        bgColor = localStorage.getItem('backgroundColor');
        document.body.style.backgroundColor = (bgColor);
    }
    if (localStorage.getItem('afterDialogBull')!==null){
        afterDialogBull = localStorage.getItem('afterDialogBull');
    }
    // Конец вывод данных с локального хранилища ===================
}
// конец onload
