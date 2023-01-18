describe('SwitchButton.vue', () => {
  test('when clicked button turns on', async () => {
    const wrapper = mount(SwitchButton, {
      props: { value: false }
    })
    wrapper.find('div.SwitchButton_ButtonContainer').trigger('click')
    expect(wrapper.emitted('inputToggle')).toEqual([[true]])

    await wrapper.setProps({ value: true })

    wrapper.find('div.SwitchButton_ButtonContainer').trigger('click')
    expect(wrapper.emitted('inputToggle')).toEqual([[true], [false]])
  })
})