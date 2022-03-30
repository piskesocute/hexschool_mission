<script>
export default {
  props: ['pages'],
  data() {
    return {};
  },
  methods: {
    changePage(index) {
      this.$emit('change-page', index);
    },
  },
};
</script>
<template>
  <nav aria-label="Page navigation example ">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('change-page', pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="i in pages.total_pages"
        :key="i + 32133"
        :class="{ active: pages.current_page === i }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(i)"
          >{{ i }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
</style>
