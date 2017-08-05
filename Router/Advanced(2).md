## 滚动行为
* 可以自定义路由切换时页面如何滚动。
* 注意: 这个功能只在 HTML5 history 模式下可用。

当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：
```ecmascript 6
    const router = new VueRouter({
      routes: [...],
      scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
      }
    })
```
第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

举例：

1. 对于所有路由导航，简单地让页面滚动到顶部：
```ecmascript 6
    scrollBehavior (to, from, savedPosition){
      return { x: 0, y: 0 }
    }
```

2. 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
```ecmascript 6
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
```

3. 如果你要模拟『滚动到锚点』的行为：
```ecmascript 6
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
    }
```