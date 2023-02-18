<template>
  <component :is="tag" :class="[`text text__${size}`]">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

type TextSize = "md" | "sm" | "xs";

defineProps({
  size: {
    type: String as PropType<TextSize>,
    default: "md",
  },
  tag: {
    type: String,
    default: "p",
  },
});
</script>

<style scoped lang="scss">
.text {
  @apply text-zinc-600;
  &__md {
    @apply text-lg leading-6 md:text-xl md:leading-8;
  }
  &__sm {
    @apply text-xs leading-5 md:text-base;
  }
  &__xs {
    @apply text-[.725rem] leading-4 md:text-sm md:leading-6;
  }
}
</style>