<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 20:01:29
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-21 17:17:44
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
          /*  this.$message({
            type: "success",
            message: "登录成功！"
          }); */
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
<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.buttonColor {
  background-color: rgb(96, 148, 201);
  color: #f8f7f7;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #3f4347;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>