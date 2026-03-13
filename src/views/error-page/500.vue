<template>
  <error-content code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src"/>
</template>

<script setup lang="ts">
import error500 from '@/assets/image/error-image/error-500.svg'
import ErrorContent from './error-content.vue'

const src = error500
</script>
