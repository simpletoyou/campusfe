<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-12 00:41:44
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-03 21:01:56
 -->

<template>
  <div class="addBanner container">
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <div style="width: 70%; height:25%;  margin: 20px auto;">
      <el-form label-position="left" ref="carouselChart" :model="carouselChart" label-width="130px">
        <!-- <el-form v-on:submit="updatecarouselChart"> -->
        <div class="well">
          <el-form-item label="轮播图： ">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadPicture"
              :file-list="fileList"
              :limit="1"
              :with-credentials="true"
              :before-remove="removePicture"
              show-file-list="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="color:#757272">(只能上传jpg/png文件，且不超过4MB)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片预览： ">
            <el-image style="width: 80%; height: 300px;" :src="axios.defaults.baseURL+carouselChart.imgLink">
              <div slot="error" class="image-slot" style="width: 80%; height: 80%; background-color: #f1ecec">
               <div style="padding:90px 160px;font-size: 18px;color:#757272"><i class="el-icon-picture-outline"></i>图片未上传</div>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="轮播图地址 :"><span v-if="carouselChart.imgLink !=''">{{axios.defaults.baseURL}}</span>{{carouselChart.imgLink}}</el-form-item>
          <el-form-item label="跳转链接 :">
            <el-input v-model="carouselChart.url" style="width: 400px;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="启用状态 :">
            <el-switch
              v-model="carouselChart.used"
              on-color="#00A854"
              off-color="#F04134"
          ></el-switch>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="addcarouselChart">确定添加</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Alert from "@/organization/Alert";
export default {
  name: "addBanner",
  data() {
    return {
      fileList: [],
      carouselChart: {
        imgLink: "",
        url: "",
        used: ""
      },
      alert: ""
    };
  },
  methods: {

    removePicture(file, fileList) {
      fileList = [];
      this.carouselChart.imgLink = "";
    },

    uploadPicture(files) {
      const isLt4M = files.size / 1024 / 1024 < 4;
      close(this.carouselChart)
      if (!isLt4M) {
        this.$message({
          type: "error",
          message: "图片过大，请重新上传！"
        });
        return false;
      }
      var param = new FormData();
      param.append("type", 5);
      param.append("file", files);

      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.axios.post("/file", param, config).then(response => {
        if (response.data.code === 0) {
          console.log(response.data);
          this.carouselChart.imgLink = response.data.data;
          this.fileList[0] = this.axios.defaults.baseURL + response.data.data;
          this.$message({
            type: "success",
            message: "图片上传成功！"
          });
        } else {
          this.$message({
            type: "error",
            message: "图片上传失败！您的图片过大..."
          });
          return false;
        }
      });
    },

    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/banner" });
    },

    addcarouselChart(e) {
      if (!this.carouselChart.imgLink || !this.carouselChart.url) {
        //console.log("请添加对应的信息！");
        this.alert = "请添加对应的信息！";
      } else {
        console.log("this is newcarouselChart");
        this.axios.post("/banner", this.carouselChart).then(response => {
          console.log(response);
          this.$router.push("/banner");
        });
        e.preventDefault();
      }
      e.preventDefault();
    }
  },

  components: {
    Alert
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>