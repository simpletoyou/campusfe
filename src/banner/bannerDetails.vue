<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:32
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-04 11:21:57
 -->

<template>
  <div>
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <div class="details container">
      <el-card class="box-card" style="width: 90%; height: 100%; margin: 20px auto;">
        <div
          slot="header"
          class="clearfix"
          style="text-align: center; font-size: 20px; color: #333; padding: 0 20px;"
        >
          <span>{{carouselChart.imgName}}</span>
        </div>
        <el-form
          label-position="left"
          label-width="150px"
          style="color:#333; margin: 0 100px;"
        >
          <div class="well">
            <el-form-item label="轮播图 :">
              <el-image style="width:80%; height: 300px; margin: 10px auto" :src="axios.defaults.baseURL+carouselChart.imgLink"></el-image>
            </el-form-item>
            <br />
            <el-form-item label="轮播图链接 :"><a :href="axios.defaults.baseURL+carouselChart.imgLink" target="_blank">{{carouselChart.imgLink}}</a></el-form-item>
            <el-form-item label="跳转链接 :"><a :href="carouselChart.url" target="_blank">{{carouselChart.url}}</a></el-form-item>
            <el-form-item label="启用状态 :">
              <span v-if="carouselChart.used">已启用</span>
              <span v-else>未启用</span>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  
  name: "carouselChartsDetails",

  data() {
    return {
      carouselChart: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchcarouselCharts(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchcarouselCharts(id) {
      console.log('aaaaaaaaaaaa');
      console.log(id);
      //向本地接口中请求数据，然后赋值给carouselChart
      this.axios.get("/banner/" + id).then(response => {
        console.log(response);
        this.carouselChart = response.data.data;
      });
    },

    goBack() {
      this.$router.push({ path: "/banner" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component 

only -->
<style scoped>
.btnStyle {
  height: 25px;
  padding-top: 8px;
  padding-bottom: 19px;
  margin: 10px 0;
  background-color: #409eff;
  color: #ffffff;
}
.routeColor {
  color: #ffffff;
  text-align: center;
}
.titleLinkStyle {
  font-size: 18px;
  color: steelblue;
  text-decoration: underline;
}
/* .labelStyle {
    display: -webkit-inline-box;
    color: #333;
    float: left;
    margin-left: 60px;
} */
.el-form-item {
  margin-bottom: 2px;
}
</style>