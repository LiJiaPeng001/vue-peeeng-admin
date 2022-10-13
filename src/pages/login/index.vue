<template>
  <div class="login-container">
    <ul class="circles">
      <li v-for="n in 10" :key="n"></li>
    </ul>
    <div class="login-wrap">
      <img class="logo" :src="logo" />
      <a-form ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="form-model" :model="forms" :rules="rules" @finish="onSubmit">
        <a-form-item name="username">
          <a-input v-model:value="forms.username" size="large" placeholder="请输入账号">
            <template #prefix>
              <UserOutlined></UserOutlined>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="forms.password" size="large" placeholder="请输入密码">
            <template #prefix>
              <LockFilled></LockFilled>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button size="large" style="width: 100%" type="primary" :loading="loading" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockFilled } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import user from "~/store/user";

let router = useRouter();
let { logo } = useLocalImage();
let userStore = user();
let loading = ref(false);

let labelCol = { span: 0 };
let wrapperCol = { span: 24 };
let forms = ref({
  username: "admin",
  password: "admin",
});
let form = ref();
let rules = ref({
  username: [
    {
      required: true,
      message: "请输入账号",
    },
  ],
  password: [{ required: true, message: "请输入密码" }],
});

let onSubmit = async () => {
  await form.value.validate();
  loading.value = true;
  let { name } = await userStore.login(forms.value).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  loading.value = false;
  notification.success({
    message: "登录成功",
    description: `欢迎回来，${name}`,
  });
  router.replace("/dashboard");
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
  background-size: 100%;
}
.form-model {
  width: 336px;
}
.login-wrap {
  position: relative;
  z-index: 1;
  margin-bottom: 70px;
  .logo {
    margin: 0 auto 40px;
    display: block;
    width: 80px;
    height: 80px;
  }
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
}
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: #fff;
    animation: animate 25s linear infinite;
    bottom: -200px;
    @keyframes animate {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }
      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
      }
    }
    &:nth-child(1) {
      left: 15%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      left: 5%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
    }
    &:nth-child(3) {
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
    }
    &:nth-child(5) {
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
    }
    &:nth-child(6) {
      left: 75%;
      width: 150px;
      height: 150px;
      animation-delay: 3s;
    }
    &:nth-child(7) {
      left: 35%;
      width: 200px;
      height: 200px;
      animation-delay: 7s;
    }
    &:nth-child(8) {
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
    }
    &:nth-child(9) {
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
    }
    &:nth-child(10) {
      left: 85%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 11s;
    }
  }
}
</style>
