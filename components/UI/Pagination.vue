<script setup lang="ts">
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
    <button
      :disabled="currentPage === 1"
      class="pagination-btn"
      @click="handlePageChange(currentPage - 1)"
    >
      ←
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      :class="['pagination-btn', { active: page === currentPage }]"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      class="pagination-btn"
      @click="handlePageChange(currentPage + 1)"
    >
      →
    </button>
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
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.active {
      color: #fff;
      background: #333;
      border-color: #333;
    }
  }
</style>
