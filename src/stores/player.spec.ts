import { createPinia, setActivePinia } from 'pinia';
import { useVideoStore } from './player';

describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should returns undefined whe localStorage data is empty or undefined', () => {
    const playerStore = useVideoStore();
    playerStore.loadVideoFromStorage();
    expect(playerStore.currentVideo).toBeUndefined();
  });

  it('should returns video info loaded from storage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify({
      id: 'hashid'
    }))
    const playerStore = useVideoStore();
    playerStore.loadVideoFromStorage();
    expect(playerStore.currentVideo?.id).toEqual('hashid');
  });

  it('should persist data on storage when set video', () => {
    const storageSpy = vi.spyOn(localStorage, 'setItem');
    const playerStore = useVideoStore();
    const videoInfo = {
      etag: "",
      id: {
        kind: "",
        videoId: ""
      },
      kind: "",
      snippet: {
        channelId: "",
        channelTitle: '',
        description: '',
        liveBroadcastContent: "",
        publishedAt: "",
        publishTime: "",
        title: "",
        thumbnails: {
          default: {
            height: 10,
            width: 10,
            url: "",
          },
          medium: {
            height: 10,
            width: 10,
            url: "",
          },
          high: {
            height: 10,
            width: 10,
            url: "",
          }
        }
      }
    }
    playerStore.setVideo(videoInfo);

    expect(storageSpy).toHaveBeenCalled()
    expect(storageSpy).toHaveBeenCalledTimes(1)
    expect(storageSpy).toHaveBeenCalledWith('@Rocketstream:video', JSON.stringify(videoInfo))
  })
})