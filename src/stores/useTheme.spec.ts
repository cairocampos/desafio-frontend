import {useTheme} from '@/stores/useTheme';
import { createPinia, setActivePinia } from 'pinia';

describe('useTheme', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('initial theme', () => {
    const { theme } = useTheme();
    expect(theme).toBe('light')
  });

  it('should keep initial theme if storage not provide data', () => {
    const themeStore = useTheme();
    vi.spyOn(localStorage, 'getItem').mockReturnValueOnce('')
    themeStore.setInitialTheme();
    expect(themeStore.theme).toBe('light')
  })

  it('should toggle theme', () => {
    const themeStore = useTheme();
    themeStore.toggleTheme()
    expect(themeStore.theme).toBe('dark')
    themeStore.toggleTheme()
    expect(themeStore.theme).toBe('light')
  })

  it('should set a class attribute like dark on html', () => {
    const themeStore = useTheme();
    themeStore.toggleTheme()

    expect(document.documentElement.classList.contains('dark'))
      .toBeTruthy()

    themeStore.toggleTheme()
    expect(document.documentElement.classList.contains('dark'))
      .toBeFalsy()
  });
})