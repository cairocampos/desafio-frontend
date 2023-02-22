<template>
  <div class="header">
    <div class="header__content">
      <div class="flex">
        <router-link to="/" class="flex items-center text-brand gap-2 dark:text-zinc-200">
          <BrandYoutubeIcon />
          <h1>
            <strong class="text-dark dark:text-zinc-200">ROCK</strong>
            STREAM
          </h1>
        </router-link>
      </div>
    
      <SearchBar class="searchbar__desktop" />

      <div class="flex items-center justify-end">
        <div class="flex items-center justify-end">
          <Button variant="text" @click="themeStore.toggleTheme()">
            <BulbIcon v-if="themeStore.theme === 'light'" />
            <BulbFilledIcon v-else class="text-yellow-200" />
          </Button>
          <Button
            v-if="!oauthStore.isLoggedIn"
            @click="login()">
            Entrar
          </Button>
          <div v-else class="flex items-center gap-2">
            <Button variant="text" @click="displayUploadForm = true">
              <UploadIcon />
            </Button>
            <Button
              @click="logout()">
              Sair
            </Button>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <Upload
          v-if="displayUploadForm"
          :close="() => displayUploadForm = false"
        />
      </Teleport>

    </div>

    <SearchBar class="searchbar__mobile" />

  </div>
</template>

<script setup lang="ts">
import Button from '../UI/Button/Button.vue';
import SearchBar from './SearchBar.vue';
import { BulbIcon, BulbFilledIcon, BrandYoutubeIcon, UploadIcon } from 'vue-tabler-icons';
import {useTheme} from '@/stores/useTheme';
import { useOAuth } from '@/stores/oauth';
import Upload from '@/components/Upload/Upload.vue'
import { ref } from 'vue';
const themeStore = useTheme()

const displayUploadForm = ref(false)
const oauthStore = useOAuth();
const login = () => {
  oauthStore.googleLogin();
}

const logout = () => {
  oauthStore.googleLogout();
}

</script>

<style scoped lang="scss">
.header {
    @apply flex flex-col gap-4 p-4 border-b dark:border-b-zinc-700;
  &__content {
    @apply bg-secondary dark:bg-zinc-900  items-center flex justify-between
    lg:grid lg:grid-cols-3;
  }
}

.searchbar {
  &__mobile {
    @apply md:hidden;
  }
  &__desktop {
    @apply hidden md:flex;
  }    
}
</style>