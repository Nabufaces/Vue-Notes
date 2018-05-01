## Module
我们可以将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```javascript
    const moduleA = {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    };
    
    const moduleB = {
      state: { ... },
      mutations: { ... },
      actions: { ... }
    };
    
    const store = new Vuex.Store({
      modules: {
        a: moduleA,
        b: moduleB
      }
    });
    
    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态
```

### 模块的局部状态
- 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

```javascript
    const moduleA = {
      state: { count: 0 },
      mutations: {
        increment (state) {
          // 这里的 `state` 对象是模块的局部状态
          state.count++
        }
      },
      getters: {
        doubleCount (state) {
          return state.count * 2
        }
      }
    }
```

- 对于模块内部的 action，局部状态通过 ```context.state``` 暴露出来，根节点状态则为 ```context.rootState```：

```javascript
    const moduleA = {
      actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
          if ((state.count + rootState.count) % 2 === 1) {
            commit('increment')
          }
        }
      }
    }
```

- 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```javascript
    const moduleA = {
      getters: {
        sumWithRootCount (state, getters, rootState) {
          return state.count + rootState.count
        }
      }
    }
```

### 命名空间
- 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的

- 如果希望模块具有更高的封装度和复用性，可以通过添加 ```namespaced: true```
 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。