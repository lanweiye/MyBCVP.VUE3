<!-- 组合式API setup语法糖 -->

<script setup lang="ts">
import { computed } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'

// 获取store
const counterStore = useCounterStore()

//使用store中的状态和方法，不适用解构来保持响应特性
const count = computed(() => counterStore.count)
const doubleCount = computed(() => counterStore.doubleCount)
const increment = counterStore.increment
const decrement = counterStore.decrement
</script>

<!-- 组合式API -->
<!-- <script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }
    const decrement = () => {
      count.value--
    }
    return {
      count,
      increment,
      decrement
    }
    computed()
  }
}
</script> -->

<template>
  <main>
    <TheWelcome />
    <p>Count: {{ count }}</p>
    <p>DoubleCount: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">decrement</button>
  </main>
</template>
