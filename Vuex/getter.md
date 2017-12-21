## Getter
* 从 store 中的 state 中派生出一些状态
* 在 store 中定义 getter（可以认为是 store 的计算属性）。像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有**当它的依赖值发生了改变才会被重新计算**。


##### Getter 接受 state 作为其第一个参数：

```vue
    const store = new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
      },
      getters: {
        doneTodos: state => {
          return state.todos.filter(todo => todo.done)
        }
      }
    })
```
- Getter 会暴露为 ```store.getters``` 对象

##### 在组件中使用它：

```vue
    computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodos
      }
    }
```

##### 也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```vue
    getters: {
      // ...
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }
    
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

### mapGetters 辅助函数
* ```mapGetters``` 辅助函数将 store 中的 getter 映射到局部计算属性：

```vue
    import { mapGetters } from 'vuex'
    
    export default {
      computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
          'doneTodos',
          {
            // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
            doneCount: 'doneTodosCount'
          }
        ])
      }
    }
```
