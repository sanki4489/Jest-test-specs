import { mount } from ‘@vue/test-utils’
import Pagination from ‘@/components/molecules/Pagination/Pagination.vue’
describe(‘Pagination.vue’, () => {
  test(‘sets currentpage, total and checks both’, () => {
    const wrapper = mount(Pagination, {
        props: {
          perPage: 2,
          currentPage: 2,
          total: 100
        }
    })
    expect(wrapper.find(“.content”).text()).toBe(’11〜20件を表示 / 100件’)
  })
  test(‘checks first page button’, () => {
    const wrapper = mount(Pagination)
    expect(wrapper.find(‘.first-btn’).exists()).toBe(true)
    wrapper.find(‘.first-btn’).trigger(‘click’)
    expect(wrapper.emitted(‘pagechanged’)).toEqual([[1]])
  })
  test(‘checks next button’, () => {
    const wrapper = mount(Pagination)
    expect(wrapper.find(‘.next-btn’).exists()).toBe(true)
    wrapper.find(‘.next-btn’).trigger(‘click’)
    expect(wrapper.emitted(‘pagechanged’)).toBeTruthy()
  })
  test(‘checks last button click’, () => {
    const wrapper = mount(Pagination)
    expect(wrapper.find(‘.last-btn’).exists()).toBe(true)
    wrapper.find(‘.last-btn’).trigger(‘click’)
    expect(wrapper.emitted(‘pagechanged’)).toBeTruthy()
  })
})