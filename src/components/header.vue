<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-24 11:10:47
 -->
<template>
  <div
    style="padding: 0 20px; background-color: #409EFF; display:flex; algin-items: center; justify-content: space-between"
  >
    <div style="color: #fff; font-size: 25px; letter-spacing: 5px;padding-top: 10px;padding-buttom: 10px">
      <el-button style="background: #409EFF; color: #fff; font-size: 24px; border: 0 solid #409EFF" 
      @click="handleBack">校园58</el-button>
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#409EFF"
      text-color="#fff"
      router
    >
      <!-- <el-menu-item index="1">我的消息</el-menu-item> -->
      <el-submenu index="1">
        <template slot="title">个人中心</template>
        <el-menu-item index="1-1" route="/myTeam">我的成员</el-menu-item>
        <!-- <el-menu-item index="1-2" route="/editInfo">修改资料</el-menu-item> -->
        <el-menu-item @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {

    handleBack(){
      //返回直接到系统活动管理模块页面
      this.$router.push("/activity")
    },

    handleLogout() {
      //console.log('this is logout');
      this.axios.delete("/logout").then(response => {
        //console.log(response.data);
        if (response.data.code === 0) {
          this.$message({
            type: "info",
            message: "已退出登录！"
          });
          this.$router.push("/organization/login");
        } else {
          this.$message({
            type: "danger",
            message: " 退出失败！"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
</style>