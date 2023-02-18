<template>
  <div class="bg-secondary dark:bg-dark p-4 grid grid-cols-3 items-center border-b dark:border-b-zinc-500">
    <div class="flex items-center text-brand gap-2 dark:text-zinc-200">
      <BrandYoutubeIcon />
      <h1>
        <bold class="text-dark dark:text-zinc-200">ROCK</bold>
        STREAM
      </h1>
    </div>
    <SearchBar />

    <div class="flex items-center justify-end">
      <Button variant="text" @click="toggleTheme()">
        <BulbIcon v-if="theme === 'dark'" />
        <BulbFilledIcon v-else class="text-yellow-200" />
      </Button>
      <Button variant="outline">
        Entrar
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../UI/Button/Button.vue';
import SearchBar from './SearchBar.vue';
import { BulbIcon, BulbFilledIcon, BrandYoutubeIcon } from 'vue-tabler-icons';
import useTheme from '@/core/composables/useTheme';

const { theme, toggleTheme } = useTheme()

</script>

<style scoped>

</style>