function startTimer() {
 var my_timer = document.getElementById("my_timer");
 var time = my_timer.innerHTML;
 var bgColor = 'white';
 document.body.style.backgroundColor = (bgColor);
 var arr = time.split(":");
 var m = arr[0];
 var s = arr[1];

 if (s == 0) {
   if (m == 0) {
       window.location.reload();
       return;
   }
   m--;
   if (m < 10) m = "0" + m;
   s = 59;
 }
 else s--;
 if (s < 10) s = "0" + s;
 document.getElementById("my_timer").innerHTML = m+":"+s;
 setTimeout(startTimer, 1000);
// window.timerId = window.setTimeout(startTimer, 1000);

 if(m < 5){
   //   stop();
     if(bgColor = 'white'){
       bgColor = 'grey';
       document.body.style.backgroundColor = (bgColor);
     }
     else{
       bgColor = 'white';
       document.body.style.backgroundColor = (bgColor);
     }
 }
 localStorage.setItem('backgroundColor', bgColor);

 // остановка таймера
//   function stop() {
   // 		window.clearInterval(window.timerId);
 // 	}
 //=============================================
}
