<template>
  <button :class="['btn', `btn__${variant}`]" :disabled="disabled">
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
  },
  disabled: {
    type: Boolean,
    deafault: false
  }
})

</script>

<style scoped lang="scss">
.btn {
  @apply px-4 py-2 rounded-lg text-zinc-200;
  &__primary {
    @apply bg-brand hover:opacity-90;
  }
  &__text {
    @apply bg-none text-dark dark:text-zinc-200;
  }

  &__outline {
    @apply bg-transparent border border-brand hover:bg-secondary text-brand;
  }
  &:disabled {
    @apply cursor-not-allowed;
  }
}
</style>