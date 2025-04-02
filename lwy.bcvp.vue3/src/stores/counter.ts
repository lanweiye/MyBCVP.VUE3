import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }

  return { count, doubleCount, increment, decrement }
})

// Vuex类似写法  选项式API
// export const useCounterStore = defineStore('counter', {
//   // 定义状态
//   state: () => ({
//     count: 0,
//   }),

//   // 定义 actions，可以包含异步操作
//   actions: {
//     increment() {
//       this.count++
//     },
//     decrement() {
//       this.count--
//     },
//   },

//   // 定义 getters，用来计算衍生的状态
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
// })

// Pinia 选项式 API
// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     count: 0,
//   }),
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//     decrement() {
//       this.count--
//     },
//   },
//   // 不需要 return
// })
