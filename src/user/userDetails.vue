<!--
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-11-03 19:53:58
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-11-04 11:20:41
 -->


<template>
  <div>
    <!-- 设置详情页页头 -->
    <div>
      <el-page-header style="color: #409eff;" @back="goBack"></el-page-header>
      <br />
    </div>
    <div class="details container">
      <el-card class="box-card" style="width: 50%; height: 100%; margin: 40px auto;">
        
        <el-form
          label-position="left"
          ref="member"
          label-width="150px"
          style="color:#333; margin: 40px 100px;"
        >
          <div class="well">
            <div
          style="text-align: center; font-size: 20px; color: #333; padding: 0 20px; color: #333"
        >
          <span>{{member.name}}</span>
          
        </div><br />
            <el-form-item label="学号 :">{{member.no}}</el-form-item>
            <el-form-item label="性别 :">
               <span v-if="member.sex">男</span>
              <span v-else>女</span>
            </el-form-item>
            <el-form-item label="电话 :">{{member.phone}}</el-form-item>
            <el-form-item label="邮箱 :">{{member.email}}</el-form-item>
             <el-form-item label="专业 :">{{member.specialtyName}}</el-form-item>
            
          </div>
        </el-form>
      </el-card>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  name: "membersDetails",

  data() {
    return {
      member: ""
    };
  },

  created() {
    //一开始就获取对应id的数据展示
    this.fetchmembers(this.$route.params.id);
  },

  methods: {
    //获取对应id信息的数据
    fetchmembers(id) {
      //向本地接口中请求数据，然后赋值给member
      this.axios.get("/user/" + id).then(response => {
        //console.log(response);
        this.member = response.data.data;
       
      });
    },

    goBack() {
      // console.log("aa");
      this.$router.push({ path: "/user" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component 

only -->
<style scoped lang="scss">
@import 'userDetails.scss'

</style>