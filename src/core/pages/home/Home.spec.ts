import { HttpClient } from "@/core/http/http-client"
import { flushPromises, mount } from "@vue/test-utils"
import Home from "./Home.vue"
import searchJSON from '@/mocks/search.json'
import { createPinia, setActivePinia } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { Mock } from "vitest"
import { useVideoStore } from "@/stores/player"

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

const httpClientFake: HttpClient = {
  async get(_: string) {
    return {
      data: searchJSON as any,
    }
  },
}

describe('Home', () => {
  let push: Mock;
  beforeEach(async () => {
    setActivePinia(createPinia())

    push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    useRoute.mockImplementationOnce(() => ({
      query: {
        q: "",
        videoCategoryId: ""
      }
    }))
  })

  it('should load search videos', async () => {
    const httpClientSpy = vi.spyOn(httpClientFake, 'get')
    mount(Home, {
      global: {
        provide: {
          http: httpClientFake
        },
      }
    })

    expect(httpClientSpy).toHaveBeenCalled()
    expect(httpClientSpy).toHaveBeenCalledWith('/youtube/v3/search', {
      params: {
        q: "",
        videoCategoryId: ""
      }
    })
  })

  it('should render elements correctly', async () => {
    const wrapper = mount(Home, {
      global: {
        provide: {
          http: httpClientFake
        },
      }
    })
    await flushPromises()
    expect(wrapper.findAll('.card__item')).toHaveLength(searchJSON.items.length)
  })

  it('should dispatch router to watch video', async () => {
    const wrapper = mount(Home, {
      global: {
        provide: {
          http: httpClientFake
        },
        stubs: ['vue-router']
      }
    })

    await flushPromises()

    const firstVideo = wrapper.find('.card__item');
    await firstVideo.trigger('click');
    const videoData = searchJSON.items[0]

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: "Watch",
      query: {
        v: videoData.id.videoId
      }
    })
  })

  it('should dispatch store to set video info', async () => {
    const wrapper = mount(Home, {
      global: {
        provide: {
          http: httpClientFake
        },
        stubs: ['vue-router']
      }
    })

    const videoStore = useVideoStore();

    await flushPromises()

    const firstVideo = wrapper.find('.card__item');
    await firstVideo.trigger('click');
    const videoData = searchJSON.items[0]

    expect(videoStore.currentVideo).toEqual(videoData)
  })
})