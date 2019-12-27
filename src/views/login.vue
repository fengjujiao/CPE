<template>
  <div id="loginbox">
    <div class="loginBgD">
      <div class="wcAll loginD">
      <div class="headrbox">
        <p><img src="../assets/img/logo_01.png"  alt /></p>
        <div class="psam">
          <p>中国石油工程建设有限公司西南分公司</p>
          <p class="EgName">China Petroleum Engineering & Construction Corp. Southwest Company</p>
        </div>
        </div>

      <p class="loginTitle">员工工作状态管理平台</p>
      <div class="disF loginMsgD">
        <img src="../assets/img/loginCL.png" class="mr5" alt />
        <el-form ref="form" :model="form" class="w16rem">
          <el-form-item label>
            <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="form.loginName"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              v-model="form.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="goHome" class="w100pre" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        loginName: "",
        password: ""
      }
    };
  },
  created(){
  },
  mounted(){
    this.onkeydown()
  },

  methods: {
    // todo 提交填报数据
    async systemLogin() {
      let param = this.form;
      let { data } = await this.axios.post("/api/system/login", param);
      if (data.code == 0) {
        this.$router.push({
          name: "fillArea"
        });
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        let user = JSON.stringify(data.data);
        sessionStorage.setItem("user", user);
      }else{
        this.$message.error(data.msg);
      }
      console.log(data, 99);
    },
    goHome() {
      this.systemLogin();
    },
    onkeydown() {
      let that = this;
      document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
        console.log(that.$route.name);
      if(keycode == 13){
        if(that.$route.name=='login'){
          that.goHome()
        }
      }
    };
    }
  }
};
</script>
<style scoped>


</style>

