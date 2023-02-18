<template>
  <div class="input">
    <input type="text" placeholder="Search" />
    <button>
      <SearchIcon/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from 'vue-tabler-icons'

</script>

<style scoped lang="scss">
.input {
  @apply bg-transparent border border-zinc-200 rounded-md py-2 px-4 flex 
  text-zinc-500 focus-within:border-primary transition-all;
  input {
    @apply bg-transparent outline-none flex-1;
  }
}
</style>