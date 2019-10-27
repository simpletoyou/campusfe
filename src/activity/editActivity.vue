<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:40:27
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-24 10:14:22
 -->
<template>
  <div class="editActivity container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <!-- 必填信息未填写完成时弹窗提醒 -->
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <!-- 编辑页主体 -->
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="event" :model="event" label-width="130px">
        <!-- <el-form v-on:submit="updateEvent"> -->
        <div class="well">
          <el-form-item label="活动标题 :">
            <el-input v-model="event.title" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="海报地址 :">
            <el-input v-model="event.pictures" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="描述信息与详情 :">
            <el-input
              type="textarea"
              :rows="4"
              maxlength="200"
              style="width: 400px;"
              show-word-limit
              v-model="event.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动发布日期 :">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="event.pubTime"
                style="width: 60%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="活动开始时间 :">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="event.startTime"
                style="width: 60%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="活动结束时间 :">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="event.endTime"
                style="width: 60%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="活动参与人数 :">
            <el-input v-model="event.num" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="活动参与者类型 :">
            <el-input v-model="event.fullRole" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="机构社团 :">
            <el-input v-model="event.orgName" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="状态 :">
            <el-input v-model="event.status" style="width: 400px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateEvent">确定修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import Alert from "@/organization/Alert";

export default {

  name: "editActivity",

  data() {
    return {
      event: {},
      alert: ""
    };
  },

  methods: {

    goBack() {//返回活动主页面
      // console.log("aa");
      this.$router.push({ path: "/activity" });
    },

    //获取活动信息
    fetchevent(id) {
      this.axios.get("/activity/" + id).then(response => {
      //   console.log(response.data.data)
        this.event = response.data.data;
      });
    },

    //修改活动信息(该功能已被移除！！！！)
    updateEvent(e) {

      //判断是否为空
        console.log(this.event);
      if (!this.event.title || !this.event.pictures) {
        console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        //修改信息后，put到接口数据中，并跳转到活动模块主页
        //console.log(this.event);
        this.axios.put("/activity", this.event).then(response => {
          if (response.data.code === 0) {
            this.$message({
              type: "success",
              message: "信息更新成功！"
            }
            );
            this.$router.push("/activity")
          } else {
            this.$message({
              type: "danger",
              message: "更新失败！"
            });
          }
          this.fetchevent(this.$route.params.id);
        });
        e.preventDefault();
      }
      e.preventDefault();
    }
  },

  created() {
    //一开始就根据对应id获取到信息展示
    this.fetchevent(this.$route.params.id);
  }, 
  
  //组件注册
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>