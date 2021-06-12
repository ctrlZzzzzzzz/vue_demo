<template>
  <div class="goodsType">
    <div class="body">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>商品类型</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索栏 -->
        <div class="search">
          <div class="search-input">
            <el-select v-model="search.goodsTypeName" filterable placeholder="商品类型" clearable>
              <el-option
                v-for="item in getGoodsTypeList"
                :key="item.id"
                :value="item.goodsTypeName"
                :label="item.goodsTypeName"
              ></el-option>
            </el-select>
          </div>
          <div class="search-button">
            <el-button type="primary" plain @click="goodsSearch">查询</el-button>
            <el-button type="primary" plain @click="dialogNewVisible=true">新增</el-button>
          </div>
        </div>
        <!-- 查询列表 -->
        <el-table :data="goodsTypeList" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" circle @click="goodsUpdate(scope.row.id)"></el-button>
              <el-button icon="el-icon-delete" circle @click="goodsDelete(scope.row.id)"></el-button>
            </template>
          </el-table-column>

          <el-table-column prop="goodsTypeName" label="商品类型"></el-table-column>
        </el-table>
      </el-card>

      <!-- 新增对话框 -->
      <el-dialog
        title="新增商品类型"
        :visible.sync="dialogNewVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form :model="goodsNewList" :rules="goodsRules" ref="goodsNewRef" label-width="100px">
          <el-form-item label="商品类型" prop="goodsTypeName">
            <el-input placeholder="请输入商品类型" v-model="goodsNewList.goodsTypeName" clearable></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogNewVisible = false">取 消</el-button>
          <el-button type="primary" @click="goodsNew">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑对话框 -->
      <el-dialog title="编辑商品" :visible.sync="dialogUpdateVisible" width="50%">
        <el-form
          :model="goodsUpdateList"
          :rules="goodsRules"
          ref="goodsUpdateRef"
          label-width="100px"
        >
          <el-form-item label="商品类型" prop="goodsTypeName">
            <el-input placeholder="请输入商品类型" v-model="goodsUpdateList.goodsTypeName" clearable></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="goodsUpdateConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[2, 3, 4, 5]"
        :page-size="this.search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询输入数据
      search: {
        goodsTypeName: '',
        pageSize: 2,
      },
      // 查询列表
      goodsTypeList: [
        {
          goodsTypeName: '',
          id: '',
        },
      ],
      total: 0,
      dialogNewVisible: false,
      dialogUpdateVisible: false,
      // 新增商品表单
      goodsNewList: {
        goodsTypeName: '',
      },
      goodsUpdateList: {
        goodsTypeName: '',
        id: '',
      },
      goodsRules: {
        goodsTypeName: [
          { required: true, message: '请输入商品类型', trigger: 'blur' },
        ],
      },
      getGoodsTypeList: [],
    }
  },
  created() {
    this.getGoodsType()
  },
  methods: {
    async goodsSearch() {
      const { data: res } = await this.$http.get('/goodsType/selectByTo', {
        params: this.search,
      })
      if (res.success != true) return this.$message.error('错误')
      this.goodsTypeList = res.data
      this.total = res.total
    },
    async getGoodsType() {
      const { data: res } = await this.$http.get('/goodsType/selectByTo')
      if (res.success != true) return this.$message.error(res.msg)
      this.getGoodsTypeList = res.data
    },
    goodsNew() {
      this.$refs.goodsNewRef.validate(async (vaild) => {
        if (!vaild) return
        const { data: res } = await this.$http.post(
          '/goodsType/insert',
          this.goodsNewList
        )
        if (res.success != true) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.dialogNewVisible = false
        this.goodsSearch()
      })
    },
    async goodsUpdate(id) {
      this.dialogUpdateVisible = true
      const { data: res } = await this.$http.get(
        '/goodsType/selectById?' + 'id=' + id
      )
      if (res.success != true) return this.$message.error(res.msg)
      this.goodsUpdateList.goodsTypeName = res.data.goodsTypeName
      this.goodsUpdateList.id = res.data.id
    },
    async goodsDelete(id) {
      const confirmResult = await this.$confirm('删除？', '删除商品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult != 'confirm') return this.$message.info('已取消删除')
      const { data } = await this.$http.delete(
        '/goodsType/deleteById?' + 'id=' + id
      )
      if (data.success != true) return
      this.$message.success(res.msg)
      this.goodsSearch()
    },
    // 监听新增对话框关闭
    addDialogClosed() {
      this.$refs.goodsNewRef.resetFields()
    },
    goodsUpdateConfirm() {
      this.dialogUpdateVisible = true
      this.$refs.goodsUpdateRef.validate(async (vaild) => {
        if (!vaild) return
        this.$message.success(res.msg)
        const { data: res } = await this.$http.post(
          '/goodsType/update',
          this.goodsUpdateList
        )
        if (res.success != true) return this.$message.error(res.msg)
        this.dialogUpdateVisible = false
        this.goodsSearch()
      })
    },
  },
}
</script>
<style lang="less" scoped>
.goodsType {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.search .el-input {
  margin-right: 15px;
  float: left;
  width: 200px;
}
.search {
  display: flex;
  justify-content: space-between;
}
.el-table {
  margin-top: 15px;
}
.footer .el-pagination {
  float: right;
}
</style>