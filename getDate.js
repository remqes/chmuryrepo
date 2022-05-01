function getDate(){
    var date = new Date();
    var x = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
    return x;
}
module.exports = getDate