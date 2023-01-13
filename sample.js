import { mount } from '@vue/test-utils'
import SwitchButton from '~/components/atoms/SwitchButton/SwitchButton.vue'

describe('Combobox.vue', () => {
  test('check selected', async () => {
    const wrapper = mount(SwitchButton)
    const option3 = await wrapper.trigger('click')
    expect(option3).toBeFalsy()
  })
})




import { mount } from '@vue/test-utils'
import Combobox from '~/components/atoms/Combobox/Combobox.vue'

describe('Combobox.vue', () => {
  test('check selected', async () => {
    const wrapper = mount(Combobox)
    const options = wrapper.find('v-combobox').findAll('items')
    await options.at(1).setSelected()
    expect(wrapper.find('option:checked').element).toBeTruthy()
  })
})
