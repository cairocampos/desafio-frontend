<template>
  <div class="loading"></div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.loading {
  @apply h-5 w-5 border-2 border-x-2 rounded-full border-t-primary animate-spin
  dark:border-dark dark:border-t-zinc-600;
}
</style>