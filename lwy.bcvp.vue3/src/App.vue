<template>
  <el-config-provider :button="buttonConfig">  
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ElConfigProvider } from 'element-plus';

const buttonConfig = reactive({ autoInsertSpace: false })

</script>
