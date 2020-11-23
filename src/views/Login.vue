<template>
  <section id="login">
    <div class="page_header">
      <div class="page_header-title">
        <img class="page_header-img" src="../assets/Ducky-3.png" alt="" />
        <h1>
          Ducky Dictionary
        </h1>
      </div>
    </div>
    <div class="login_inputs">
      <input
        v-model="input_username"
        class="inputs_field"
        placeholder="Username"
        type="text"
        name="input_username"
      />
      <transition name="bounce">
        <input
          v-if="isRegistering"
          v-model="input_fullname"
          class="inputs_field"
          placeholder="Full name"
          type="text"
          name="input_fullname"
        />
      </transition>
      <input
        v-model="input_password"
        class="inputs_field"
        placeholder="Password"
        type="password"
        name="input_password"
      />
      <input
        class="inputs_button button_login"
        type="button"
        :value="isRegistering ? 'Register' : 'Login'"
        @click="isRegistering ? registerUser() : loginUser()"
      />
    </div>
    <div class="login_register" v-if="isRegistering">
      <span>Already have an account? </span
      ><small @click="toggleRegistering">Login here</small>
    </div>
    <div class="login_register" v-else>
      <span>Don't have an account? </span
      ><small @click="toggleRegistering">Register here</small>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      isRegistering: false,
      input_username: "",
      input_fullname: "",
      input_password: ""
    };
  },
  methods: {
    toggleRegistering() {
      this.isRegistering = !this.isRegistering;
    },
    registerUser() {
      if (
        !this.input_username.trim() ||
        !this.input_fullname.trim() ||
        !this.input_password.trim()
      ) {
        this.$store.dispatch(
          "triggerMessage",
          "Fill in the fields, please :))"
        );
        return;
      }
      this.sendData({
        username: this.input_username,
        fullName: this.input_fullname,
        password: this.input_password
      });
    },
    loginUser() {
      if (!this.input_username.trim() || !this.input_password.trim()) {
        this.$store.dispatch(
          "triggerMessage",
          "Fill in the fields, please :))"
        );
        return;
      }
      this.sendData({
        username: this.input_username,
        password: this.input_password
      });
    },
    async sendData(dataToSend) {
      const rawResult = await fetch(
        `${process.env.VUE_APP_API_URL}/${
          this.isRegistering ? "register" : "login"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend),
          credentials: "include"
        }
      );
      if (rawResult.status !== 200) {
        this.$store.dispatch("triggerMessage", await rawResult.text());
        return;
      }
      const response = await rawResult.json();
      this.$store.dispatch("triggerMessage", response.message);
      this.$store.dispatch("initiateUserSession", response.userData);
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.3s ease-in-out;
  transform: scale(1.1);
}
.bounce-enter,
.bounce-leave-to {
  transform: scale(1);
  opacity: 0;
}
.login_inputs {
  margin: 150px auto 2rem auto;

  @include screen-is(lg) {
    width: 25%;
  }

  .inputs_field {
    border-bottom: 4px solid $shadow;
    background-color: $background;
    color: #fff;
    font-size: 21px;

    @include screen-is(lg) {
      font-size: 25px;
    }
  }
}
.button_login {
  background-color: $light-blue;
  color: $paars;
}
.login_register {
  margin: 1rem 0rem;
  text-align: center;
}
</style>
