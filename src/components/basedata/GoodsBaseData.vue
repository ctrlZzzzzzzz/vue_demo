<template>
  <div class="goodsBaseData">
    <div class="body">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>商品基础数据</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索栏 -->
        <div class="search">
          <div class="search-input">
            <el-select v-model="search.goodsType" filterable placeholder="商品类型" clearable>
              <el-option
                v-for="item in goodsTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.goodsTypeName"
              ></el-option>
            </el-select>
            <el-input placeholder="商品名称" v-model="search.goodsName" clearable></el-input>
          </div>
          <div class="search-button">
            <el-button type="primary" plain @click="goodsSearch">查询</el-button>
            <el-button type="primary" plain @click="setNew">新增</el-button>
          </div>
        </div>
        <!-- 查询列表 -->
        <el-table :data="goodsList" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                circle
                @click="setUpdate(scope.row.goodsName,scope.row.goodsTypeName,scope.row.goodsType,scope.row.id)"
              ></el-button>
              <el-button icon="el-icon-delete" circle @click="goodsDelete(scope.row.id)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="goodsTypeName" label="商品类型"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        </el-table>
      </el-card>

      <!-- 新增对话框 -->
      <el-dialog title="新增商品" :visible.sync="dialogNewVisible" width="50%" @close="newDialogClosed">
        <el-form :model="goodsNewList" :rules="goodsRules" ref="goodsNewRef" label-width="100px">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="goodsNewList.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="goodsType">
            <el-select v-model="goodsNewList.goodsType" placeholder="请选择商品类型">
              <el-option
                v-for="item in goodsTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.goodsTypeName"
              ></el-option>
            </el-select>
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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsUpdateList.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="type">
            <el-select v-model="goodsUpdateList.goodsTypeName" placeholder="请选择商品类型">
              <el-option v-for="item in goodsTypeList" :key="item.id" :value="item.goodsTypeName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="goodsUpdate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <div class="footer">
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询输入数据
      search: {
        goodsType: '',
        goodsName: '',
      },
      // 查询列表
      goodsList: [
        {
          goodsType: '',
          goodsName: '',
          goodsTypeName: '',
          id: '',
        },
      ],
      total: 0,
      dialogNewVisible: false,
      dialogUpdateVisible: false,
      // 新增商品表单
      goodsNewList: {
        goodsType: '',
        goodsName: '',
      },
      goodsUpdateList: {
        goodsType: '',
        goodsName: '',
        goodsTypeName: '',
        id: '',
      },
      goodsRules: {
        goodsTypeName: [
          { required: true, message: '请输入商品类型', trigger: 'blur' },
        ],
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
      },
      goodsTypeList: [],
    }
  },
  created() {
    this.getGoodsType()
  },
  methods: {
    async goodsSearch() {
      const { data: res } = await this.$http.get('/goods/selectByTo', {
        params: this.search,
      })
      if (res.success != true) return this.$message.error('res.msg')
      this.goodsList = res.data
      this.$message.success(res.msg)
    },

    async setNew() {
      const { data: res } = await this.$http.get('/goodsType/selectByTo')
      if (res.success != true) return this.$message.error(res.msg)
      this.goodsTypeList = res.data
      this.dialogNewVisible = true
    },
    setUpdate(goodsName, goodsTypeName, goodsType, id) {
      this.goodsUpdateList.goodsTypeName = goodsTypeName
      this.goodsUpdateList.goodsName = goodsName
      this.goodsUpdateList.goodsType = goodsType
      this.goodsUpdateList.id = id
      this.dialogUpdateVisible = true
    },

    async goodsUpdate() {
      this.$refs.goodsUpdateRef.validate(async (vaild) => {
        if (!vaild) return
        const { data: res } = await this.$http.post(
          '/goods/update',
          this.goodsUpdateList
        )
        this.$message.success(res.msg)
        this.goodsSearch()
        this.dialogUpdateVisible = false
      })
    },
    async goodsDelete(id) {
      const confirmResult = await this.$confirm('删除？', '删除商品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult != 'confirm') return this.$message.info('已取消删除')
      const { data } = await this.$http.delete(
        '/goods/deleteById?' + 'id=' + id
      )
      if (data.success != true) return
      this.$message.success(res.msg)
      this.goodsSearch()
    },
    goodsNew() {
      this.$refs.goodsNewRef.validate(async (vaild) => {
        if (!vaild) return
        const { data: res } = await this.$http.post(
          '/goods/insert',
          this.goodsNewList
        )
        if (res.success != true) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.dialogNewVisible = false
        this.goodsSearch()
      })
    },
    async getGoodsType() {
      const { data: res } = await this.$http.get('/goodsType/selectByTo')
      if (res.success != true) return this.$message.error(res.msg)
      this.goodsTypeList = res.data
    },

    // 监听新增对话框关闭
    newDialogClosed() {
      this.$refs.goodsNewRef.resetFields()
    },
  },
}
</script>
<style lang="less" scoped>
.goodsBaseData {
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