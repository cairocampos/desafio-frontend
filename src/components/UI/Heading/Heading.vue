<template>
  <component :is="isComponent" :class="['heading', `heading__${size}`]">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";

type HeadingSize = "lg" | "md" | "sm" | "xs";

const props = defineProps({
  size: {
    type: String as PropType<HeadingSize>,
    default: "md",
  },
});

const isComponent = computed(() => {
  const sizes = {
    lg: "h1",
    md: "h2",
    sm: "h3",
    xs: "h4",
  };

  return sizes[props.size];
});
</script>

<style scoped lang="scss">
.heading {
  @apply text-zinc-600 dark:text-zinc-200;
  &__lg {
    @apply text-2xl leading-8 md:text-5xl md:leading-[4rem] font-bold;
  }
  &__md {
    @apply text-lg leading-6 md:text-2xl md:leading-8 font-bold;
  }
  &__sm {
    @apply text-sm leading-5 md:text-[20px] md:leading-7 font-semibold;
  }
  &__xs {
    @apply text-xs leading-5 md:text-[14px] md:leading-6 uppercase;
  }
}
</style>