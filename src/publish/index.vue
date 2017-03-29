<template>
    <section class="main">
        <h3>选项卡组件</h3>
        <p>支持动画和手势滑动</p>
        <section>
            用法：
            <tabs v-model="current">
                <tabs-item label="选项卡一"
                           :value="1">
                    <section class="content">
                        内容一
                    </section>
                </tabs-item>
                <tabs-item label="选项卡二"
                           :value="2">
                    <section class="content">
                        内容二
                    </section>
                </tabs-item>
                <tabs-item label="选项卡三"
                           :value="3">
                    <section class="content">
                        内容三
                    </section>
                </tabs-item>
                <tabs-item label="选项卡四"
                           :value="4">
                    <section class="content">
                        内容四
                    </section>
                </tabs-item>
            </tabs>
        </section>
    
    </section>
</template>

<script>
import Tabs from '../index.js';

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
};
</script>

<style lang="sass">
    .main {
        margin: 10px;
        font-size: 14px; /*!px*/
    }
    .content {
        height: 100px;
        background: #eee;
        line-height: 100px;
        text-align: center;
        border: 1px solid #ddd;
        margin: 10px;
    }
</style>