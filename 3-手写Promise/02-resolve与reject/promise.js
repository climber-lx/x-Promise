// 初始化搭建
function Promise(executor) {

    // resolve 函数
    function resolve(data) {

    }
    // reject 函数
    function reject(data) {

    }

    // 同步调用 【执行器函数】
    executor(resolve, reject);
}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {

}