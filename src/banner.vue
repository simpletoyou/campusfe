<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:57:51
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-03 17:59:31
 -->

<template>
  <div class="carouselCharts container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="carouselCharts" style="width: 99.5%; ">
      <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column prop="imgLink" label="缩略图示" width="120px;">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.imgLink" alt style="width:50px; height: 50px;" /> -->
          <el-image
            style="width:50px; height: 50px;"
            :src="axios.defaults.baseURL+scope.row.imgLink"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="imgLink" label="轮播图链接" min-width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="跳转链接" min-width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="是否启用" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.used"
            on-color="#00A854"
            off-color="#F04134"
            @change="changeSwitch(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <!-- <el-input
            style="width: 170px;padding-left: 0px;padding-right: 0px;"
            v-model="search"
            size="small"
            placeholder="请输入轮播图名称"
          ></el-input>-->
          <!-- <div style="padding-left: 0px;">
            <el-button
              type="submit"
              icon="el-icon-search"
              size="small"
              @click="SearchCout"
              style="background: #f0f7ff"
            ></el-button>
          </div>-->
          <div style="padding-right: 0px;">
            <el-button size="small" style="background-color:#409eff; ">
              <router-link v-bind:to="'/addBanner' " style=" color: #fff;font-size=16px;">添加轮播图</router-link>
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
    <!-- <div>
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
    </div> -->
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "carouselCharts",
  data() {
    return {
      carouselCharts: [],
      alert: "",
      search: "",
     /*  currentPage: 1,
      pagesize: 8, //默认每页2条数据,
      total: 0 */
    };
  },
  methods: {
    changeSwitch(rowdata) {
      //console.log(rowdata);
      this.axios.put("/banner", rowdata).then(response => {
        this.carouselCharts.used = rowdata.used;
        console.log(this.carouselCharts.used);
      });
    },
    handleDetails(index, rowdata) {
      this.$router.push({ path: "/bannerDetails/" + rowdata.id });
      //console.log(index, rowdata.id);
    },
    handleEdit(index, rowdata) {
      this.$router.push({ path: "/editBanner/" + rowdata.id });
      //console.log('rowdata');
      //console.log(index, rowdata.id);
    },
    handleDelete(index, rowdata) {
      //删除对应id的内容
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: "warning"
      })
        .then(() => {
          this.axios.delete("/banner/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchcarouselCharts();
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
    fetchcarouselCharts() {
      this.axios.get("/banner/all").then(response => {
        if (response.data.code === 0) {
          this.carouselCharts = response.data.data;
          this.total = response.data.totalElements;
          console.log(response.data.data);
        }
      });
    },

    /* handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
      this.fetchcarouselCharts();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.fetchcarouselCharts();
      console.log(this.currentPage); //点击第几页
    } */
    /* SearchCout() {
      this.fetchcarouselCharts();
    } */
  },
  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchcarouselCharts();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="scss">
@import '../src/mainScss/banner.scss'
</style>
