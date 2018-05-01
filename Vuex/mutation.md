## Mutation
* 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

```ecmascript 6
    const store = new Vuex.Store({
      state: {
        count: 1
      },
      mutations: {
        // 接受 state 作为第一个参数
        increment (state) {
          // 变更状态
          state.count++
        }
      }
    })
```

##### 要唤醒一个 ```mutation handler```，你需要以相应的 type 调用 ```store.commit``` 方法：

```ecmascript 6
    store.commit('increment')
```

### 提交载荷（Payload）

```ecmascript 6
    mutations: {
      increment (state, n) {
        state.count += n
      }
    }
    store.commit('increment', 10)
```

#### 对象风格的提交方式

```ecmascript 6
    store.commit({
      type: 'increment',
      amount: 10
    })
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```ecmascript 6
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
```

### Mutation 必须是同步函数

### 在组件中提交 Mutation
你可以在组件中使用 ```this.$store.commit('xxx')``` 提交 mutation，或者使用 ```mapMutations``` 辅助函数将组件中的 methods 映射为 ```store.commit``` 调用（需要在根节点注入 store）。

```ecmascript 6
    import { mapMutations } from 'vuex'
    
    export default {
      methods: {
        ...mapMutations([
          'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    
          // `mapMutations` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
      }
    }
```
