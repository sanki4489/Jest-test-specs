<template>
  <div class=“SwitchButton”>
    <div
      class=“SwitchButton_ButtonContainer”
      :class=“{ ‘SwitchButton-enabled’: value }”
      @click=“onToggle”
    >
      <div class=“SwitchButton_Button” />
    </div>
    <div class=“SwitchButton_ButtonLabel”>
      <slot />
    </div>
  </div>
</template>
<script lang=“ts”>
export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: [‘inputToggle’],
  setup(props, context) {
    const onToggle = () => {
      context.emit(‘inputToggle’, !props.value)
    }
    return {
      onToggle
    }
  }
})
</script>
<style lang=“scss” scoped>
$switch-button-height: 1.6em;
$button-side-length: calc(#{$switch-button-height} - 4px);
.SwitchButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  &_ButtonContainer {
    width: calc(#{$switch-button-height} * 2);
    height: $switch-button-height;
    cursor: pointer;
    background-color: #bbb;
    border: 2px solid #bbb;
    border-radius: $switch-button-height;
    box-shadow: inset 0 0 2px 0 rgb(0 0 0 / 33%);
    transition: all 0.3s ease-in-out;
  }
  &_Button {
    width: $button-side-length;
    height: $button-side-length;
    background: #fff;
    border: 2px solid #bbb;
    border-radius: $button-side-length;
    transition: all 0.3s ease-in-out;
  }
  &-enabled {
    background-color: #63AE52;
    border: 2px solid #63AE52;
    box-shadow: none;
    .SwitchButton_Button {
      background: #fff;
      border-color: #63AE52;
      transform: translateX(calc(#{$button-side-length} + 4px));
    }
  }
  &_ButtonLabel {
    margin-left: 10px;
  }
}
</style>