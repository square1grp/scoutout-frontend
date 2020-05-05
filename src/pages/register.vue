<template>
  <a-row class="h-100-vh" type="flex" justify="center" align="middle">
    <a-col :span="6">
      <a-form :form="form" class="register-form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="E-mail">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
                initialValue:defaultFormData.email
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="First Name">
          <a-input
            v-decorator="[
              'firstname',
              {
                rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                initialValue:defaultFormData.firstname
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Last Name">
          <a-input
            v-decorator="[
              'lastname',
              {
                rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
                initialValue:defaultFormData.lastname
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
                initialValue:defaultFormData.password
              },
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
                initialValue:defaultFormData.confirm_password
              },
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox
            v-decorator="[
              'agreement', 
              { 
                rules: [{required: true, message: 'Please read the agreement.'}],
              }
            ]"
          >
            I have read the
            <a href>agreement</a>
          </a-checkbox>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit" class="register-form-button">Register</a-button>Or
          <a href="/login">login now!</a>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script scoped>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      defaultFormData: {
        email: "test@gmail.com",
        firstname: "John",
        lastname: "Doe",
        password: "password",
        confirm_password: "password"
      },
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    ...mapActions("user", ["userSignUp"]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.userSignUp(values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    }
  }
};
</script>
<style>
.register-form-button {
  width: 100%;
}
</style>