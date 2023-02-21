<template>
  <div class="px-4 md:px-0 grid md:grid-cols-3 gap-8">
    <div class="video col-span-2">
      <div class="video__player">
        <Player v-if="!loading" playsinline ref="player" autoplay>
          <Youtube :video-id="videoId" />
          <DefaultUi />
        </Player>
      </div>
      <div class="video__info">
        <Heading>{{  videoStore.currentVideo?.snippet.title }}</Heading>
        <div class="video__info-description">
          <Heading size="xs">Descrição</Heading>
          <Text size="xs">{{  videoStore.currentVideo?.snippet.description }}</Text>
        </div>
      </div>
    </div>
    <div class="video__relateds">
      <Heading size="sm">Vídeos Relacionados</Heading>
      <div class="video__relateds-contents custom-scrollbar">
        <Thumbnail
          v-for="video in videos"
          :key="video.id.videoId"
          :thumbnailURL="video.snippet.thumbnails.medium.url"
          :title="video.snippet.title"
          :published-at="video.snippet.publishedAt"
          row
          @click="onVideoClick(video)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Player, DefaultUi, Youtube } from '@vime/vue-next';
import '@vime/core/themes/default.css';
import { onMounted, ref, nextTick } from 'vue';
import { useYoutubeApi } from '@/core/api/youtube';
import { SearchItem } from '@/core/models/youtube/search-items';
import { useRoute, useRouter } from 'vue-router';
import Heading from '@/components/UI/Heading/Heading.vue';
import Text from '@/components/UI/Text/Text.vue';
import Thumbnail from '@/components/Thumbnail/Thumbnail.vue';
import { useVideoStore } from '@/stores/player';

const videoId = ref('')

const videos = ref<SearchItem[]>([])
const youtubeApi = useYoutubeApi()
const getRelatedVideos = async () => {
  const {data} = await youtubeApi.relatedVideos();
  videos.value = data.items
}

const loading = ref(false);
const router = useRouter();
const videoStore = useVideoStore();
const onVideoClick = async (video: SearchItem) => {
  loading.value = true;
  videoId.value = video.id.videoId
  videoStore.setVideo(video);
  router.push({path: route.path, query: {v: videoId.value}})
  await nextTick(() => {
    loading.value = false
  })
}

const route = useRoute();
onMounted(() => {
  if(!route.query?.v) {
    router.push({name: 'Home'});
    return;
  }

  if(!videoStore.currentVideo) {
    videoStore.loadVideoFromStorage();
    if(!videoStore.currentVideo) {
      router.push({name: 'Home'});
    }
  }

  videoId.value = route.query.v as string
  getRelatedVideos()
})
</script>

<style scoped lang="scss">
.video {
  @apply flex flex-col;
  &__player {
    @apply h-full w-full max-w-[1100px] max-h-[60vh] aspect-video mb-2;
  }
  &__relateds {
    &-contents {
      @apply h-full md:h-[80vh] flex flex-col gap-2 overflow-y-scroll mt-4;
    }
  }
  &__info {
    &-description {
      @apply border dark:bg-zinc-800 rounded-md p-4 mt-2;
    }
  }
}
</style>