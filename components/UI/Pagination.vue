<script setup lang="ts">
  import BaseButton from '@/components/UI/BaseButton.vue'

  interface Props {
    currentPage: number
    totalPages: number
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    change: [page: number]
  }>()

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
      emit('change', page)
    }
  }
</script>

<template>
  <div class="pagination">
    <BaseButton
      variant="transparent"
      :disabled="currentPage === 1"
      class="pagination-btn"
      @click="handlePageChange(currentPage - 1)"
    >
      ←
    </BaseButton>

    <BaseButton
      v-for="page in totalPages"
      :key="page"
      variant="transparent"
      :class="['pagination-btn', { active: page === currentPage }]"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </BaseButton>

    <BaseButton
      variant="transparent"
      :disabled="currentPage === totalPages"
      class="pagination-btn"
      @click="handlePageChange(currentPage + 1)"
    >
      →
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44.98px;
    height: 44.98px;
    cursor: pointer;
    background: $color-white;
    border: 1px solid $color-border-gray;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.active {
      color: $color-white;
      background: $color-black;
      border-color: $color-black;
    }
  }

  @media (max-width: $breakpoints-m) {
    .pagination {
      gap: 4px;
    }

    .pagination-btn {
      width: 28px;
      height: 28px;
      font-size: 12px;
    }
  }
</style>
