<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>麦德多超市进销存系统</span>
        <span class="gettime">{{gettime}}</span>
      </div>
      <span>生意兴隆，财源广进~</span>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' :'200px'">
        <!-- 菜单栏 -->
        <el-menu router :collapse="isCollapse" :collapse-transition="false">
          <el-submenu :index="index +''" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>{{item.menuName}}</span>
            </template>

            <el-menu-item
              :index="subItem.menuUrl"
              v-for="(subItem) in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>{{subItem.menuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="toggle-button" @click="toggleCollapse">|||</div>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.currentTime()
  },
  data() {
    return {
      // 当前时间
      gettime: '',
      // 菜单栏是否折叠
      isCollapse: false,
      // 菜单栏数据
      menuList: [
        {
          menuName: '基础数据',
          children: [
            {
              id: 1,
              menuName: '商品类型',
              menuUrl: '/goodstype',
            },
            {
              id: 2,
              menuName: '商品基础数据',
              menuUrl: '/goodsbasedata',
            },
          ],
        },
        {
          menuName: '采购',
          children: [
            {
              id: 3,
              menuName: '采购记录',
              menuUrl: '/',
            },
            {
              id: 4,
              menuName: '采购明细',
              menuUrl: '/purchasedetail',
            },
          ],
        },
        {
          menuName: '库存',
          children: [{ id: 5, menuName: '商品库存', menuUrl: '/' }],
        },
        {
          menuName: '上架',
          children: [
            {
              menuName: '商品类型',
              menuUrl: '/',
            },
            {
              menuName: '商品基础数据',
              menuUrl: '/address3',
            },
          ],
        },
        {
          menuName: '出售',
          children: [
            {
              menuName: '商品类型',
              menuUrl: '/address2',
            },
            {
              menuName: '商品基础数据',
              menuUrl: '/address',
            },
          ],
        },
      ],
    }
  },
  methods: {
    // 获取时间
    getTime() {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      let ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    },
    currentTime() {
      setInterval(this.getTime, 500)
    },
    // 菜单栏折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
}
.el-header {
  display: flex;
  justify-content: space-between;
}
.el-header span {
  line-height: 60px;
  font-size: 18px;
  color: rgb(56, 52, 51);
}
.el-header div .gettime {
  font-size: 12px;
  padding-left: 10px;
}
.el-aside .toggle-button {
  text-align: center;
  height: 50px;
  line-height: 50px;
  letter-spacing: 0.15em;
  cursor: pointer;
}
</style>
