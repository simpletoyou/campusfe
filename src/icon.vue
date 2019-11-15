<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-11 16:57:51
 * @LastEditors: 陈楚华
<<<<<<< HEAD
 * @LastEditTime: 2019-11-04 08:43:03
=======
 * @LastEditTime: 2019-10-29 17:39:46
>>>>>>> a87141f006c80aa73f15d8e2282ee55ed3458d14
 -->

<template>
  <div class="pictures container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="pictures" style="width: 99.5%; margin-top: 10px;">
      <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column prop="iconLink" label="缩略图示" width="150px;">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.iconLink" alt style="width:50px; height: 50px;" /> -->
          <el-image
            style="width:50px; height: 50px;"
            :src="axios.defaults.baseURL+scope.row.iconLink"
          ></el-image>
        </template>
      </el-table-column>
       <el-table-column prop="iconName" label="图标名称" min-width="50" align="center"></el-table-column>
       <el-table-column prop="description" label="图标简介" min-width="100" align="center"></el-table-column>
      <el-table-column prop="iconLink" label="图标链接" min-width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <!-- <el-input
            style="width: 170px;padding-left: 0px;padding-right: 0px;"
            v-model="search"
            size="small"
            placeholder="请输入图标名称"
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
           <!--  <el-button size="small" style="background-color:#409eff; ">
              <router-link v-bind:to="'/addicon' " style=" color: #fff;font-size=16px;">添加图标</router-link>
            </el-button> -->
          </div>
        </template>
        <template slot-scope="scope">
         <!--  <el-button
            size="mini"
            title="详情"
            type="info"
            plain
            @click="handleDetails(scope.$index, scope.row)"
          >···</el-button> -->
          <!-- <el-button
            size="mini"
            title="编辑"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>-->
          <!-- <el-button
            size="mini"
            title="删除"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button> -->
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
  name: "pictures",
  data() {
    return {
      pictures: [],
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
      this.axios.put("/icon", rowdata).then(response => {
        this.pictures.used = rowdata.used;
        console.log(this.pictures.used);
      });
    },
   /*  handleDetails(index, rowdata) {
      this.$router.push({ path: "/iconDetails/" + rowdata.id });
      //console.log(index, rowdata.id);
    }, */
    /* handleEdit(index, rowdata) {
      this.$router.push({ path: "/editIcon/" + rowdata.id });
      //console.log('rowdata');
      //console.log(index, rowdata.id);
    }, */
    /* handleDelete(index, rowdata) {
      //删除对应id的内容
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: "warning"
      })
        .then(() => {
          this.axios.delete("/icon/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchpictures();
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
    }, */

    //获取数据的函数
    fetchpictures() {
      this.axios.get("/icon").then(response => {
        if (response.data.code === 0) {
          this.pictures = response.data.data;
          this.total = response.data.totalElements;
          console.log(response.data.data);
        }
      });
    },

    /* handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
      this.fetchpictures();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.fetchpictures();
      console.log(this.currentPage); //点击第几页
    } */
    /* SearchCout() {
      this.fetchpictures();
    } */
  },
  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchpictures();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="scss">
@import '../src/mainScss/icon.scss'
</style>
