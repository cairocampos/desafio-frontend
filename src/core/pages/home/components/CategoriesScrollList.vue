<template>
  <div v-pan="onPan" class="slider cursor-grab">
    <div class="slip slip__left" v-show="scrollEnabled.left" @click="slipTo('left')">
      <ChevronLeftIcon/>
    </div>
    <div ref="list" class="slider__list">
      <button :class="['slider__item', {'active': !categoryIdSelected}]">
        Todos
      </button>
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="onCategorySelected(category)"
        :class="['slider__item category', {active: categoryIdSelected === category.id}]">
        {{  category.snippet.title  }}
      </button>
    </div>
    <div class="slip slip__right" v-show="scrollEnabled.right" @click="slipTo('right')">
      <ChevronRightIcon/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hammer from "hammerjs";
import gsap, { Elastic } from "gsap";
import { useYoutubeApi } from '@/core/api/youtube';
import { VideoCategoriesItems } from '@/core/models/youtube/video-categories-items';
import { ref, onMounted, computed, Ref } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'vue-tabler-icons'

const emit = defineEmits(['selected']);

const categoryIdSelected = ref('')

const onCategorySelected = (category: VideoCategoriesItems) => {
  emit('selected', category);
  categoryIdSelected.value = category.id
}

const categories = ref<VideoCategoriesItems[]>([]);
const youtubeApi = useYoutubeApi();
const getVideoCategories = async () => {
  const { data } = await youtubeApi.videoCategories();
  categories.value = data.items;
}

onMounted(() => {
  getVideoCategories();
})

const pointerEventType = ref('');
const list = ref<HTMLElement>() as Ref<HTMLElement>;
const currentOffset = ref(0);
const itemWidth = computed(() => {
  return list.value.scrollWidth / count.value;
});
const count = computed(() => {
  return categories.value.length;
});
const overflowRatio = computed(() => {
  return list.value.scrollWidth / list.value.offsetWidth;
});
function onPan(e: any) {
  pointerEventType.value = 'none';
  const dragOffset =
    (((100 / itemWidth.value) * e.deltaX) / count.value) * overflowRatio.value;
  const transform = currentOffset.value + dragOffset;
  list.value.style.setProperty("--x", transform.toString());

  const maxScroll = 100 - overflowRatio.value * 100;

  if (e.isFinal) {
    currentOffset.value = transform;
    let finalOffset = currentOffset.value;

    if (currentOffset.value <= maxScroll) {
      finalOffset = maxScroll;
    } else if (currentOffset.value >= 0) {
      finalOffset = 0;
    } else {
      const index =
        (currentOffset.value / overflowRatio.value / 100) * count.value;
      const nextIndex = e.deltaX <= 0 ? Math.floor(index) : Math.ceil(index);
      finalOffset = ((100 * overflowRatio.value) / count.value) * nextIndex;
    }

    checkSlider();
    gsap.fromTo(
      list.value,
      0.4,
      { "--x": currentOffset.value },
      {
        "--x": finalOffset,
        ease: Elastic.easeOut.config(1, 0.8),
        onComplete: () => {
          currentOffset.value = finalOffset;
          pointerEventType.value = ''
        },
      }
    );
  }
}

const vPan = {
  mounted: (el: any, binding: any) => {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
      mc.on("pan", binding.value);
    }
  },
};


onMounted(async () => {
  setTimeout(() => {
    checkSlider();
  })
})

const scrollEnabled = ref({
  left: true,
  right: true
})
const checkSlider = () => {
  let left = scrollEnabled.value.left;
  let right = scrollEnabled.value.right;
  const maxScroll = 100 - overflowRatio.value * 100;
  if (currentOffset.value <= maxScroll) {
    left = true;
    right = false;
  } else if (currentOffset.value < 0) {
    left = true;
    right = true;
  } else {
    left = false;
    right = true;
  }

  scrollEnabled.value = {
    left,
    right,
  };
}

const animate = (to: number) => {
  const maxScroll = 100 - overflowRatio.value * 100;
  let finalOffset = to <= maxScroll ? maxScroll : to;
  if (to >= 0) {
    finalOffset = 0;
  }

  gsap.fromTo(
    list.value,
    { '--x': currentOffset },
    {
      duration: 0.4,
      '--x': finalOffset,
      onComplete: () => {
        currentOffset.value = finalOffset;
      },
    },
  );

  setTimeout(() => {
    checkSlider();
  }, 500);
}

const slipTo = (direction: 'left' | 'right') => {
    const finalOffset =
      direction === 'right'
        ? currentOffset.value - 10
        : currentOffset.value + 10;

    animate(finalOffset);
  }

</script>

<style scoped lang="scss">
.slider {
  @apply my-6;
  width: 100%;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

.slider__list {
  @apply flex w-full h-full gap-2;
  backface-visibility: hidden;
  transform: translateX(calc(var(--x, 0) * 1%));
}

.slider__item {
  @apply border border-primary rounded-full text-dark p-2 px-4 text-xs
    cursor-pointer hover:bg-primary hover:text-zinc-200 transition-all
    whitespace-nowrap relative dark:bg-zinc-700 dark:border-transparent
     dark:hover:bg-zinc-600 dark:text-zinc-200;

  pointer-events: v-bind(pointerEventType);
  &.active {
    @apply bg-primary text-zinc-200 dark:bg-zinc-200 dark:text-dark;
  }
}

.slip {
  @apply absolute h-full bg-secondary flex items-center justify-center
  w-[50px] z-[5] cursor-pointer dark:bg-zinc-900 dark:text-zinc-400;
  &::after, &::before {
    content: "";
    @apply pointer-events-none h-full w-[50px] top-0 absolute z-10;
  }
  &__left {
    @apply left-0 top-0;
    &::after {
      @apply -right-[50px];
      background: linear-gradient(to right, #FBFBFB 20%,rgba(33,33,33,0) 80%);
    }
  }
  &__right {
    @apply right-0 top-0;
    &::before {
      background: linear-gradient(to left, #FBFBFB 20%,rgba(33,33,33,0) 80%);
      @apply -left-[50px];

    }
  }
}

.dark {
  .slip {
    &__left::after {
      background: linear-gradient(to right, #18181B 20%,rgba(33,33,33,0) 80%);
    }
    &__right::before {
      background: linear-gradient(to left, #18181B 20%,rgba(33,33,33,0) 80%);
    }
  }
}
</style>