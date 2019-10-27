<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:57:51
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-23 17:08:05
 -->

<template>
  <div class="team container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="persons" style="width: 100%; ">
         <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column prop="no" label="学号" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120px;">
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

<style scoped>
.container {
  position: relative;
}
.editStyle {
  height: 25px;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 23px;
  border-top-width: 0px;
  margin: 10px 5px;
  background-color: #fff;
  color: #606266;
  border: 1px #cccccc solid;
}
.delStyle {
  height: 25px;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 23px;
  border-top-width: 0px;
  margin: 10px 5px;
  background-color: #409eff;
  color: #fff;
  border: 1px #cccccc solid;
  border-radius: 4px;
}
.delStyle:hover {
  text-decoration: underline;
}

.titleLinkStyle {
  font-size: 16px;
  color: #41484f;
}
.btnperson {
  color: rgb(54, 53, 50);
  position: relative;
  padding-top: 16px;
}
.tdStyle {
  padding-bottom: 0px;
  padding-top: 0px;
}
.hoverStyle:hover {
  color: #3399cc;
  text-decoration: underline;
  box-shadow: 0px 5px 5px #a7a1a1;
}
</style>
