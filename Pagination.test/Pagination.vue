<template>
    <div class=“wrapper”>
      <span class=“content”
        >{{ fromNumber }}〜{{ toNumber }}件を表示 / {{ total }}件</span
      >
      <ul class=“pagination”>
        <li
          v-for=“(page, index) in pages”
          :key=“index”
          class=“pagination-item”
          :class=“{ active: isPageActive(page.name) }”
        >
          <button
            type=“button”
            :disabled=“page.isDisabled”
            :class=“{ active: isPageActive(page.name) }”
            :aria-label=“`Go to page number ${page.name}`”
            @click=“onClickPage(page.name)”
          >
            {{ page.name }}
          </button>
        </li>
        <li v-if=“!isInFirstPage” class=“pagination-item”>
          <button
            class=“first-btn”
            type=“button”
            :disabled=“isInFirstPage”
            aria-label=“Go to first page”
            @click=“onClickFirstPage”
          >
            <ArrowLastIcon />
          </button>
        </li>
        <li class=“pagination-item”>
          <button
            type=“button”
            :disabled=“isInFirstPage”
            aria-label=“Go to previous page”
            @click=“onClickPreviousPage”
          >
            <ArrowLeftIcon />
          </button>
        </li>
        <li v-if=“!isInLastPage” class=“pagination-item”>
          <button
            class=“next-btn”
            type=“button”
            :disabled=“isInLastPage”
            aria-label=“Go to next page”
            @click=“onClickNextPage”
          >
            <ArrowLeftIcon />
          </button>
        </li>
        <li class=“pagination-item”>
          <button
            class=“last-btn”
            type=“button”
            :disabled=“isInLastPage”
            aria-label=“Go to last page”
            @click=“onClickLastPage”
          >
            <ArrowLastIcon />
          </button>
        </li>
      </ul>
    </div>
  </template>
  <script lang=“ts”>
  import ArrowLeftIcon from ‘~/components/atoms/Icon/ArrowLeftIcon.vue’
  import ArrowLastIcon from ‘~/components/atoms/Icon/ArrowLastIcon.vue’
  export default defineComponent({
    components: {
      ArrowLeftIcon,
      ArrowLastIcon
    },
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 2
      },
      total: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    emits: [‘pagechanged’],
    setup(props, context) {
      const fromNumber = computed(() => {
        return (props.currentPage - 1) * 10 + 1
      })
      const toNumber = computed(() => {
        return props.currentPage * 10 > props.total
          ? props.total
          : props.currentPage * 10
      })
      const startPage = computed(() => {
        if (props.currentPage === 1) {
          return 1
        }
        if (props.currentPage === Math.ceil(props.total / props.perPage)) {
          return (
            Math.ceil(props.total / props.perPage) - props.maxVisibleButtons + 1
          )
        }
        return props.currentPage - 1
      })
      const endPage = computed(() => {
        return Math.min(
          startPage.value + props.maxVisibleButtons - 1,
          Math.ceil(props.total / props.perPage)
        )
      })
      const pages = computed(() => {
        const range = []
        for (let i = startPage.value; i <= endPage.value; i += 1) {
          range.push({
            name: i,
            isDisabled: i === props.currentPage
          })
        }
        return range
      })
      const isInFirstPage = computed(() => {
        return props.currentPage === 1
      })
      const isInLastPage = computed(() => {
        return props.currentPage === Math.ceil(props.total / props.perPage)
      })
      const onClickFirstPage = () => {
        context.emit(‘pagechanged’, 1)
      }
      const onClickPreviousPage = () => {
        context.emit(‘pagechanged’, props.currentPage - 1)
      }
      const onClickPage = (page: number) => {
        context.emit(‘pagechanged’, page)
      }
      const onClickNextPage = () => {
        context.emit(‘pagechanged’, props.currentPage + 1)
      }
      const onClickLastPage = () => {
        context.emit(‘pagechanged’, Math.ceil(props.total / props.perPage))
      }
      const isPageActive = (page: number) => {
        return props.currentPage === page
      }
      return {
        fromNumber,
        toNumber,
        startPage,
        endPage,
        pages,
        isInFirstPage,
        isInLastPage,
        onClickFirstPage,
        onClickPreviousPage,
        onClickPage,
        onClickNextPage,
        onClickLastPage,
        isPageActive
      }
    }
  })
  </script>
  <style lang=“scss” scoped>
  .wrapper {
    display: flex;
    align-items: center;
  }
  .content {
    margin-right: 10px;
    font-size: 15px;
    font-weight: 500;
  }
  .pagination {
    display: flex;
    list-style-type: none;
  }
  .first-btn {
    svg {
      margin-top: 2px;
      transform: rotate(180deg);
    }
  }
  .next-btn {
    svg {
      transform: rotate(180deg);
    }
  }
  .last-btn {
    svg {
      margin-top: 2px;
    }
  }
  .pagination-item {
    display: flex;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #D0D3D6;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    button {
      width: 30px;
      height: 30px;
      &:disabled {
        svg {
          opacity: 0.5;
        }
      }
    }
  }
  .active {
    font-weight: bold;
    color: var(--color-ref-gray100);
    background-color: #EEEFF1;
  }
  </style>