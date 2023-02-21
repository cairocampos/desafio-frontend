import { mount } from '@vue/test-utils'
import { DateTime } from 'luxon';
import Thumbnail from './Thumbnail.vue';

describe('Thumbnail component', () => {
  const defaultProps = {
    thumbnailURL: 'http://fake.com',
    title: 'titulo qualquer',
    publishedAt: DateTime.now().minus({hours: 2}).toISO(),
  }
  it('should render data correctly', () => {
    const wrapper = mount(Thumbnail, {
      props: defaultProps
    })

    expect(wrapper.find('img').attributes().src).toEqual(defaultProps.thumbnailURL)
    expect(wrapper.find('.play-card__title').text()).toEqual(defaultProps.title)
    expect(wrapper.find('.play-card__published_at').text()).toEqual('2 horas atrás')
  })

  it('should emit click event when to click on element', () => {
    const wrapper = mount(Thumbnail, {
      props: defaultProps
    });

    wrapper.find('.play-card').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
});