<template>
  <div class="purchaseDetail">
    <div class="body">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>采购</el-breadcrumb-item>
          <el-breadcrumb-item>采购明细</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索栏 -->
        <div class="search">
          <div class="search-input">
            <label for="goodsType">商品类型:</label>
            <el-select v-model="search.goodsTypeId" filterable placeholder="商品类型" clearable id="goodsType">
              <el-option v-for="item in getGoodsTypeList" :key="item.id" :value="item.id" :label="item.goodsTypeName" ></el-option>
            </el-select>
            <label for="goods">商品名称:</label>
            <el-select v-model="search.goodsId" filterable placeholder="商品名称" clearable id="goods">
              <el-option v-for="item in getGoodsList" :key="item.id" :value="item.id" :label="item.goodsName" ></el-option>
            </el-select>
            <label for="purchaseDate">采购日期:</label>
            <el-date-picker v-model="search.purchaseDate" type="date" placeholder="采购日期" value-format="yyyy-MM-dd" id="purchaseDate">
            </el-date-picker>
          </div>
          <div class="search-button">
            <el-button type="primary" plain @click="goodsSearch">查询</el-button>
            <el-button type="primary" plain @click="setNew">新增</el-button>
          </div>  
        </div>
        <!-- 查询列表 -->
        <el-table :data="purchaseDetailList" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" circle @click="setUpdate(scope.row.goodsName,scope.row.goodsTypeName,scope.row.goodsType,scope.row.id)"></el-button>
              <el-button icon="el-icon-delete" circle @click="detailDelete(scope.row.id)"></el-button>
            </template>
          </el-table-column>

          <el-table-column prop="goodsType" label="商品类型"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="goodsNumber" label="采购数量"></el-table-column>
          <el-table-column prop="purchaseDate" label="采购日期"></el-table-column>
          <el-table-column prop="produceDate" label="生产日期"></el-table-column>
          <el-table-column prop="expireDate" label="过期日期"></el-table-column>
          <el-table-column prop="purchasePrice" label="进货单价"></el-table-column>
        </el-table>
      </el-card>
      <!-- 新增对话框 -->
      <el-dialog title="新增采购明细" :visible.sync="newDialogVisible" width="50%">
        <el-form :model="detailNewList" :rules="detailRules" width="50%" @close="newDialogClosed">
          <el-form-item label="商品类型">
            <el-select v-model="detailNewList.goodsTypeId" clearable placeholder="商品类型" @change="goodsTypeChange" size="mini">
              <el-option v-for="item in getGoodsTypeList" :key="item.id" :label="item.goodsTypeName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-select v-model="detailNewList.goodsId" clearable placeholder="商品名称" size="mini">
              <el-option v-for="item in GoodsList" :key="item.id" :label="item.goodsName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购日期">
            <el-date-picker v-model="detailNewList.purchaseDate" type="date" placeholder="采购日期" value-format="yyyy-MM-dd HH:mm:ss" size="mini">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input-number v-model="detailNewList.goodsNumber" :min="1" :max="100" label="商品数量" size="mini"></el-input-number>
          </el-form-item>
          <el-form-item label="进货单价">
            <el-input-number v-model="detailNewList.purchasePrice" :min="0.01" :max="200" label="进货单价" :step="0.1" :precision="2" size="mini"></el-input-number>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker v-model="detailNewList.produceDate" type="date" placeholder="生产日期" value-format="yyyy-MM-dd" size="mini">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="保质期">
            <el-input placeholder="保质期" v-model="expireDate.timeNumber" size="mini">
              <el-select v-model="expireDate.timeUnit" slot="prepend" placeholder="保质期">
                <el-option label="天" value="1"></el-option>
                <el-option label="月" value="2"></el-option>
                <el-option label="年" value="3"></el-option>
              </el-select>
            </el-input>
            <el-date-picker v-model="detailNewList.produceDate" type="date" placeholder="生产日期" value-format="yyyy-MM-dd" size="mini" :disabled="true">
            </el-date-picker>
          </el-form-item>
          
        </el-form>


        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogNewVisible = false">取消</el-button>
          <el-button @click="setUpdate">确定</el-button>

        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        goodsId:'',
        goodsTypeId:'',
        purchaseDate:'',
        pageSize:'3',
        pageNum:'1'
      },
      getGoodsTypeList:[],
      getGoodsList:[],
      purchaseDetailList:{
        goodsType:'',
        goodsName:'',
        goodsNumber:'',
        purchaseDate:'',
        produceDate:'',
        expireDate:'',
        purchasePrice:'',
      },
      newDialogVisible : false,
      updateDialogVisible : false,
      detailNewList:{
        goodsId:'',
        goodsTypeId:'',
        purchaseDate:'',
        goodsNumber:'',
        produceDate:'',
        expireDate:'',
        purchasePrice:'',
      },
      detailUpateList:{

      },
      GoodsList:{

      },
      expireDate:{
        timeNumber:'',
        timeUnit:''
      },
      detailRules:{

      },


    }
  },
  created() {
    this.getGoodsType();
    this.getGoods();
  },
  methods:{
    async getGoodsType(){
      const {data : res} = await this.$http.get('/goodsType/selectByTo');
      this.getGoodsTypeList = res.data;
    },
    async getGoods(){
      const {data : res} = await this.$http.get('/goods/selectByTo');
      this.getGoodsList = res.data;
    },
    async goodsSearch(){
      const {data : res} = await this.$http.get('/purchaseDetail/selectByTo',{params:this.search});
      if(!res.success) return this.$message.error(res.msg);
      this.purchaseDetailList = res.data;
    },
    setNew(){
      this.newDialogVisible = true;
      this.GoodsList = this.getGoodsList;
    },
    setUpdate(){
      this.updateDialogVisible = true;

    },
    detailUpdate(){

    },
    detailDelete(){

    },
    async goodsTypeChange(){
      const {data : res} = await this.$http.get('/goods/selectByTo?goodsType='+this.detailNewList.goodsTypeId);
      this.GoodsList = res.data;
      this.detailNewList.goodsId = ''
    },
    newDialogClosed(){

    }


  }
}
</script>
<style lang="less" scoped>
  .search {
    display: flex;
    justify-content:space-between;
  }
  .purchaseDetail {
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content:space-between
  }
  .el-input .el-select {
    width: 100px;
  }
  .el-form-item .el-input {
    width: 300px;
  }
</style>