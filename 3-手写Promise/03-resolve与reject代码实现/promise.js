// 初始化搭建
function Promise(executor) {
    // 添加属性
    this.promiseStatus = "pending";
    this.promiseResult = null;
    // 保存实例对象的 this 的值
    const self = this;  // 一般用 self  _this that
    // resolve 函数
    function resolve(data) {
        // 1.修改对象的状态(promiseStatus)
        self.promiseStatus = 'fulfiied';
        // 2.设置对象结果的值(promiseResult)
        self.promiseResult = data;
    }
    
    // reject 函数
    function reject(data) {
        // 1.修改对象的状态(promiseStatus)
        self.promiseStatus = 'rejected';
        // 2.设置对象结果的值(promiseResult)
        self.promiseResult = data;
    }

    // 同步调用 【执行器函数】
    executor(resolve, reject);
}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {

}