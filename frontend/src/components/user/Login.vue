<template>
  <div class="login">
    <div class="blackBg">
      <div class="whiteBg">
        <div class="top">
          <h2>Login</h2>
          <button @click="close">
            <span class="material-icons"> close </span>
          </button>
        </div>
        <div class="mid">
          <input type="text" placeholder="ID" />
          <input type="text" placeholder="PASSWORD" />
        </div>
        <div class="bottom">
          <button><span>LOGIN</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  methods: {
    close() {
      this.$store.commit("hideLogin");
    },
  },
};
</script>

<style lang="scss" scoped>
.blackBg {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  .whiteBg {
    background-color: #fff;
    width: 300px;
    border-radius: 10px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #aaa;
      h2 {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .mid {
      padding: 20px;
      input {
        padding: 5px;
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
    .bottom {
      padding: 10px;
      border-top: 1px solid #aaa;
      text-align: right;
      button {
        padding: 7px;
        background-color: #333;
        border-radius: 5px;
        span {
          font-size: 16px;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
