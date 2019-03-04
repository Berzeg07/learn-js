window.onload = function() {

    var BattleMap = document.getElementById('BattleMap'),
        block;
    for (var i = 1; i <= 9; i++) {
        for (var j = 1; j <= 9; j++) {
            block = document.createElement('div');
            block.className = 'block';
            BattleMap.appendChild(block);
        }
    }







}
