const fs = require('fs');

// 回调函数 形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错
//     if (err) throw err;
//     // 输出文件内容
//     console.log(data.toString());
// })

// promise 形式
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        // 如果出错
        if (err) reject(err);
        // 输出文件内容
        resolve(data);
    })
});
p.then((value) => {
    console.log(value.toString());
}, (reason) => {
    console.log(reason);
})