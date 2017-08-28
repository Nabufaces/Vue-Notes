## 混合 (mixins) 
混合是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。
```ecmascript 6
    // 定义一个混合对象
    var myMixin = {
      created: function () {
        this.hello()
      },
      methods: {
        hello: function () {
          console.log('hello from mixin!')
        }
      }
    }
    // 定义一个使用混合对象的组件
    var Component = Vue.extend({
      mixins: [myMixin]
    })
    var component = new Component() // -> "hello from mixin!"
```

### 选项合并
当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，**混合对象的钩子将在组件自身钩子之前调用**：
```ecmascript 6
    var mixin = {
      created: function () {
        console.log('混合对象的钩子被调用')
      }
    }
    new Vue({
      mixins: [mixin],
      created: function () {
        console.log('组件钩子被调用')
      }
    })
    // -> "混合对象的钩子被调用"
    // -> "组件钩子被调用"
```
值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。 **两个对象键名冲突时，取组件对象的键值对**。
```ecmascript 6
    var mixin = {
      methods: {
        foo: function () {
          console.log('foo')
        },
        conflicting: function () {
          console.log('from mixin')
        }
      }
    }
    var vm = new Vue({
      mixins: [mixin],
      methods: {
        bar: function () {
          console.log('bar')
        },
        conflicting: function () {
          console.log('from self')
        }
      }
    })
    vm.foo() // -> "foo"
    vm.bar() // -> "bar"
    vm.conflicting() // -> "from self"
```