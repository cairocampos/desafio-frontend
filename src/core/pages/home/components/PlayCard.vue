<template>
  <div class="play-card">
    <div>
      <img :src="thumbnailURL" alt="" class="rounded-lg"/>
    </div>
    <Text size="sm" class="play-card__title mt-1">{{ title }}</Text>
    <Text size="xs">{{ timeFormat }}</Text>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import Text from '@/components/UI/Text/Text.vue';
import { computed } from 'vue';

type DurationUnits = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

const props = defineProps({
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
  }
})

const timeFormat = computed(() => {
  var start = DateTime.fromISO(props.publishedAt);
  var end = DateTime.fromISO(DateTime.now().toISO());
  
  var diff = end.diff(start, ['years', 'month', 'day', 'hours', 'minutes', 'seconds']);
  const diffObject = diff.toObject()

  const durationUnits = {
    years: (amount: number) => `${amount} anos atrás`,
    months: (amount: number) => `${amount} meses atrás`,
    days: (amount: number) => `${amount} dias atrás`,
    hours: (amount: number) => `${amount} horas atrás`,
    minutes: (amount: number) => `${amount} minutos atrás`,
    seconds: (amount: number) => `${amount} segundos atrás`
  }
  const duration = Object.entries(diffObject).find(([key, value]) => !!value)
  if(duration?.length) {
    const unit = duration[0] as DurationUnits
    const value = duration[1]
    if(Object.keys(durationUnits).includes(unit)) {
      return durationUnits[unit](value);
    }
  }

  return props.publishedAt;

})
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
}

</style>