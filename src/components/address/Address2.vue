<template>
  <div>
    <tree-table
      :data="list"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      show-index
      tree-type
      children-prop="addressVoList"
    >
      <template slot="code" slot-scope="scope">
        <span>{{scope.row.code}}</span>
      </template>
    </tree-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      columns: [
        {
          label: '省市区',
          prop: 'name',
        },
        {
          label: '编码',
          prop: 'code',
          type: 'template',
          template: 'code',
        },
      ],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('/address/selectByTo')
      this.list = res.data
    },
  },
}
</script>
<style lang="less" scoped>
</style>