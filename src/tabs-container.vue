<template>
    <div class="mx-tabs">
        <div class="tab-headers">
            <div class="headers-selected-bar"
                 :style="selectedBarStyle"
                 :class="{'no-animation': !animation}">
            </div>
            <div v-for="item in tabHeaders"
                 class="headers-item"
                 :class="{'headers-selected': item.value === value}"
                 @click="changeTab(item.value)">
                {{item.label}}
            </div>
        </div>
        <div class="tab-container"
             @touchstart="dragStart"
             @mousedown="dragStart"
             @touchmove="onDrag"
             @mousemove="onDrag"
             @mouseleave="dragEnd"
             @mouseup="dragEnd"
             @touchend="dragEnd"
             ref="container">
            <div class="content-wrap"
                 :style="contentStyle"
                 ref="wrap"
                 :class="{'wrap-transition': wrapTransition, 'no-animation': !animation}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            required: true
        },
        swipeable: {
            default: true,
            type: Boolean,
        },
        animation: {
            default: true,
            type: Boolean,
        },
        bounce: { // 关闭边界的拖拽反弹
            default: false,
            type: Boolean,
        },
    },
    data() {
        return {
            tabHeaders: [],
            limitWidth: 0.3, // 大于30%换页
            offset: 5, // 灵敏度
            swiping: false, // 是否处于拖拽状态
            start: {},
            wrapTransition: true,// 是否需要动画transition效果
            offsetLeft: 0, // 横向位移长度
        };
    },
    mounted() {
        if (this.$children.length) {
            this.$children.forEach((item, index) => {
                this.tabHeaders.push({
                    label: item.label,
                    value: item.value
                });
                item.index = index;
            });
        }
    },
    computed: {
        contentStyle() {
            return {
                "transform": `translate3d(${this.currentIndex * -100 + '%'}, 0, 0)`
            };
        },
        selectedBarStyle() {
            return {
                "width": (100 / this.tabHeaders.length) + '%',
                "transform": `translate3d(${this.currentIndex * 100 + '%'}, 0, 0)`
            };
        },
        currentIndex() {
            for (let i = 0; i < this.tabHeaders.length; i++) {
                const item = this.tabHeaders[i];

                if (item.value === this.value) {
                    return i;
                }
            }
        },
    },
    methods: {
        changeTab(value) {
            if (this.swiping) return;
            this.$emit('input', value);
        },
        dragStart(evt) {
            if (!this.swipeable) return;
            this.swiping = true;
            evt = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.start.x = evt.pageX;
            this.start.y = evt.pageY;
        },
        onDrag(evt) {
            if (this.swiping) {
                const e = evt.changedTouches ? evt.changedTouches[0] : evt;
                const offsetLeft = e.pageX - this.start.x;
                const x = Math.abs(offsetLeft);

                if (x < this.offset) return;// 防误触

                evt.preventDefault();

                const pageWidth = this.$refs.container.offsetWidth;
                const offsetPercent = ((offsetLeft / pageWidth) + this.currentIndex * -1) * 100 // 为百分数的数字部分

                this.offsetLeft = offsetLeft;
                this.swipeMove(offsetPercent);
            }
        },
        swipeMove(offsetPercent) {
            if (!this.isValid() && this.bounce) return; // 在边界的情况下，滑动越界，并且关闭了反弹配置，关闭边界反弹
            this.wrapTransition = false;
            this.$refs.wrap.style.transform = `translate3d(${offsetPercent}%, 0, 0)`;
        },
        isValid() {
            const direction = this.offsetLeft > 0 ? -1 : 1;
            const newIndex = this.currentIndex + direction;

            return newIndex >= 0 && newIndex < this.tabHeaders.length;
        },
        dragEnd(evt) {
            const direction = this.offsetLeft > 0 ? -1 : 1;
            const newIndex = this.currentIndex + direction;
            const pageWidth = this.$refs.container.offsetWidth;
            const isChange = Math.abs(this.offsetLeft) > (pageWidth * this.limitWidth);

            this.wrapTransition = true; // 恢复样式变化的transition效果
            this.swiping = false; // 退出拖拽状态

            if (this.isValid() && isChange) {
                //to 新区域
                this.$emit('input', this.tabHeaders[newIndex].value);
            } else {
                //回退原视图
                this.$refs.wrap.style.transform = this.contentStyle.transform;
            }
        }
    }
}
</script>