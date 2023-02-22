import { flushPromises, mount } from "@vue/test-utils";
import CategoriesScrollList from "./CategoriesScrollList.vue";
import videoCategoriesJSON from '@/mocks/videoCategories.json';
import { HttpClient } from "@/core/http/http-client";

const httpClientFake: Partial<HttpClient> = {
  async get(_: string) {
    return {
      data: videoCategoriesJSON as any,
    }
  },
}

describe('CategoriesScrollList', () => {
  it('should render video categories', async () => {
    const httpClientSpy = vi.spyOn(httpClientFake, 'get')

    const wrapper = mount(CategoriesScrollList, {
      global: {
        provide: {
          http: httpClientFake
        }
      }
    });

    expect(httpClientSpy).toHaveBeenCalled()
    expect(httpClientSpy).toHaveBeenCalledWith('/youtube/v3/videoCategories', {
      params: {
        part: 'snippet',
        regionCode: 'BR'
      }
    })
    await flushPromises()
    expect(wrapper.findAll('.category')).toHaveLength(videoCategoriesJSON.items.length)
    expect(wrapper.find('.category').text()).toEqual(videoCategoriesJSON.items[0].snippet.title)
  });

  it('should emit a selected event when clicking on the category', async () => {
    const wrapper = mount(CategoriesScrollList, {
      global: {
        provide: {
          http: httpClientFake
        }
      }
    });
    await flushPromises()

    const firstItem = wrapper.find('.category');
    await firstItem.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('selected');
    expect(wrapper.emitted('selected')?.[0]).toEqual([videoCategoriesJSON.items[0].id])
  });

  it('should set a class to inform that the element was selected', async () => {
    const wrapper = mount(CategoriesScrollList, {
      global: {
        provide: {
          http: httpClientFake
        }
      }
    });
    await flushPromises()

    const firstItem = wrapper.find('.category');
    await firstItem.trigger('click');

    expect(firstItem.classes().includes('active')).toBe(true)
  });
})