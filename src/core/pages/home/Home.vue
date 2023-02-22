<template>
  <div>
    <CategoriesScrollList
      @selected="onSelectedCategory"
    />
    <div v-if="loading" class="flex items-center justify-center w-full">
      <Loading />
    </div>
    <section v-else class="cards">
      <Thumbnail
        v-for="(video, index) in videos"
        :key="index"
        :title="video.snippet.title"
        :thumbnailURL="video.snippet.thumbnails.medium.url"
        :published-at="video.snippet.publishedAt"
        @click="onVideoClick(video)"
        class="card__item"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useYoutubeApi } from '@/core/api/youtube';
import { SearchItem } from '@/core/models/youtube/search-items';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CategoriesScrollList from './components/CategoriesScrollList.vue';
import Thumbnail from '@/components/Thumbnail/Thumbnail.vue';
import Loading from '@/components/Loading/Loading.vue'
import { useVideoStore } from '@/stores/player';

const youtubeApi = useYoutubeApi()

const videos = ref<SearchItem[]>([])
const videoCategoryId = ref('')

const onSelectedCategory = (categoryId: string) => {
  videoCategoryId.value = categoryId;
  searchVideos();
}

const loading = ref(false)
const searchVideos = async () => {
  try {
    loading.value = true;
      const {data} = await youtubeApi.search({
      q: route.query?.search?.toString() || '',
      videoCategoryId: videoCategoryId?.value?.toString()
    });
    videos.value = data.items;
  } finally {
    loading.value = false;
  }
}

const router = useRouter()
const videoStore = useVideoStore()
const onVideoClick = (video: SearchItem) => {
  videoStore.setVideo(video);
  router.push({name: 'Watch', query: {v: video.id.videoId}})
}

const route = useRoute()
const routeQuery = computed(() => {
  return route.query;
})

watch(routeQuery, () => {
  searchVideos();
});

onMounted(async () => {
  searchVideos();
})

</script>

<style scoped lang="scss">
.cards {
  @apply grid gap-4 sm:grid-cols-3 xl:grid-cols-5;
}
</style>