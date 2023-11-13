var Links = {
    setColor: function(color){
        var alist=document.querySelectorAll('a');
        for(i=0; i<alist.length; i++){
            alist[i].style.color=color;
        }                    
    }
}
var Body = {
    setColor: function(color){
        document.querySelector('body').style.color=color;
    },
    setBackgroundColor: function(color){
        document.querySelector('body').style.backgroundColor=color;
    }
}
function dayNightHandler(self) {
    var target=document.querySelector('body');
    if(self.value=='day'){
        Body.setColor('black');
        Body.setBackgroundColor('white');
        Links.setColor('black');
        self.value = 'black';
    } else{
        Body.setColor('white');
        Body.setBackgroundColor('black');
        Links.setColor('lightblue');
        self.value = 'day';
    }                
}