<template>
  <Modal title="Enviar Vídeo" @close="close()">
    <template #body>
      <div v-if="uploadLinkUrl">
        <Text>Upload realizado com sucesso!</Text>
        <a class="dark:text-zinc-400 underline" :href="uploadLinkUrl" target="_blank">
          Assitir agora
        </a>
      </div>
      <div v-else>
        <FilePond
          ref="pond"
          label-idle="Selecionar arquivo"
          @updatefiles="onUpdateFiles"
        />

        <form class="form" @submit.prevent="handleSubmit()">
          <Text size="xs">Informações adicionais</Text>
          <input type="text" v-model="form.title" placeholder="Titulo" required />
          <textarea
            v-model="form.description" 
            cols="30" rows="10"
            placeholder="Descrição"
          ></textarea>
          <Loading v-if="loading" class="mx-auto" />
          <Button v-else variant="text">Enviar</Button>
        </form>

      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '../UI/Modal/Modal.vue';
import vueFilePond from "vue-filepond";
import { FilePondFile } from 'filepond'
import "filepond/dist/filepond.min.css";
import { ref } from 'vue';
import Button from '../UI/Button/Button.vue';
import Text from '../UI/Text/Text.vue';
import {useYoutubeApi} from '@/core/api/youtube'
import { useRouter } from 'vue-router';
import Loading from '../Loading/Loading.vue';

defineProps({
  close: {
    type: Function,
    required: true
  }
})

const file = ref<File>(new File([], ''))
const form = ref({
  title: "",
  description: ""
})

const FilePond = vueFilePond();

const pond = ref(null);

const onUpdateFiles = (files: FilePondFile[]) => {
  const filesMap = files.map(item => item.file)
  file.value = filesMap[0] as File
}

const uploadLinkUrl = ref('');
const youtubeApi = useYoutubeApi()
const loading = ref(false)
const handleSubmit = async () => {
  const data = {
    snippet: {
      title: form.value.title,
      description: form.value.description,
      categoryId: 22
    },
    status: {
      privacyStatus: "unlisted",
      embeddable: true
    }
  }

  const formData = new FormData();
  formData.append('media', file.value);

  try {
    loading.value = true;
    const response = await youtubeApi.insertVideoInfo(data);
    const responseUpload = await youtubeApi.uploadMedia(response.headers?.location, formData);
    uploadLinkUrl.value = `https://youtu.be/${responseUpload.data?.id}`
  } catch(error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const router = useRouter()
const gotToVideo = () => {
  router.push({name: "Watch", query: {
    v: uploadLinkUrl.value
  }})
}

</script>

<style scoped lang="scss">

.form {
  @apply flex flex-col gap-2;
  input, textarea {
    @apply bg-transparent border border-zinc-500 rounded-md p-4 outline-none
      text-dark dark:text-zinc-200 focus:border-brand dark:focus:border-zinc-200;
    ;
  }
}

</style>