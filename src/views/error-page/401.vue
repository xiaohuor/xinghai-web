<template>
  <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src"/>
</template>

<script setup lang="ts">
import error401 from '@/assets/image/error-image/error-401.svg'
import ErrorContent from './error-content.vue'

const src = error401
</script>
