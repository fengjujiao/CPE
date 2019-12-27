<template>
  <div class="wchc h100vh bg3489c9">
    <div class="wcAll">
      <img src="../assets/img/logo2.png" alt />
      <p class="loginTitle">员工工作状态管理平台</p>
      <el-form ref="form" :model="form" class="w16rem">
        <el-form-item label>
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="form.passWord"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w100pre" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        userName: "",
        passWord: ""
      }
    };
  }
};
</script>

<style scoped>
</style>