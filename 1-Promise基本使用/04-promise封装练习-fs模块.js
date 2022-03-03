/**
 * 封装一个函数 minReadFile 读取文件内容
 * 参数：path 文件路径
 * 返回：promise对象
 * 
 */

function minReadFile(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) => {
            // 判断
            if (err) reject(err);
            resolve(data);
        })
    })
}

minReadFile('./resource/content.txt').then((value) => {
    console.log(value.toString());
}, (reason) => {
    console.log(reason);
})
