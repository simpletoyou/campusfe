<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-10 11:34:29
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-03 21:05:03
 -->

<template>
  <div class="organs container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="organs" style="width: 99.5%; ">
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="name" label="名称" min-width="50" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="intro" label="介绍" min-width="50" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="collage" label="学院" min-width="50" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            style="width: 170px;padding-left: 0px;padding-right: 0px;"
            v-model="search"
            size="small"
            placeholder="请输入名称关键字"
          ></el-input>
          <div style="padding-left: 0px;">
            <el-button
              type="submit"
              icon="el-icon-search"
              size="small"
              @click="SearchCout"
              style="background: #f0f7ff"
            ></el-button>
          </div>
          <div style="padding-right: 0px;">
            <el-button size="small" style="background-color:#409eff; ">
              <router-link v-bind:to="'/addOrgan' " style=" color: #fff;font-size=16px;">添加组织</router-link>
            </el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            title="详情"
            type="info"
            plain
            @click="handleDetails(scope.$index, scope.row)"
          >···</el-button>
          <!-- <el-button
            size="mini"
            title="编辑"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>-->
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
    <!-- 设置分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 8, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, next, jumper"
        :total="total"
        style="display: flex; justify-content: center"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "organs",
  data() {
    return {
      organs: [],
      alert: "",
      search: "",
      currentPage: 1,
      pagesize: 8, //默认每页2条数据,
      total: 0
    };
  },
  methods: {
    handleDetails(index, rowdata) {
      this.$router.push({ path: "/organDetails/" + rowdata.id });
      //console.log('rowdata');
      console.log(index, rowdata.id);
    },
    /* handleEdit(index, rowdata) {
      this.$router.push({ path: "/editOrgan/" + rowdata.id });
      //console.log('rowdata');
      console.log(index, rowdata.id);
    }, */
    /* handleSearch(index, rowdata) {
      console.log(index, rowdata);
    },*/
    handleDelete(index, rowdata) {
      //删除对应id的内容
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: "warning"
      })
        .then(() => {
          this.axios.delete("/organization/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchorgans();
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
    fetchorgans() {
      this.axios
        .get(
          "/organization?page=" +
            this.currentPage +
            "&limit=" +
            this.pagesize +
            "&name=" +
            this.search
        )
        .then(response => {
          if (response.data.code === 0) {
            this.organs = response.data.data;
            this.total = response.data.totalElements;
            console.log(response.data.data);
          }
        });
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      this.fetchorgans();
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.fetchorgans();
    },
    SearchCout() {
      this.fetchorgans();
    }
  },

  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchorgans();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="scss">
@import '../src/mainScss/organization.scss'
</style>
