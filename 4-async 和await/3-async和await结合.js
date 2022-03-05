const fs = require('fs');

// 之前写法 回调函数的方式
// fs.readFile('./file/1.html', (err, data1) => {
//     if (err) throw err;
//     fs.readFile('./file/2.html', (err, data2) => {
//         if (err) throw err;
//         fs.readFile('./file/3.html', (err, data3) => {
//             if (err) throw err;
//             console.log(data1 + data2 + data3);
//         })
//     })
// })

// async 与 await
const util = require('util');
// util.promisify(fs.readFile) 将方法返回值为一个promise
const mineReadFile = util.promisify(fs.readFile);

async function main() {
    try {
        let data1 = await mineReadFile('./file/1.html');
        let data2 = await mineReadFile('./file/2.html');
        let data3 = await mineReadFile('./file/3.html');
        console.log(data1 + data2 + data3);
    } catch (error) {
        console.log(error);
    }
}
main();