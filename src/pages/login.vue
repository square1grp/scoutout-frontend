<template>
  <a-row class="h-100-vh" type="flex" justify="center" align="middle">
    <a-col :span="4">
      <a-form :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              { 
                initialValue: 'test@gmail.com',
                rules: [{ required: true, message: 'Please input your username!' }] 
              },
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { 
                initialValue: 'password',
                rules: [{ required: true, message: 'Please input your Password!' }] 
              },
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="['remember', {valuePropName: 'checked', initialValue: true}]"
          >Remember me</a-checkbox>
          <a class="login-form-forgot" href>Forgot password</a>
          <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
          <a href="/register">register now!</a>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script scoped>
import { mapState, mapActions } from "vuex";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  computed: {
    ...mapState({
      userId: state => state.user.id
    })
  },
  methods: {
    ...mapActions("user", ["userLogin"]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.userLogin({
            username: values.username,
            password: values.password
          });
        }
      });
    }
  }
};
</script>
<style>
.login-form {
  max-width: 300px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>