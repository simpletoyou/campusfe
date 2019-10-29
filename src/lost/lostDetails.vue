<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:43:41
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-29 17:18:49
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
          <span>{{thing.title}}</span>
          <div style="color: #707377; font-size: 12px;">
            <span style="float: left">状态 :{{thing.status}}</span>
            <span style="float: right">发布时间 :{{thing.pubTime}}</span>
          </div>
        </div>
        <el-form
          label-position="left"
          ref="thing"
          label-width="150px"
          style="color:#333; margin: 0 100px;"
        >
          <div class="well">
            <el-form-item label="失物/拾物 :">{{thing.type}}</el-form-item>
            <el-form-item label="描述信息 :">{{thing.description}}</el-form-item>
            <el-form-item label="联系人 :">{{thing.person}}</el-form-item>
            <el-form-item label="联系方式 :">{{thing.phone}}</el-form-item>
            <el-form-item label="联系地址 :">{{thing.addr}}</el-form-item>
            <el-form-item label="物品图片："></el-form-item>
            <div v-for="(item, index) in pictures" :key="index">
              <el-image
                style="width: 650px; height: 500px; margin: 0 auto"
                :src="axios.defaults.baseURL+item"
              ></el-image>
            </div>
          </div>
        </el-form>
      </el-card>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  name: "thingsDetails",

  data() {
    return {
      pictures: [],
      thing: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchthings(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchthings(id) {
      //向本地接口中请求数据，然后赋值给thing
      this.axios.get("/lost/" + id).then(response => {
        console.log(response);
        this.thing = response.data.data;
        this.pictures = this.thing.pictures.split("|");
        console.log(this.pictures);
      });
    },

    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/lost" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component 

only -->
<style lang="scss" scoped>
@import 'lostDetails.scss'
</style>