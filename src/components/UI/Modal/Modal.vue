<template>
  <div class="backdrop" @click="onClose()"></div>
  <div class="modal">
    <div class="modal__header">
      <slot name="header">
        <Heading size="sm">
          {{ title }}
        </Heading>
      </slot>
      <button class="dark:text-zinc-200 dark:hover:text-zinc-400" @click="onClose()">
        <XIcon />
      </button>
    </div>
    <div class="modal__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Heading from '../Heading/Heading.vue';
import { XIcon } from 'vue-tabler-icons'

defineProps({
  title: {
    type: String,
    required:false
  }
})

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}

onMounted(() => {
  document.body.classList.add('modal-is-open')
});

onUnmounted(() => {
  document.body.classList.remove('modal-is-open')
});

</script>

<style scoped lang="scss">

.backdrop {
  @apply bg-black bg-opacity-80 h-screen w-screen fixed z-30 left-0 top-0;
}

.modal {
  @apply min-w-[50vw]  bg-zinc-100 dark:bg-zinc-700 absolute p-6 rounded-md
  z-50 mt-10 overflow-y-auto max-h-screen;
  left: 50%;
  transform: translateX(-50%);
  &__header {
    @apply mt-2 mb-4 flex items-center justify-between;
  }
}

</style>