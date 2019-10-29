<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:57:51
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-04 08:51:16
 -->

<template>
  <div class="team container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="persons" style="width: 99.5%; ">
         <el-table-column prop="id" label="id" width="90px"></el-table-column>
      <el-table-column prop="no" label="学号" width="150px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200px;">
      </el-table-column>
       <el-table-column prop="phone" label="电话" width="200px"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200px;">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <div style="padding-right: 0px;">
            <el-button size="small" style="background-color:#409eff; ">
              <router-link v-bind:to="'/addTeam' " style=" color: #fff;font-size=16px;">添加成员</router-link>
            </el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            title="删除"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <br />
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "persons",
  data() {
    return {
      persons: [],
      alert: "",

    };
  },
  methods: {
    handleDelete(index, rowdata) {
      //删除对应id的内容
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: "warning"
      })
        .then(() => {
          this.axios.delete("/organization/user/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchpersons();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "danger",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!"
          });
        });
    },

    //获取数据的函数
    fetchpersons() {
      this.axios.get("/user/organization").then(response => {
        if (response.data.code === 0) {
          this.persons = response.data.data;
          this.total = response.data.totalElements;
          console.log(response.data.data);
        }
      });
    }
  },
  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchpersons();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="scss">
@import 'myTeam.scss'
</style>
