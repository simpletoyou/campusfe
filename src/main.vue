<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
<<<<<<< HEAD
 * @LastEditTime: 2019-10-30 21:39:37
=======
 * @LastEditTime: 2019-10-29 17:39:31
>>>>>>> a87141f006c80aa73f15d8e2282ee55ed3458d14
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
    /* this.$message({
      type: "success",
      message: "欢迎进入校园58管理平台！"
    }) */
  }
};
</script>

<style lang="scss">
@import '../src/mainScss/main.scss'
</style>
