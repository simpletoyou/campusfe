<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
<<<<<<< HEAD
 * @LastEditTime: 2019-11-04 08:40:45
=======
 * @LastEditTime: 2019-10-29 17:13:28
>>>>>>> a87141f006c80aa73f15d8e2282ee55ed3458d14
 -->

<template>
  <div style="position: relative; height: 100%; ">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="iscollapse"
      router
    >
      
      <el-menu-item index="2" route="/organization">
        <i class="el-icon-notebook-2"></i>
        <span slot="title" style="color:#606266">组织管理</span>
      </el-menu-item>
       <el-menu-item index="7" route="/user">
        <i class="el-icon-user"></i>
        <span slot="title" style="color:#606266">用户管理</span>
      </el-menu-item>
      <el-menu-item index="1" route="/activity">
        <i class="el-icon-notebook-1"></i>
        <span slot="title" style="color:#606266">活动管理</span>
      </el-menu-item>
      <el-menu-item index="3" route="/lost">
        <i class="el-icon-shopping-bag-1"></i>
        <span slot="title" style="color:#606266">失物招领管理</span>
      </el-menu-item>
      <el-menu-item index="4" route="/second_hand">
        <i class="el-icon-box"></i>
        <span slot="title" style="color:#606266">二手商品管理</span>
      </el-menu-item>
       <el-menu-item index="6" route="/icon">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title" style="color:#606266">图标管理</span>
      </el-menu-item>
      <el-menu-item index="5" route="/banner">
        <i class="el-icon-picture-outline"></i>
        <span slot="title" style="color:#606266">轮播图管理</span>
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

<style lang="scss" scoped>
@import 'left.scss'
</style>