/**
 * util.promisify 方法
 */

// 引入 util 模块
const util = require('util');
// 引入fs模块
const fs = require('path');
// 返回一个新的函数
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource/content.txt').then((value) => {
    console.log(value.toString());
}, (reason) => {
    console.log(reason);
})
