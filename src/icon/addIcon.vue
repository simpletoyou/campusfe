<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:44
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-17 20:29:49
 -->

<template>
  <div class="addIcon container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="picture" :model="picture" label-width="130px">
        <!-- <el-form v-on:submit="updatepicture"> -->
        <div class="well">
          <el-form-item label="图标名称 :">
            <el-input v-model="picture.iconName" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图标地址 :">
            <el-input v-model="picture.iconLink" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图标描述 :">
            <el-input v-model="picture.url" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addpicture">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "addBanner",
  data() {
    return {
      picture: {},
      alert: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/icon" });
    },
    addpicture(e) {
      if (
        !this.picture.iconName ||
        !this.picture.iconLink ||
        !this.picture.url
      ) {
        //console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        console.log("this is newpicture");
        let newpicture = {
          iconName: this.picture.iconName,
          iconLink: this.picture.iconLink
        };

        this.axios.post("/icon", newpicture).then(response => {
          //console.log('response??????');
          console.log(response);
          this.$router.push({
            path: "/icon",
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