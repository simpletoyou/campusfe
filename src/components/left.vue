<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-22 21:32:23
 -->

<template>
  <div style="position: relative; height: 100%; ">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="iscollapse"
      router
    >
      <el-menu-item index="1" route="/activity">
        <i class="el-icon-notebook-1"></i>
        <span slot="title" style="color:#606266">活动管理</span>
      </el-menu-item>
      <el-menu-item index="2" route="/organization">
        <i class="el-icon-notebook-2"></i>
        <span slot="title" style="color:#606266">组织管理</span>
      </el-menu-item>
      <el-menu-item index="3" route="/lost">
        <i class="el-icon-shopping-bag-1"></i>
        <span slot="title" style="color:#606266">失物招领管理</span>
      </el-menu-item>
      <el-menu-item index="4" route="/second_hand">
        <i class="el-icon-box"></i>
        <span slot="title" style="color:#606266">二手商品管理</span>
      </el-menu-item>
      <el-menu-item index="5" route="/banner">
        <i class="el-icon-picture-outline"></i>
        <span slot="title" style="color:#606266">轮播图管理</span>
      </el-menu-item>
      <el-menu-item index="6" route="/icon">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title" style="color:#606266">图标管理</span>
      </el-menu-item>
    </el-menu>
    <div>
      <i
        class="arrow"
        :class="iscollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"
        @click="iscollapse = !iscollapse"
      ></i>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      iscollapse: false
    };
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
}
.arrow {
  position: absolute;
  left: calc(50% - 12px);
  top: 350px;
  width: 25px;
  height: 25px;
  color: rgb(53, 51, 51);
  font-size: 25px;
}
span {
  font-size: 16px;
}
</style>