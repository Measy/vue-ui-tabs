<template>
    <div class="content-item">
        <slot v-if="show"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            index: 0
        };
    },
    props: {
        label: {
            required: true,
            default: null,
        },
        value: {
            required: true,
        }
    },
    mounted() {
        if (this.$parent.value === this.value) {
            this.show = true;
        }

        this.$watch("$parent.value", (val) => {
            if (!this.show && val === this.value) {
                this.show = true;
            }
        });

        this.$watch("$parent.swiping", (val) => {
            if (this.show || !val) return false;
            if (this.$parent.offsetLeft > 0 && this.index === (this.$parent.currentIndex - 1)) {
                this.show = true;
            }
            if (this.$parent.offsetLeft < 0 && this.index === (this.$parent.currentIndex + 1)) {
                this.show = true;
            }
        });
    }
}
</script>