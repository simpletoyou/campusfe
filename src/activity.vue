<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:58:52
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-30 21:01:01
 -->
<template>
  <div class="events container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="events" style="width: 99.5%; ">
      <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column prop="title" label="标题" width="220" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="leaderList[0].userName" label="活动负责人" width="160"></el-table-column>
      <!-- <el-table-column label="描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-html="scope.row.description"></span>
        </template>
      </el-table-column> -->
      <el-table-column prop="pubTime" label="活动发布时间" width="150" :show-overflow-tooltip="true">
        {{moment(pubTime).format('YYYY-MM-DD')}}
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            style="width: 170px;padding-left: 0px;padding-right: 0px;"
            v-model="search"
            size="small"
            placeholder="请输入标题关键字"
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
  name: "events",
  data() {
    return {
      events: [],
      alert: "",
      search: "",
      currentPage: 1,
      pagesize: 8, //默认每页8条数据,
      total: 0
    };
  },
  methods: {
    handleDetails(index, rowdata) {
      this.$router.push({ path: "/activityDetails/" + rowdata.id });
    },

    //对活动信息的修改功能，该功能已被移除，不实现
    /*  handleEdit(index, rowdata) {
      this.$router.push({ path: "/editActivity/" + rowdata.id });
    }, */

    handleDelete(index, rowdata) {
      //删除对应id的内容
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: "warning"
      })
        .then(() => {
          this.axios.delete("/activity/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchEvents();
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
    fetchEvents() {
      this.axios
        .get(
          "/activity/list?orgId=0&page=" +
            this.currentPage +
            "&limit=" +
            this.pagesize +
            "&searchTitle=" +
            this.search
        )
        .then(response => {
          if (response.data.code === 0) {
            this.events = response.data.data;
            this.total = response.data.totalElements;
            //console.log(response.data.data);
          }
        });
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      this.fetchEvents();
      //console.log(this.pagesize); //每页下拉显示数据
    },

    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.fetchEvents();
    },

    SearchCout() {
      this.fetchEvents();
    }
  },

  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }

    this.fetchEvents();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="scss">
@import '../src/mainScss/activity.scss'
</style>
