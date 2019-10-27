<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:40:27
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-21 15:46:06
 -->
<template>
  <div class="editorganization container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>

    <Alert v-if="alert" v-bind:message="alert"></Alert>

    <!-- 组织编辑页（表单） -->
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="organ" :model="organ" label-width="130px">
        <!-- <el-form v-on:submit="updateorgan"> -->
        <div class="well">
          <el-form-item label="介绍 :">
            <el-input v-model="organ.intro" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="名称 :">
            <el-input v-model="organ.name" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="学院 :">
            <el-input v-model="organ.collage" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图标地址 :">
            <el-input v-model="organ.logoLink" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="登录名称 :">
            <el-input v-model="organ.loginName" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="密码 :">
            <el-input v-model="organ.loginPwd" style="width: 400px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateorgan">确定修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "editorgan",

  data() {
    return {
      organ: {},
      alert: ""
    };
  },

  methods: {
    //返回上一级
    goBack() {
      this.$router.push({ path: "/organization" });
    },

    //参数是id,通过id传入对应的信息，获取该id组织信息
    fetchorgan(id) {
      console.log(id);
      this.axios.get("/organization/" + id).then(response => {
        console.log(response.data.data);
        this.organ = response.data.data;
        this.organ.loginPwd = "";
      });
    },
    //修改该组织信息
    updateorgan(e) {
      //判断是否为空
        console.log(this.organ);
      if (!this.organ.name || !this.organ.intro) {
        console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        //修改用户信息后，put到接口数据中，并跳转到组织主页，传递alert内容
        console.log(this.organ);
        console.log("-------------------");
        this.axios.put("/organization", this.organ).then(response => {
          if (response.data.code === 0) {
            this.$message({
              type: "success",
              message: "信息更新成功！"
            });
          } else {
            this.$message({
              type: "danger",
              message: "更新失败！"
            });
          }
          this.fetchorgan(this.$route.params.id);
        });
        e.preventDefault();
      }
      e.preventDefault();
      
    }
    
  },
  created() {
    //一开始就根据对应id获取到信息展示
    this.fetchorgan(this.$route.params.id);
  }, //组件注册
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>