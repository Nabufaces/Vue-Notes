## Action
* Action 类似于 mutation，不同在于：
    1. Action 提交的是 mutation，而不是直接变更状态。
    2. Action 可以**包含异步操作**。

```ecmascript 6
    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
      }
    })
```

##### 利用参数解构简化代码：

```ecmascript 6
    actions: {
      increment ({ commit }) {
        commit('increment')
      }
    }
```


### 分发 Action
* Action 通过 store.dispatch 方法触发：

```ecmascript 6
    store.dispatch('increment')
```

* 在 action 内部执行异步操作：

```ecmascript 6
    actions: {
      incrementAsync ({ commit }) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      }
    }
```

#### Actions 支持同样的载荷方式和对象方式进行分发：

```ecmascript 6
    // 以载荷形式分发
    store.dispatch('incrementAsync', {
      amount: 10
    })
```

```ecmascript 6
    // 以对象形式分发
    store.dispatch({
      type: 'incrementAsync',
      amount: 10
    })
```

### 在组件中分发 Action
你在组件中使用 ```this.$store.dispatch('xxx') 分发``` action，或者使用  ```mapActions ``` 辅助函数将组件的 methods 映射为  ```store.dispatch ``` 调用（需要先在根节点注入 store）：

```ecmascript 6
    import { mapActions } from 'vuex'
    
    export default {
      methods: {
        ...mapActions([
          'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    
          // `mapActions` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
        ]),
        ...mapActions({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
      }
    }
```

### 组合 Action

```store.dispatch``` 可以处理被触发的 action 的处理函数返回的 ```Promise```，并且 ```store.dispatch``` 仍旧返回 ```Promise```：

```ecmascript 6
    actions: {
      actionA ({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('someMutation')
            resolve()
          }, 1000)
        })
      }
    }
```

现在可以：

```ecmascript 6
    store.dispatch('actionA').then(() => {
      // ...
    })
```

在另外一个 action 中也可以：

```ecmascript 6
    actions: {
      // ...
      actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
          commit('someOtherMutation')
        })
      }
    }
```


##### 利用 async / await，我们可以组合如下 action：

```ecmascript 6
    actions: {
      async actionA ({ commit }) {
        commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
      }
    }
```
