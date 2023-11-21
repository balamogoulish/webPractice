var fs = require('fs');

//readFileSync
console.log('Sync: ')
console.log('A');
var result = fs.readFileSync('sample.txt', 'utf8');
console.log(result);
console.log('C');
// output: A B C

//readFile
console.log('nonSync: ')
console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');
// output: A C B