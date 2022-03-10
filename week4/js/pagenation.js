export default {
  props: ['pages'],

  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination m-0 p-0">
      <!-- 上一頁  -->
      <li 
      class="page-item" 
      :class="{disabled:!pages.has_pre}"
      @click.prevent="$emit('change-page',pages.current_page - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous" >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!--數字頁-->
      <li 
      class="page-item" 
      v-for=" page in pages.total_pages" 
      :key="page+'12321'"
      :class="{active:pages.current_page === page}"
      @click.prevent="$emit('change-page',page)"
      >
        <a class="page-link" href="#">{{page}}</a>
      </li>
      <!--下一頁-->
      <li class="page-item" :class="{disabled:!pages.has_next}"
      @click.prevent="$emit('change-page',pages.current_page + 1)"
      >
        <a 
        class="page-link" 
        href="#" 
        aria-label="Next"
        
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
};
