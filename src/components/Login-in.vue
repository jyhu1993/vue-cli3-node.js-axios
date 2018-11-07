<template>
   <form class="login">
    <div class="item">
      <label>用户名&nbsp;</label>
      <input v-model='user.userName' required class="user-name" type="text" name="userName">
    </div>
    <div class="item">
      <label>密码&nbsp;</label>
      <input v-model='user.password' required class="password" type="password" name="password">
    </div>
    <div class="item">
      <button @click='loginIn' class="login-btn" type="submit">登录</button>
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
      }
    }
  },
  methods: {
    loginIn () {
      if (this.user.userName !== '' && this.user.password !== '') {
        event.preventDefault()
        var xhr = new XMLHttpRequest()
        // 192.168.3.6为电脑与手机所连路由器地址，为了使手机端也可访问node.js搭建的服务器，故设置为此ip
        xhr.open('post', 'http://192.168.3.6:1234/loginIn', true)
        // xhr.setRequestHeader("content-type","application/json")
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(`user=${this.user.userName}&password=${this.user.password}`)

        var that = this
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let result = xhr.responseText
            switch (result) {
              case 'false':
                that.user.password = ''
                that.user.userName = ''
                alert('用户名或密码错误')
                break
              case 'true':
                // 通过store记录当前用户名;token作为判断是否登录的标志；
                that.$store.commit('changeToken')
                that.$store.state.userName = that.user.userName
                that.$router.push('/home')
                break
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="less">
  .login{
    display: inline-block;
    background: #1b9095;
    padding:0 30px;
    border-radius: 5px;
    box-shadow: 10px 10px 5px #eee;
    .item{
      margin:30px 0;
      label{
        display: inline-block;
        width: 60px;
        padding-right: 20px;
        text-align: right;
        color:white;
      }
      .login-btn{
        display: inline-block;
        background-color: white;
        outline: none;
        border: none;
        width: 100px;
        border-radius: 5px;
        cursor: pointer;
      }
      .login-btn:active{
        background-color: #1ebdb5;
      }
    }
  }

</style>
