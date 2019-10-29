<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:32
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-30 20:40:39
 -->

<template>
  <div>
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <div class="details container">
      <el-card class="box-card" style="width: 80%; height: 100%; margin: 0 auto;">
        <div
          slot="header"
          class="clearfix"
          style="text-align: center; font-size: 20px; color: #333; padding: 0 20px;"
        >
          <span>{{good.title}}</span>
          <div style="color: #707377; font-size: 12px;">
            <span style="float: left">状态 :{{good.status}}</span>
            <span style="float: right">发布时间 :{{moment(good.pubTime).format('YYYY-MM-DD')}}</span>
          </div>
        </div>
        <el-form
          label-position="left"
          ref="good"
          label-width="150px"
          style="color:#333; margin: 0 100px;"
        >
          <div class="well">
            <el-form-item label="售购类型 :">{{good.type}}</el-form-item>
            <el-form-item label="价格 :">{{good.price}}</el-form-item>
            <el-form-item label="描述信息 :">{{good.desc}}</el-form-item>
            <el-form-item label="联系人 :">{{good.person}}</el-form-item>
            <el-form-item label="联系方式 :">{{good.phone}}</el-form-item>
            <el-form-item label="物品图片："></el-form-item>
            <div v-for="(item, index) in pictures" :key="index">
              <el-image
                style="width: 650px; height: 500px; margin: 0 auto"
                :src="axios.defaults.baseURL+item"
              ></el-image>
            </div>
          </div>
        </el-form>
      </el-card>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsDetails",

  data() {
    return {
      pictures: [],
      good: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchgoods(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchgoods(id) {
      //向本地接口中请求数据，然后赋值给good
      this.axios.get("/secondHand/" + id).then(response => {
        //console.log(response);
        this.good = response.data.data;
        this.pictures = this.good.pictures.split("|");
        console.log(this.pictures);
        // console.log(this.good);
      });
    },

    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/second_hand" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component 

only -->
<style scoped lang="scss">
@import 'secondDetails.scss'

</style>