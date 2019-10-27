<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:44
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-17 21:33:25
 -->

<template>
  <div class="addSecond container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
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
            <el-button type="primary" @click="addgood">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "addGood",
  data() {
    return {
      good: {},
      alert: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/good" });
    },
    addgood(e) {
      if (!this.good.title || !this.good.person) {
        //console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        //console.log('this is newgood');
        let newgood = {
          id: this.good.id,
          user_id: this.good.user_id,
          type_id: this.good.type_id,
          title: this.good.title,
          person: this.good.person,
          desc: this.good.desc,
          pub_time: this.pub_time,
          person: this.good.person,
          price: this.good.price,
          pictures: this.good.pictures,
          phone: this.good.phone,
          status: this.good.status,
          type: this.good.type
        };

        this.axios.post("/good", newgood).then(response => {
          //console.log('response??????');
          //console.log(response);
          this.$router.push({
            path: "/good",
            query: { alert: "活动信息添加成功！" }
          });
        });
        e.preventDefault();
      }
      e.preventDefault();
    }
  },
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>