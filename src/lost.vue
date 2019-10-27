<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:58:05
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-22 12:19:31
 -->

<template>
  <div class="things container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="things" style="width: 100%; ">
      <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="desc" label="描述" width="200"></el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            style="width: 170px;padding-left: 0px;padding-right: 0px;"
            v-model="search"
            size="small"
            placeholder="在此输入"
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
          <!-- <div style="padding-right: 0px;">
            <el-button size="small" style="background-color:#409eff; ">
              <router-link v-bind:to="'/addlost' " style=" color: #fff;font-size=16px;">添加发布</router-link>
            </el-button>
          </div>-->
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
  name: "things",
  data() {
    return {
      things: [],
      alert: "",
      search: "",
      currentPage: 1,
      pagesize: 2, //默认每页2条数据,
      total: 0
    };
  },
  methods: {
    handleDetails(index, rowdata) {
      this.$router.push({ path: "/lostDetails/" + rowdata.id });
      //console.log(index, rowdata.id);
    },
    handleEdit(index, rowdata) {
      this.$router.push({ path: "/editLost/" + rowdata.id });
      //console.log('rowdata');
      //console.log(index, rowdata.id);
    },
    handleDelete(index, rowdata) {
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancleButtonText: "取消"
      })
        .then(() => {
          this.axios.delete("/lost/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchthings();
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            } else {
              this.$message({
                type: "danger",
                message: "删除失败！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！"
          });
        });
    },

    //获取数据的函数
    fetchthings() {
      this.axios
        .get(
          "/lost/list?" +
            "page=" +
            this.currentPage +
            "&limit=" +
            this.pagesize +
            "&searchTitle=" +
            this.search
        )
        .then(response => {
          if (response.data.code === 0) {
            this.things = response.data.data;
            this.total = response.data.totalElements;
          }
        });
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      this.fetchthings();
      //console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //console.log(this.currentPage); //点击第几页
      this.fetchthings();
    },
    SearchCout() {
      this.fetchthings();
    }
  },

  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchthings();
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
.btnthing {
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
