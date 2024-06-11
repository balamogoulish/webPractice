// function a(){
//     console.log('A');
// }

//slowfunc(callback): 함수가 실행이 끝났으니, 다음 일(callback)을 하세요!!
var a = function(){
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);