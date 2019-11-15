<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:58:05
 * @LastEditors: 陈楚华
<<<<<<< HEAD
 * @LastEditTime: 2019-10-30 21:07:59
=======
 * @LastEditTime: 2019-10-29 17:39:38
>>>>>>> a87141f006c80aa73f15d8e2282ee55ed3458d14
 -->

<template>
  <div class="things container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="things" style="width: 99.5%; ">
      <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <!-- <el-table-column prop="description" label="描述" width="200"></el-table-column> -->
      <el-table-column prop="person" label="联系人" width="200"></el-table-column>
      <el-table-column prop="addr" label="联系地址" width="200" :show-overflow-tooltip="true"></el-table-column>

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
        :page-sizes="[8, 10, 20, 40]"
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
      pagesize: 8, //默认每页8条数据,
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

<style scoped lang="scss">
@import '../src/mainScss/lost.scss'
</style>
