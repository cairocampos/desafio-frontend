import { mount } from "@vue/test-utils"
import { Mock } from "vitest"
import { useRouter } from "vue-router"
import SearchBar from "./SearchBar.vue"

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    replace: () => {}
  })),
}))

describe('SearchBar component', () => {
  let replace: Mock
  beforeEach(() => {
    replace = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      replace
    }))

    localStorage.clear();
  })

  it('should not display terms', () => {
    const wrapper = mount(SearchBar)

    expect(wrapper.find('.terms').exists()).toBeFalsy();
  })

  it('should not replace route params if terms is empty', async () => {
    localStorage.setItem('@Rocketstream:terms', '[]')
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input');
    await input.trigger('keyup.enter');

    expect(replace).not.toHaveBeenCalled();
  });

  it('should replace query route state with term value', async () => {
    const term = 'some here'
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input');
    await input.setValue(term);
    await input.trigger('keyup.enter');

    expect(replace).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith({
      query: {
        search: term
      }
    })
  });

  it('should persist term on localStorage', async () => {
    const storageSpy = vi.spyOn(localStorage, 'setItem');
    const wrapper = mount(SearchBar)
    const term = 'some here'
    const input = wrapper.find('input');
    await input.setValue(term);
    await input.trigger('keyup.enter');
    
    expect(storageSpy).toHaveBeenCalled();
    expect(storageSpy).toHaveBeenCalledTimes(1);
    expect(storageSpy).toHaveBeenCalledWith('@Rocketstream:terms', JSON.stringify([term]));
  });

  it('should include new term when existing storage data ', async () => {
    const storageSpy = vi.spyOn(localStorage, 'setItem');
    const term = 'some'
    vi.spyOn(localStorage,  'getItem').mockReturnValueOnce(JSON.stringify([term]))
    const wrapper = mount(SearchBar)
    const newTerm = 'some here'
    const input = wrapper.find('input');
    await input.setValue(newTerm);
    await input.trigger('keyup.enter');
    
    expect(storageSpy).toHaveBeenCalled();
    expect(storageSpy).toHaveBeenCalledTimes(1);
    expect(storageSpy).toHaveBeenCalledWith('@Rocketstream:terms', JSON.stringify([newTerm, term]));
  });

  it('should not display terms on input focus and storage doest not returns terms', async () => {
    vi.spyOn(localStorage,  'getItem').mockReturnValueOnce(null)
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input');
    await input.trigger('focus');
    
    expect(wrapper.find('.terms').exists()).toBeFalsy();
  });

  it('should display terms on input focus and storage returns terms', async () => {
    vi.spyOn(localStorage,  'getItem').mockReturnValueOnce(JSON.stringify(['some']))
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input');
    await input.trigger('focus');
    
    expect(wrapper.find('.terms').exists()).toBeTruthy();
  });

  it('should render terms correctly', async () => {
    vi.spyOn(localStorage,  'getItem').mockReturnValueOnce(JSON.stringify(['some']))
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input');
    await input.trigger('focus');
    
    expect(wrapper.find('.terms').exists()).toBeTruthy();
    expect(wrapper.find('.terms__item').text()).toContain('some');
  });
})