
<template>
  <div class="second container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <el-table :data="members" style="width: 99.5%; " >
      <el-table-column prop="id" label="id" width="96"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="no" label="学号" width="200">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="200"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="200"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            style="width: 160px;padding-left: 0px;padding-right: 0px;"
            v-model="search"
            size="small"
            placeholder="请输入用户名称"
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
  name: "members",
  data() {
    return {
      members: [],
      alert: "",
      search: "",
      currentPage: 1,
      pagesize: 8, //默认每页8条数据,
      total: 0
    };
  },
  methods: {
    handleDetails(index, rowdata) {
      this.$router.push({ path: "/user/" + rowdata.id });
      //console.log(index, rowdata.id);
    },
    /* handleEdit(index, rowdata) {
      this.$router.push({ path: "/editSecond/" + rowdata.id });
      //console.log('rowdata');
      //console.log(index, rowdata.id);
    }, */
    handleDelete(index, rowdata) {
      //删除对应id的内容
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: "warning"
      })
        .then(() => {
          this.axios.delete("/user/" + rowdata.id).then(response => {
            if (response.data.code === 0) {
              this.fetchmembers();
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
    fetchmembers() {
      console.log("this is fetch members");
      this.axios
        .get(
          "/user/blurry?" +
            "limit=" +
            this.pagesize +
            "&page=" +
            this.currentPage +
            "&input=" +
            this.search
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code === 0) {
            this.members = response.data.data;
            console.log(this.members);
            this.total = response.data.totalElements;
          }
        });
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      //console.log(this.pagesize); //每页下拉显示数据
      this.fetchmembers();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
     // console.log(this.currentPage); //点击第几页
     this.fetchmembers();
    },
    SearchCout() {
      this.fetchmembers();
    }
  },

  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchmembers();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="scss">
@import '../src/mainScss/second_hand.scss'

</style>
