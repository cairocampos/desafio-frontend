<template>
  <div :class="['play-card', {row}]" @click="emit('click')">
    <div class="play-card__thumb">
      <img :src="thumbnailURL" alt="" class="rounded-lg"/>
    </div>
    <div class="play-card__info">
      <Text size="sm" class="play-card__title mt-1">{{ title }}</Text>
      <Text size="xs" class="play-card__published_at">{{ timeDiff(publishedAt) }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import Text from '@/components/UI/Text/Text.vue';
import useDatetime from '@/core/composables/useDatetime';

defineProps({
  thumbnailURL: {
    type: String,
    required:true
  },
  title: {
    type: String,
    required:true
  },
  publishedAt: {
    type: String,
    required:true
  },
  row: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const { timeDiff } = useDatetime()
</script>

<style scoped lang="scss">
.play-card {
  @apply cursor-pointer transition-all lg:hover:scale-110;
  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.row {
    @apply grid grid-cols-3 cursor-pointer transition-all gap-4 hover:scale-100;
    .play-card__info {
      @apply col-span-2;
    }
  }
}

</style>