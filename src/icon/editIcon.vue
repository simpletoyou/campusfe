<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:44
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-18 08:48:29
 -->

<template>
  <div class="editIcon container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 800px; height: 800px;  margin: 20px auto;">
      <el-form label-position="left" ref="picture" :model="picture" label-width="130px">
        <!-- <el-form v-on:submit="updatepicture"> -->
        <div class="well">
          <el-form-item label="图标名称 :">
            <el-input v-model="picture.iconName" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图标地址 :">
            <el-input v-model="picture.iconLink" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="图标描述 :">
            <el-input v-model="picture.url" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addpicture">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "editicon",
  data() {
    return {
      picture: {},
      alert: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/icon" });
    },
    //获取用户信息展示的方法,参数是id,通过id传入对应的信息，方便修改
    fetchpicture(id) {
      this.axios.get("/icon/" + id).then(response => {
        // console.log(response)
        this.picture = response.body.data;
      });
    },
    //修改用户信息的方法
    updatepicture(e) {
      console.log("submit");
      if (
        !this.picture.iconName ||
        !this.picture.iconLink ||
        !this.picture.desc
      ) {
        // console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        let newpicture = {
          id: this.picture.id,
          iconName: this.picture.iconName,
          iconLink: this.picture.iconLink,
          desc: this.picture.desc
        };

        //修改用户信息后，put到接口数据中，并跳转到主页，传递alert内容
        this.axios
          .put("/icon/" + this.$route.params.id, newpicture)
          .then(response => {
            // console.log(response);
            this.$router.push({
              path: "/icon",
              query: { alert: "活动信息更新成功！" }
            });
          });
        e.preventChartDefault();
      }
      e.preventChartDefault();
    }
  },
  created() {
    //一开始就根据对应id获取到信息展示
    this.fetchpicture(this.$route.params.id);
  }, //组件注册
  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>