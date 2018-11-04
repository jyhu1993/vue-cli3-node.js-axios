<template>
  <form  class="sign-up" >
    <div class="item">
      <label>用户名&nbsp;</label>
      <input v-model='user.userName' required class="user-name" type="text" name="userName">
    </div>
    <div class="item">
      <label>密码&nbsp;</label>
      <input v-model='user.password' required class="password" type="password" name="password">
    </div>
    <div class="item">
      <label>确认密码&nbsp;</label>
      <input v-model='passwordConfirm' required class="confirm-password" type="password" name="">
    </div>
    <div class="item">
      <button @click='signUp' class="signUp-btn" type="submit">注册</button>
    </div>
  </form>
</template>
<script>
export default {
  data () {
    return {
      user: {
        userName: '',
        password: ''
      },
      passwordConfirm: ''
    }
  },
  methods: {
    signUp (event) {
      if (this.user.password !== this.passwordConfirm) {
        alert('两次密码不同，请重新输入')
        event.preventDefault()
      } else if ((this.user.password !== '') && (this.passwordConfirm !== '')) {
        event.preventDefault()
        let xhr = new XMLHttpRequest()
        xhr.open('post', 'http://192.168.43.32:1234/signUp', true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(`user=${this.user.userName}&password=${this.user.password}`)
        this.user.password = ''
        this.user.userName = ''
        this.passwordConfirm = ''
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let content = xhr.responseText
            switch (content) {
              case 'true':
                alert('注册成功，请登录')
                break
              case 'false':
                alert('用户名已存在，请重新注册')
                break
            }
          }
        }
      }
    },
    loginIn (event) {

    }
  }
}
</script>
<style scoped lang="less">
  .sign-up{
    display: inline-block;
    background: #1b9095;
    padding:0 30px;
    border-radius: 5px;
    box-shadow: 10px 10px 5px #eee;
    .item{
      margin:30px 0;
      label{
        display: inline-block;
        width: 70px;
        padding-right: 20px;
        text-align: right;
        color:white;
      }
      .signUp-btn{
        display: inline-block;
        background-color: white;
        outline: none;
        border: none;
        width: 100px;
        border-radius: 5px;
        cursor: pointer;
      }
      .signUp-btn:active{
        background-color: #1ebdb5;
      }
    }

  }
</style>
