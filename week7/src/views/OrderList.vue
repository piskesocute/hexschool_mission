<script>

export default {
  data() {
    return {
      Order: {},
    };
  },
  methods: {
    petOrderList() {},
  },
  mounted() {},
};
</script>
<template>
  <div class="d-flex mb-3">
    <div class="ms-auto">
      <button class="btn btn-primary" type="submit">
        新增優惠券
      </button>
    </div>
  </div>
  <!-- <Pagination :pages="pagination" @change-page="getCoupon"></Pagination> -->
  <table class="table text-center align-middle">
    <thead class="text-center">
      <tr>
        <th width="15%" scope="col">優惠卷名稱</th>
        <th width="5%" scope="col">折扣</th>
        <th width="5%" scope="col">到期日</th>
        <th width="5%" scope="col">啟用狀態</th>
        <th width="10%" scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr >
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td class="">
          <div class="form-check form-switch d-flex justify-content-center">
            <!--eslint-disable-next-line-->
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              :true-value="1"
              :false-value="0"
            />
          </div>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-primary"
            >
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
</style>
