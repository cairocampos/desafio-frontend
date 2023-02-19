<template>
  <Header />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import useTheme from './core/composables/useTheme';

const { setInitialTheme } = useTheme()
setInitialTheme()
</script>

<style lang="scss" scoped>
main {
  @apply flex-1 container mx-auto py-6;
}
</style>