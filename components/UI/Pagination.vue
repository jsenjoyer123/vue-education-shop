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
