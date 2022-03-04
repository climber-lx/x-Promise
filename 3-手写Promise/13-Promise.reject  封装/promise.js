// 初始化搭建
function Promise(executor) {
    // 添加属性
    this.promiseStatus = "pending";
    this.promiseResult = null;
    // 声明属性
    this.callback = [];
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
        self.callback.forEach(item => {
            item.onResolved(data);
        });
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
        self.callback.forEach(item => {
            item.onRejected(data);
        });
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
    const self = this;
    // 判断 回调函数参数
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason;
        }
    }
    if (typeof onResolved !== 'function') {
        onResolved = value => value
    }
    return new Promise((resolve, reject) => {
        // 重复代码太多，封装函数
        function callback(type) {
            try {
                // 获取回调函数的执行结果
                let result = type(self.promiseResult);
                if (result instanceof Promise) {
                    // 如果是一个promise
                    result.then((v) => {
                        resolve(v);
                    }, (r) => {
                        reject(r);
                    })
                } else {
                    // 结果的状态为 【成功】
                    resolve(result);
                }
            } catch (error) {
                reject(error)
            }
        }
        // 调用回调函数  根据对象的状态判断
        if (this.promiseStatus === "fulfiied") {
            callback(onResolved);
        }
        if (this.promiseStatus === "rejected") {
            callback(onRejected);
        }
        // 状态三种，判断为pending的时候
        if (this.promiseStatus === "pending") {
            // 保存回调函数
            this.callback.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                },
            })
        }
    })
}

// 添加catch方法
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
}

// 添加 resolve 方法
Promise.resolve = function (value) {
    // 返回 promise 对象
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then((v) => {
                resolve(v);
            }, (r) => {
                reject(r);
            })
        } else {
            resolve(value);
        }
    })
}

// 添加 reject 方法
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}