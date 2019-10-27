<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:42:10
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-17 20:23:27
 -->
<template>
  <div class="editBanner container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="carouselChart" :model="carouselChart" label-width="130px">
        <!-- <el-form v-on:submit="updatecarouselChart"> -->
        <div class="well">
          <el-form-item label="轮播图名称 :">
            <el-input v-model="carouselChart.imgName" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="轮播图地址 :">
            <el-input v-model="carouselChart.imgLink" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接 :">
            <el-input v-model="carouselChart.url" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="启用状态 :">
            <el-input v-model="carouselChart.status" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatecarouselChart">确定修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "editBanner",
  data() {
    return {
      carouselChart: {},
      alert: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/banner" });
    },
    //获取用户信息展示的方法,参数是id,通过id传入对应的信息，方便修改
    fetchcarouselChart(id) {
      this.axios.get("/banner/" + id).then(response => {
        // console.log(response)
        this.carouselChart = response.body.data;
      });
    },
    //修改用户信息的方法
    updatecarouselChart(e) {
      console.log("submit");
      if (
        !this.carouselChart.imgName ||
        !this.carouselChart.imgLink ||
        !this.carouselChart.url
      ) {
        console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        let newcarouselChart = {
          id: this.carouselChart.id,
          imgName: this.carouselChart.imgName,
          imgLink: this.carouselChart.imgLink,
          url: this.carouselChart.url,
          status: this.carouselChart.status
        };

        //修改用户信息后，put到接口数据中，并跳转到主页，传递alert内容
        this.axios
          .put("/banner/" + this.$route.params.id, newcarouselChart)
          .then(response => {
            // console.log(response);
            this.$router.push({
              path: "/banner",
              query: { alert: "活动信息更新成功！" }
            });
          });
        e.preventChartDefault();
      }
      e.preventChartDefault();
    }
  },
  created() {
    //一开始就根据对应id获取到信息展示
    this.fetchcarouselChart(this.$route.params.id);
  }, //组件注册
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>