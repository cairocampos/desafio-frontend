<template>
  <button :class="['btn', `btn__${variant}`]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

defineProps({
  variant: {
    type: String as PropType<ButtonVariant>,
    default: "primary"
  }
})

</script>

<style scoped lang="scss">
.btn {
  @apply px-4 py-2 rounded-lg text-zinc-200;
  &__primary {
    @apply bg-brand;
  }
  &__text {
    @apply bg-transparent;
  }

  &__outline {
    @apply bg-transparent border border-brand hover:bg-secondary text-brand;
  }
}
</style>