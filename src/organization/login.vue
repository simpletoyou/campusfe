<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 20:01:29
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-30 21:40:34
 -->
<template>
  <div id="login">
    <el-form class="login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" placeholder="账号" v-model="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="password"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="buttonColor" type="default" style="width:100%;" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      username: ""
    };
  },
  methods: {
    handleSubmit() {
      var admin = {
        username: this.username,
        password: this.password
      };
      this.axios.post("/admin/login", this.qs.stringify(admin)).then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
            this.$message({
            type: "success",
            message: "欢迎来到校园58管理平台！"
          }); 
          this.$router.push({ path: "/main" });
        } else {
          this.$message({
            type: "danger",
            message: res.data.data
          }); 
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import 'login.scss'

</style>