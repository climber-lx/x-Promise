// 初始化搭建
function Promise(executor) {
    // 添加属性
    this.promiseStatus = "pending";
    this.promiseResult = null;
    // 声明属性
    this.callback = {};
    // 保存实例对象的 this 的值
    const self = this;  // 一般用 self  _this that
    // resolve 函数
    function resolve(data) {
        // 判断状态，只能修改一次，即不为pending，就不能执行。
        if (self.promiseStatus !== "pending") { return }
        // 1.修改对象的状态(promiseStatus)
        self.promiseStatus = 'fulfiied';
        // 2.设置对象结果的值(promiseResult)
        self.promiseResult = data;
        // 调用成功的回调函数
        if (self.callback.onResolved) {
            self.callback.onResolved(data);
        }
    }

    // reject 函数
    function reject(data) {
        // 判断状态，只能修改一次，即不为pending，就不能执行。
        if (self.promiseStatus !== "pending") { return }
        // 1.修改对象的状态(promiseStatus)
        self.promiseStatus = 'rejected';
        // 2.设置对象结果的值(promiseResult)
        self.promiseResult = data;
        // 调用成功的回调函数
        if (self.callback.onRejected) {
            self.callback.onRejected(data);
        }
    }
    try {
        // 同步调用 【执行器函数】
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    // 调用回调函数  根据对象的状态判断
    if (this.promiseStatus === "fulfiied") {
        onResolved(this.promiseResult);
    }
    if (this.promiseStatus === "rejected") {
        onRejected(this.promiseResult);
    }
    // 状态三种，判断为pending的时候
    if (this.promiseStatus === "pending") {
        this.callback = {
            onResolved: onResolved,
            onRejected: onRejected
        }
    }
}