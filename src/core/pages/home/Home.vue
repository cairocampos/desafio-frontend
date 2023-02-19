<template>
  <div>
    <CategoriesScrollList />
    <section class="cards">
      <PlayCard
        v-for="(video, index) in videos"
        :key="index"
        :title="video.snippet.title"
        :thumbnailURL="video.snippet.thumbnails.medium.url"
        :published-at="video.snippet.publishedAt"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useYoutubeApi } from '@/core/api/youtube';
import { SearchItems } from '@/core/models/youtube/search-items';
import { onMounted, ref } from 'vue';
import CategoriesScrollList from './components/CategoriesScrollList.vue';
import PlayCard from './components/PlayCard.vue';
const youtubeApi = useYoutubeApi()

const videos = ref<SearchItems[]>([])

const searchVideos = async () => {
  const {data} = await youtubeApi.search();
  videos.value = data.items;
}

onMounted(async () => {
  searchVideos();
})

</script>

<style scoped lang="scss">
.cards {
  @apply grid gap-4 sm:grid-cols-3 xl:grid-cols-5;
}
</style>