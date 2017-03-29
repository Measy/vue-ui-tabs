import Vue from 'vue'
import index from './index.vue'

new Vue({
    el: '#test',
    components: {
        'index': index
    },
    render: (h) => {
        return (
            <index/>
        );
    }
})