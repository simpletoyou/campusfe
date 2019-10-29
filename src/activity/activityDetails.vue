<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:40:58
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-07 18:04:10
 -->
<template>
  <div>
    <!-- 设置详情页页头,添加页面返回 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <!-- 详情页面主体 -->
    <div class="details container">
      <el-card class="box-card" style="width: 80%; height: 100%; margin: 0 auto;">
        <div
          slot="header"
          class="clearfix"
          style="text-align: center; font-size: 20px; color: #333; padding: 0 20px;"
        >
          <span>{{event.title}}</span>
          <div style="color: #707377; font-size: 12px;">
            <span style="float: left">活动开始时间 :{{moment(event.pubTime).format('YYYY-MM-DD')}}</span>
            <span style="float: right">活动结束时间 :{{moment(event.endTime).format('YYYY-MM-DD')}}</span>
          </div>
        </div>
        <!-- style="color: #333;text-align: center;margin-buttom: 20px; " -->
        <el-form
          label-position="left"
          ref="event"
          label-width="150px"
          style="color:#333; margin: 0 100px;"
        >
          <div class="well">
            <!-- <div>
              <el-image
                style="width: 100%; height: 400px; margin: 10px auto;"
                :src="event.pictures"
              ></el-image>
            </div>-->
            <div v-for="(item, index) in pictures" :key="index" style="float: center;margin:20px auto">
              <el-image
                style="width: 100%; height: 400px; margin: 0 auto"
                :src="axios.defaults.baseURL+item"
              ></el-image>
            </div>

            <el-form-item label="活动负责人 :" style="color:#333">
              <span v-for="(item,index) in event.leaderList" :key="index">{{item.userName}} ( Tel:  {{item.phone}}  )<br /> </span>
            </el-form-item>
            
            <el-form-item label="活动参与人数 :">{{event.num}}</el-form-item>
            <el-form-item label="机构社团 :">{{event.orgName}}</el-form-item>
            <el-form-item label="状态 :" v-if="event.status">发布</el-form-item>
            <el-form-item label="状态 :" v-if="!event.status">保存</el-form-item>
            <br />
            <hr />
            <br />
            
                <div v-html="event.description" class="markdown-body">
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
  name: "eventDetails",

  data() {
    return {
      pictures: [],
      event: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchEvents(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchEvents(id) {
      //请求数据，然后赋值给event
      this.axios.get("/activity/" + id).then(response => {
        console.log(response.data.data);
        this.event = response.data.data;
        // this.event.description = marked(this.event.description);
        this.pictures = this.event.pictures.split("|");
      });
    },
    //返回活动主页面
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/activity" });
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