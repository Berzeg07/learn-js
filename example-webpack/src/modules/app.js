function tabs(a) {
    console.log('модуль: app.js' + a)
}
tabs(1);

let add = (a,b) => a+b;
console.log(add(2,5));

(function(){
    let number = 2;
    console.log(number);

    return console.log(number + 3);
}());

// let user = (function() {
//     // эта часть не видна снаружи
//     let privat = function() {
//         console.log('i am privat');
//     };
//     return {
//         sayHello: function(){
//             console.log('Hello');
//         }
//     };
// }());

let user = (function() {
    let privat = function() {
        console.log('i am privat');
    };
    let sayHello = function() {
        console.log('Hello');
    };
    return {
        sayHello: sayHello
    };
}());

console.log(user);
console.log(user.sayHello());
