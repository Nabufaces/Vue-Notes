## Vue实例初始化的选项配置对象详解

#### 1. data
* data是Vue绑定数据到HTML标签的数据源泉，Vue框架会自动监视data里面的数据变化，自动更新数据到HTML标签上去。
* 本质原理是：Vue会自动将data里面的数据进行递归转换成getter和setter，然后就可以自动更新HTML标签了。

data对象的类型： 类型是Object或者Function。

如果是组件对象中，data必须是Function类型。


#### 2. computed

Vue的计算属性（computed)的属性会自动加入Vue的实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

类型：

{ 键：函数} { [key: string]: Function | { get: Function, set: Function } } 当然，可以省略setter,如果省略了setter，那么值就可以是普通函数，但是必须有返回值。

实例：
```ecmascript 6
    var vm = new Vue({
    data: { a: 1 },
    computed: {
      // 仅读取，值只须为函数
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    }
    });
    /* 
        vm.aPlus   // -> 2
        vm.aPlus = 3
        vm.a       // -> 2
        vm.aDouble // -> 4 
    */
```

#### 3. methods
* methods 将被加入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
* 注意，不能使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将
不会按照期望指向 Vue 实例，this.a 将是 undefined。


#### 4. watch
类型：

{ [key: string]: string | Function | Object }

示例：
```ecmascript 6
    var vm = new Vue({
      data: {
        a: 1,
        b: 2
      },
      watch: {
        // 监控a变量变化的时候，自动执行此函数
        a: function (val, oldVal) {
          console.log('new: %s, old: %s', val, oldVal)
        }
      }
    });
    /*
        vm.a = 2 // -> new: 2, old: 1
    */
```

#### 5. 设置el的详解
类型：

string | HTMLElement

详细：

提供一个在页面上已存在的 DOM 元素作为 **Vue 实例的挂载目标**,也就是说Vue绑定数据到哪里去找。可以是CSS 选择器，也可以是一个 HTMLElement实例。

在实例挂载之后， 元素可以用 vm.$el 访问。

```ecmascript 6
var app = new Vue({         
  el: '#app'
});
```