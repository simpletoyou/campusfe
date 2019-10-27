<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:43:20
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-18 08:47:45
 -->


<template>
  <div class="addLost container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="thing" :model="thing" label-width="130px">
        <!-- <el-form v-on:submit="updatething"> -->
        <div class="well">
          <el-form-item label="发布标题 :">
            <el-input v-model="thing.title" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="联系地址 :">
            <el-input v-model="thing.addr" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="联系人 :">
            <el-input v-model="thing.person" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="描述信息 :">
            <el-input v-model="thing.description" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="发布日期 :">
            <el-input v-model="thing.pubTime" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图片 :">
            <el-input v-model="thing.pictures" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式 :">
            <el-input v-model="thing.phone" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="状态 :">
            <el-input v-model="thing.status" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="失物/拾物">
            <el-input v-model="thing.type" style="width: 400px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addthing">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "addThing",
  data() {
    return {
      thing: {},
      alert: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/thing" });
    },
    addthing(e) {
      if (!this.thing.title || !this.thing.person) {
        //console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        console.log("this is newthing");
        let newthing = {
          title: this.thing.title,
          addr: this.thing.addr,
          person: this.thing.person,
          description: this.thing.description,
          pubTime: this.thing.pubTime,
          pictures: this.thing.pictures,
          phone: this.thing.phone,
          status: this.thing.status,
          type: this.thing.type
        };

        this.axios.post("/thing", newthing).then(response => {
          //console.log('response??????');
          console.log(response);
          this.$router.push({
            path: "/thing",
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