## 基本用法
````html
  <p>
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/router1">导航一</router-link>
    <router-link to="/router2">导航二</router-link>
  </p>
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
````
````ecmascript 6
    const routes = [
      { path: '/router1', component: router1 },
      { path: '/router2', component: router2 }
    ];
    
    const router = new VueRouter({
        routes: routes
        //（缩写）routes
    });
    
    new Vue({
      router: router
      //（缩写）router
    }).$mount('#app')
````

## 动态路由匹配
一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用


模式| 匹配路径| $route.params
-------|----------|----------
/user/:username	 | /user/evan | { username: 'evan' }
/user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: 123 }

#### 响应路由参数的变化
当使用路由参数时，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，
这也意味着组件的生命周期钩子不会再被调用。复用组件时，想对路由参数的变化作出响应的话，
你可以简单地 watch（监测变化） $route 对象：
````ecmascript 6
    const User = {
       watch: {
         '$route' (to, from) {
           // 对路由变化作出响应...
         }
       }
     }
````

#### $route.query

类型: Object

一个 key/value 对象，表示 URL 查询参数。
例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。