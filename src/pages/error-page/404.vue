<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/>
</template>

<script setup lang="ts">
import error404 from '@/assets/image/error-image/error-404.svg'
import ErrorContent from './error-content.vue'

const src = error404
</script>
