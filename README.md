## Vue Ui Tabs
   

## Adapt
通过rem适配方案，组件可以自适应各个移动端尺寸。[https://github.com/amfe/article/issues/17](https://github.com/amfe/article/issues/17)

## Example
```
  git clone
  npm install
  npm run dev可以在http://localhost:8899/中查看demo,建议开发者工具中选中手机移动端
```

## Usage
```javascript
  export default {
    data() {
        return {
            current: 2
        };
    },
    components: {
        tabs: Tabs.Container,
        'tabs-item': Tabs.Item
    }
  }
```

### Tag
```
<tabs v-model="current">
    <tabs-item label="选项卡一" :value="1">
        内容一
    </tabs-item>
    <tabs-item label="选项卡二" :value="2">
        内容二
    </tabs-item>
    <tabs-item label="选项卡三" :value="3">
        内容三
    </tabs-item>
</tabs>
```

### Props
tabs

+ v-model `value` {null}: 对应当前选项卡的值
+ `animation` {Boolean}: 默认true，是否开启动画
+ `swipeable` {Boolean}: 默认true，是否开启手势
+ `bounce` {Boolean}: 默认false，两侧是否需要反弹效果
tabs-item

+ `label`：每个选项卡的header文案
+ `value`：每个选项卡的value

### Slots
tabs的slot必须为 tabs-item

tabs-item的slot可以为任意组件


### Events
`@input`: **修改选项卡**时触发一个input事件 , 你也可以，通过 `watch` 监听 value变化
