<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:40:58
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-24 10:47:23
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
          <span>{{organ.name}}</span>
        </div>

        <!-- style="color: #333;text-align: center;margin-buttom: 20px; " -->
        <el-form
          label-position="left"
          ref="organ"
          :model="organ"
          label-width="150px"
          style="color:#333; margin: 0 100px;"
        >
          <div class="well">
            <div>
              <el-image
                style="width: 100%; height: 400px; margin: 10px auto;"
                :src="organ.logoLink"
              ></el-image>
            </div>
          </div>
          <!--  <el-form-item label="父级管理id :">{{organ.fathId}}</el-form-item> -->
          <el-form-item label="介绍 :">{{organ.intro}}</el-form-item>
        </el-form>
      </el-card>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  name: "organDetails",

  data() {
    return {
      organ: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchorgans(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchorgans(id) {
      //向本地接口中请求数据，然后赋值给organ
      console.log(id);
      this.axios.get("/organization/" + id).then(response => {
        //console.log(response.data.data.data);
        this.organ = response.data.data;
      });
    },

    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/organization" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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