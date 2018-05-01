const Dep = function() {
    // 收集目标
    this.target = null;
    // 存储收集器中需要通知的Watcher
    this.subs = [];
    // 当有目标时，绑定Dep与Wathcer的关系
    this.depend = () => {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    };
    // 为当前收集器添加Watcher
    this.addSub = watcher => {
        this.subs.push(watcher);
    };
    // 通知收集器中所的所有Wathcer，调用其update方法
    this.notify = () => {
        this.subs.forEach(item => {
            item.update();
        })
    }
};

const Watcher = function(vm, fn) {
    this.vm = vm;
    // 将当前Dep.target指向自己
    Dep.target = this;
    // 向Dep方法添加当前Wathcer
    this.addDep = dep => {
        dep.addSub(this);
    };
    // 更新方法，用于触发vm.render
    this.update = () => {
        fn();
    };
    // 首次调用vm.render
    // 从而将当前的Wathcer与Dep关联起来
    fn();
    // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，造成代码死循环
    Dep.target = null;
};

const defineReactive = (obj, key) => {
    const dep = new Dep();
    let val = obj[key];
    Object.defineProperty(obj, key, {
        // 设置当前描述属性为可被循环
        enumerable: true,
        // 设置当前描述属性可被修改
        configurable: true,
        get() {
            // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
            // 与渲染无关的值，并不会触发get，也就不会在依赖收集器中添加到监听(addSub方法不会触发）
            dep.depend();
            return val;
        },
        set(newVal) {
            if(newVal !== val) {
                val = newVal;
                // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher
                dep.notify();
            }
        }
    })
};

const Observer = function(data) {
    for(let key in data) {
        // 为每个属性添加get，set
        if(data.hasOwnProperty(key)) {
            defineReactive(data, key);
        }
    }
};

const Vue = function (options) {
    // 将data赋值给this.data
    if(options && typeof options.data === 'function') {
        this.data = options.data.apply(this);
    }
    // 渲染函数
    this.render = () => {
        console.log('render:', this.data.lang);
    };
    // 挂载函数
    this.mount = () => {
        new Watcher(this, this.render);
    };
    // 监听this.data
    new Observer(this.data);
    // 执行mount
    this.mount();
};

const vue = new Vue({
    data() {
        return  {
            lang: 'React'
        }
    }
});

setTimeout(() => {
    vue.data.lang = 'Vue';
}, 1000);