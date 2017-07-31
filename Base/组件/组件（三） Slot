## Slot基本用法
````html
    <div class="hd">
        <slot></slot>
    </div>
    <div class="bd">
        <slot name="body"></slot>
    </div>
    <div class="ft">
        <slot name="footer"></slot>
    </div>
````
````html
    <modal>
            <div slot="body">body</div>
            <h1>h1</h1>
            <div slot="footer">footer</div>
    </modal>
````

* 渲染结果为：
````html
    <div class="hd">
        <h1>h1</h1>
    </div>
    <div class="bd">
        <div>body</div>
    </div>
    <div class="ft">
        <div>footer</div>
    </div>
````

## 作用域插槽
在子组件中，只需将数据传递到插槽，就像你将 props 传递给组件一样：
````html
    <div class="child">
      <slot text="hello from child"></slot>
    </div>
````
在父级中，具有特殊属性 scope 的 <template> 元素必须存在，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象：
````html
    <div class="parent">
      <child>
        <template scope="props">
          <span>hello from parent</span>
          <span>{{ props.text }}</span>
        </template>
      </child>
    </div>
````
如果我们渲染以上结果，得到的输出会是：
````html
    <div class="parent">
      <div class="child">
        <span>hello from parent</span>
        <span>hello from child</span>
      </div>
    </div>
````