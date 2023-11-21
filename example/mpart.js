var M = {
    v:'v',
    f: function(){
        console.log(this.v);
    }
}

module.exports = M; //객체 M을 바깥에서 사용할 수 있도록 exports