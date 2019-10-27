<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:43:30
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-18 09:07:37
 -->


<template>
  <div class="editLcon container">
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
            <el-input v-model="thing.title" style="width:400px;"></el-input>
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
            <el-button type="primary" @click="updatething">确定修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "editLost",
  data() {
    return {
      thing: {},
      alert: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/lost" });
    },
    //获取用户信息展示的方法,参数是id,通过id传入对应的信息，方便修改
    fetchthing(id) {
      this.axios.get("/lost/" + id).then(response => {
        // console.log(response)
        this.thing = response.body.data;
      });
    },
    //修改用户信息的方法
    updatething(e) {
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

        //修改用户信息后，put到接口数据中，并跳转到主页，传递alert内容
        this.axios
          .put("/lost/" + this.$route.params.id, newthing)
          .then(response => {
            // console.log(response);
            this.$router.push({
              path: "/lost",
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
    this.fetchthing(this.$route.params.id);
  }, //组件注册
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>