<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-18 00:47:28
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-24 10:41:08
 -->
<template>
  <div>
    <!-- 设置页面表头，返回组织主页面 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <el-card style="width:60%;height: 80%;margin: 20px auto;">
    <div style="margin-left: 100px;margin-top: 20px;">
      <el-form label-position="left" ref="organ" :model="organ" label-width="130px">
        <div class="well">
          <el-form-item label="组织： ">
            <el-cascader :props="props" :value="sola" @change="updateFathId" style="width:400px; "></el-cascader>
          </el-form-item>
          <el-form-item label="父级管理id :">{{organ.fathId}}</el-form-item>
          <el-form-item label="名称 :">
            <el-input v-model="organ.name" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="学院 :">
            <el-input v-model="organ.collage" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="登录名称 :">
            <el-input v-model="organ.loginName" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="密码 :">
            <el-input v-model="organ.loginPwd" style="width: 400px;"></el-input>
          </el-form-item>

          <el-form-item style="margin: 0 auto;">
            <el-button type="primary" @click="addorgan">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    </el-card>
  </div>
</template>
<script>
let id = 1;

export default {
  data() {
    return {
      organ: {
        fathId: ""
      },
      sola: "",
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.lazyLoad
      }
    };
  },
  methods: {
    
    goBack() {//返回活动主页面
      // console.log("aa");
      this.$router.push({ path: "/activity" });
    },

    addorgan() {
      if (
        this.organ.fathId === "" ||
        !this.organ.loginPwd ||
        !this.organ.loginName
      ) {
        this.$message({
          type: "error",
          message: "请补全信息！"
        });
        return;
      }

      this.axios.post("/organization", this.organ).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
          this.$router.push("/organization")
        } 
        else {
          this.$message({
            type: "error",
            message: "添加失败！"
          });
        }
        });
      },

      //获取父级管理id
    updateFathId(item) {
      this.axios.get("/organization/list/" + id).then(response => {
        /* console.log(item[item.length - 1]); */
        this.organ.fathId = item[item.length - 1];
      });
    },

    lazyLoad(node, resolve) {
      if (node.root != true) {
        id = node.data.value;
      }
      console.log(node);
      this.axios.get("/organization/list/" + id).then(response => {
        console.log(response.data.data);
        const nodes = Array.from(response.data.data).map(organ => ({
          value: organ.id,
          label: organ.name,
          leaf: false
        }));
        resolve(nodes);
      });
    }
  }
};
</script>

<style>
#app  {
  font-family: "Avenir",  Helvetica,  Arial,  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>