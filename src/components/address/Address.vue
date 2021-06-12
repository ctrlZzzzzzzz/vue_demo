<template>
  <div>
    <el-cascader
      v-model="selectAddress"
      :options="addressList"
      :props="addressListProp"
      @change="handleChange"
    ></el-cascader>
    <el-table :data="addressList" style="width: 100%">
      <el-table-column type="expand" width="200">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="5">
              <el-button size="mini" type="primary" plain>{{scope.row.name}}</el-button>
            </el-col>
            <el-col :span="19">
              <el-row v-for="(item,index) in scope.row.addressVoList" :key="index">
                <el-col :span="7">
                  <el-button size="mini" type="warning" plain>{{item.name}}</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    size="mini"
                    v-for="(item1,index1) in item.addressVoList"
                    :key="index1"
                    type="success"
                    plain
                  >{{item1.name}}</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="200"></el-table-column>
      <el-table-column prop="name" label="省市区"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressList: [],
      selectAddress: [],
      addressListProp: {
        value: 'code',
        label: 'name',
        children: 'addressVoList',
      },
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    async getAddress() {
      const { data: res } = await this.$http.get('/address/selectByTo')
      console.log(res.data)
      this.addressList = res.data
    },
    handleChange() {},
  },
}
</script>
<style lang="less" scoped>
.el-row {
  display: flex;
  align-items: center;
}
</style>
