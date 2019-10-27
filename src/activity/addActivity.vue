<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:40:11
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-21 09:26:57
 -->
<template>
  <div class="addActivity container">
    <!-- 设置详情页页头，添加页面返回 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <!-- 必填信息未填写时弹窗提醒 -->
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <!-- 添加活动页面主体 -->
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="event" :model="event" label-width="130px">
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
            <el-button type="primary" @click="addEvent">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import Alert from "@/organization/Alert";

export default {

  name: "addActivity",

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
    
    addEvent(e) {
      //console.log("this is addActivity");
      if (!this.event.description || !this.event.title) {
        this.alert = "请添加对应的信息！";
      } else {
        //console.log("this is newevent");
        let newevent = {
          id: this.event.id,
          orgId: this.event.orgId,
          title: this.event.title,
          pictures: this.event.pictures,
          description: this.event.description,
          startTime: this.event.startTime,
          endTime: this.event.endTime,
          num: this.event.num,
          fullRole: this.event.fullRole,
          orgName: this.event.orgName,
          status: this.event.status
        };

        this.axios.post("/activity", newevent).then(response => {
          //console.log(response);
          this.$router.push({
            path: "/activity",
            query: { alert: "活动信息添加成功！" }
          });
        });
        e.preventDefault();
      }
      e.preventDefault();
    }
  },
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>