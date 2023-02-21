<template>
  <div ref="input" class="input">
    <input
      v-model="term"
      type="text"
      placeholder="Pesquisar"
      @focus="onFocus()"
      @keyup.enter="handleSearchTerm()"
    />
    <button>
      <SearchIcon/>
    </button>

    <ul v-if="displayHistory && terms.length" class="terms">
      <li
        v-for="(term, index) in terms"
        :key="index"
        @click="setTerm(term)"
        class="terms__item">
        <HistoryIcon :size="16" />
        {{ term }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { SearchIcon, HistoryIcon } from 'vue-tabler-icons'

const term = ref('');
const displayHistory = ref(false)
const terms = ref<string[]>([]);

const getTermsFromStorage = () => {
  const items = localStorage.getItem('@Rocketstream:terms') as string;
  return items;
}

const loadTermsFromStorage = () => {
  const items = getTermsFromStorage();
  const parsedItems = JSON.parse(items)!

  if(Array.isArray(parsedItems)) {
    terms.value = parsedItems
    displayHistory.value = !!terms.value.length
  }
}

const onFocus = () => {
  loadTermsFromStorage();
}

const setTerm = (item:string) => {
  term.value = item;
  handleSearchTerm();
}

const input = ref<HTMLInputElement>()
const handleClick = (event: Event) => {
  event.stopPropagation()
  const target = event.target as HTMLElement;

  if(!(input.value == event.target || input.value?.contains(target))) {
    displayHistory.value = false;
  }
}

const router = useRouter();
const handleSearchTerm = () => {
  if(!term.value.trim()) return;
  const items = getTermsFromStorage();
  const parsedItems: string[] = JSON.parse(items)!

  displayHistory.value = false;
  router.replace({
    query: {
      search: term.value
    }
  })

  if(!parsedItems || !parsedItems.length) {
    localStorage.setItem('@Rocketstream:terms', JSON.stringify([term.value]));
    return;
  }

  const regex = new RegExp(term.value, 'i');
  if(Array.isArray(parsedItems) && !parsedItems.find(item => regex.test(item))) {
    parsedItems.unshift(term.value);
    localStorage.setItem('@Rocketstream:terms', JSON.stringify(parsedItems));
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => document.removeEventListener('click', handleClick))

</script>

<style scoped lang="scss">
.input {
  @apply bg-transparent border border-zinc-200 rounded-md py-2 px-4 flex 
  text-zinc-500 focus-within:border-primary transition-all dark:border-zinc-500
  dark:text-zinc-200 relative;
  input {
    @apply bg-transparent outline-none flex-1;
  }
}

.terms {
  @apply absolute top-12 w-full max-h-[12rem] bg-zinc-100 rounded-md 
  dark:bg-zinc-200 py-4 flex flex-col z-10 left-0 text-dark overflow-y-auto;
  &__item {
    @apply flex items-center gap-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-300 px-4 py-2
    transition-colors;
  }
}
</style>