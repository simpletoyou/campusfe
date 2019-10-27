<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:32
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-22 14:58:24
 -->

<template>
  <div>
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <div class="details container">
      <el-card class="box-card" style="width: 80%; height: 100%; margin: 0 auto;">
        <div
          slot="header"
          class="clearfix"
          style="text-align: center; font-size: 20px; color: #333; padding: 0 20px;"
        >
          <span>{{picture.iconName}}</span>
        </div>

        <!-- style="color: #333;text-align: 

        center;margin-buttom: 20px; "-->
        <el-form
          label-position="left"

          label-width="150px"
          style="color:#333; margin: 0 100px;"
        >
          <div class="well">
            <el-form-item label="图标 :">
              <el-image style="width: 400px; height: 200px; " :src="axios.defaults.baseURL+picture.iconLink"></el-image>
            </el-form-item>
            <el-form-item label="图标链接 :"><a :href="axios.defaults.baseURL+picture.iconLink" target="_blank">
              {{picture.iconLink}}</a></el-form-item>
          </div>
        </el-form>
      </el-card>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  name: "picturesDetails",

  data() {
    return {
      picture: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchpictures(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchpictures(id) {
      console.log('aaaaaaaaaaaa');
      console.log(id);
      //向本地接口中请求数据，然后赋值给picture
      this.axios.get("/icon/" + id).then(response => {
        console.log(response);
        this.picture = response.data.data;
      });
    },

    goBack() {
      this.$router.push({ path: "/icon" });
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