## 开始
每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你的应用中
大部分的状态(state)。Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，
那么相应的组件也会相应地得到高效更新。

2. 你**不能直接改变 store 中的状态**。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。

## State

#### 在 Vue 组件中获得 Vuex 状态

Vuex 通过 store 选项，提供了一种机制**将状态从根组件『注入』到每一个子组件中**：

```vue
    const app = new Vue({
      el: '#app',
      // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
      store,
      components: { Counter },
      template: `
        <div class="app">
          <counter></counter>
        </div>
      `
    })
```

该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 ```this.$store``` 访问到。让我们更新下 Counter 的实现：

```vue
    const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count () {
          return this.$store.state.count
        }
      }
    }
```

#### mapState 辅助函数

可以使用 ```mapState``` 辅助函数帮助我们生成计算属性，获取多个计算状态：

```vue
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'
    
    export default {
      // ...
      computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
    
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
    
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
          return state.count + this.localCount
        }
      })
    }
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 ```mapState``` 传一个字符串数组。

```vue
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ])
```

#### 对象展开运算符

mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 ```computed``` 属性。但是自从有
了对象展开运算符，我们可以极大地简化写法：

```vue
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState({
        // ...
      })
    }
```
