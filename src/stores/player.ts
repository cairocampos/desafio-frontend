import { SearchItem } from "@/core/models/youtube/search-items";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useVideoStore = defineStore('video', () => {
  const currentVideo = ref<SearchItem>();

  const setVideo = (videoInfo: SearchItem) => {
    localStorage.setItem('@Rocketstream:video', JSON.stringify(videoInfo));
    currentVideo.value = videoInfo
  }

  const loadVideoFromStorage = () => {
    const storageItem = localStorage.getItem('@Rocketstream:video') as string;
    const parsed = JSON.parse(storageItem)!;
    if(parsed && Object.values(parsed).length) {
      currentVideo.value = parsed
    }
  }

  return {
    currentVideo,
    setVideo,
    loadVideoFromStorage
  }
});