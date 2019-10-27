<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:32
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-21 16:55:01
 -->

<template>
  <div class="editSecond container">
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 800px; height: 800px;margin:20px auto;">
      <el-form label-position="left" ref="good" :model="good" label-width="130px">
        <!-- <el-form v-on:submit="updategood"> -->
        <div class="well">
          <el-form-item label="物品id :">
            <el-input v-model="good.id" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="标题 :">
            <el-input v-model="good.title" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="联系人 :">
            <el-input v-model="good.person" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="发布人id :">
            <el-input v-model="good.user_id" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="物品类型id :">
            <el-input v-model="good.type_id" style="width: 400px;"></el-input>
          </el-form-item>

          <el-form-item label="描述信息 :">
            <el-input v-model="good.desc" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="发布日期 :">
            <el-input v-model="good.pub_time" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="价格 :">
            <el-input v-model="good.price" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图片 :">
            <el-input v-model="good.pictures" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式 :">
            <el-input v-model="good.phone" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="状态 :">
            <el-input v-model="good.status" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="求购或出售 :">
            <el-input v-model="good.type" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updategood">确定修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "editgoods",

  data() {
    return {
      good: {},
      alert: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchgoods(this.$route.params.id);
  },

  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/second_hand" });
    },
    //获取用户信息展示的方法,参数是id,通过id传入对应的信息，方便修改
    fetchgood(id) {
      this.axios.get("/second_hand/" + id).then(response => {
        // console.log(response)
        this.good = response.body.data;
      });
    },
    //修改用户信息的方法
    updategood(e) {
      console.log("submit");
      if (!this.good.title || !this.good.person) {
        console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        let newgood = {
          id: this.good.id,
          user_id: this.good.user_id,
          type_id: this.good.type_id,
          title: this.good.title,
          person: this.good.person,
          desc: this.good.desc,
          pub_time: this.good.pub_time,
          person: this.good.person,
          price: this.good.price,
          pictures: this.good.pictures,
          phone: this.good.phone,
          status: this.good.status,
          type: this.good.type
        };

        //修改用户信息后，put到接口数据中，并跳转到主页，传递alert内容
        this.axios
          .put("/second_hand/" + this.$route.params.id, newgood)
          .then(response => {
            // console.log(response);
            this.$router.push({
              path: "/second_hand",
              query: { alert: "活动信息更新成功！" }
            });
          });
        e.preventDefault();
      }
      e.preventDefault();
    }
  },
  created() {
    //一开始就根据对应id获取到信息展示
    this.fetchgood(this.$route.params.id);
  }, //组件注册
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>