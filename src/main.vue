<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-24 11:08:12
 -->
<template>
  <div id="main" class="lostDetails">
    <template>
  <el-backtop :right="0" target=".lostDetails"></el-backtop>
</template>
    <myheader></myheader>
    <section style="display: flex; flex: 1;">
      <div style="background-color: fff">
        <myleft></myleft>
      </div>
      <article style="padding: 10px; flex: 1;">
        <router-view></router-view>
      </article>
    </section>
  </div>
</template>

<script>
import { myheader, myleft } from "./components";

export default {
  components: {
    myheader,
    myleft
  },
  data() {
    return {};
  },
  methods: {

  },
  created() {
    this.$message({
      type: "success",
      message: "欢迎进入校园58管理平台！"
    })
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: PingFang SC;
}
#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.lostDetails {
  height: 100vh;
  overflow-x: hidden;
}
</style>
