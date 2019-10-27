<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:40:11
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-23 19:51:12
 -->
<template>
  <div class="myTeam container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <br />
    <Alert v-if="alert" v-bind:message="alert"></Alert>

    <el-card style="width:60%;height: 300px;margin: 10px auto;">
      <div style="margin: 20px auto;">
        <el-input style="width: 80%; margin-left: 30px;" v-model="search" size="small" placeholder="请查找学号进行添加"></el-input>
        <el-button size="small" @click="SearchCout" style="background: #60aaf7;color: #FFF">查找</el-button>
      </div>

      <el-form label-width="80px" v-if="persons.no != ''">
        <el-form-item label="id :">{{persons.id}}</el-form-item>
        <el-form-item label="no :">{{persons.no}}</el-form-item>
            
      </el-form>
      <el-button style="margin: 0 280px; background: #60aaf7" size="mini" title="添加" type="primary" @click="handleAdd">添加</el-button>
    </el-card>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "addperson",
  data() {
    return {
      persons: {
        id: "",
        no: ""
      },
      personId: "",
      alert: "",
      search: ""
    };
  },
  methods: {
    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/myTeam" });
    },

    SearchCout() {
      this.fetchpersons();
    },

    fetchpersons() {
      this.axios.get("/user?no=" + this.search).then(response => {
        if (response.data.code === 0) {
          if (response.data.data.length > 0) {
            this.persons = response.data.data[0];
            this.$message({
              type: "success",
              message: "数据获取成功！"
            });
            this.$router.push("/myTeam")
          } else {
            this.$message({
              type: "warnning",
              message: "没有查询到数据！"
            });
          }
          console.log(response.data.data);
        } else {
          this.$message({
            type: "error",
            message: "数据获取失败！"
          });
        }
      });
    },

    handleAdd() {
      this.axios.post("/organization/user/" + this.persons.id).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败！"
          });
        }
      });
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