<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="goback(pageNo - 1)">上一页</button>
    <button @click="gofirstlast(1)" v-if="page.start > 1">1</button>
    <button v-if="page.end > continues">.....</button>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <button
      :class="{ active: value == pageNo }"
      v-show="value >= page.start && value <= pageTotal"
      v-for="(value, index) in page.end"
      :key="index"
      @click="changeNo(value)"
    >
      {{ value }}
    </button>
    <button v-if="pageTotal > page.end">.....</button>
    <button :disabled="pageNo == pageTotal" @click="goforward(pageNo + 1)">
      下一页
    </button>
    <button @click="gofirstlast(pageTotal)">共{{ pageTotal }}页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: Number,
    pageSize: Number,
    pageNo: Number,
    continues: Number,
  },

  computed: {
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    page() {
      let No = this.pageNo;
      let start = 1;
      let end = this.continues;
      if (this.pageTotal < this.continues) {
        start = 1;
        end = this.pageTotal;
      }
      // 当你No<end-continue/2的时候,我们不用动   1  2  3  4  5
      if (No <= Math.ceil(this.continues / 2)) {
        start = 1;
        end = this.continues;
      } else if (No + Math.floor(this.continues / 2) > this.pageTotal) {
        start = No - Math.floor(this.continues / 2);
        end = this.pageTotal;
      } else {
        start = No - Math.floor(this.continues / 2);
        end = No + Math.floor(this.continues / 2);
      }

      return {
        start,
        end,
      };
    },
  },
  methods: {
    changeNo(current) {
      this.$emit("changePagination", current);
    },
    goback(current) {
      this.$emit("changePagination", current);
    },
    goforward(current) {
      this.$emit("changePagination", current);
    },
    gofirstlast(current) {
      this.$emit("changePagination", current);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  margin: 0 auto;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>