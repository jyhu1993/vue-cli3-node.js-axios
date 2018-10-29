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
        user:{
          userName:'',
          password:''
        }
      }
    },
    methods:{
      loginIn () {
        if (this.user.userName != '' && this.user.password != '') {
          event.preventDefault()
          var xhr = new XMLHttpRequest()
          xhr.open('post','http://localhost:1234/loginIn',true)
          // xhr.setRequestHeader("content-type","application/json")
          xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
          xhr.send(`user=${this.user.userName}&password=${this.user.password}`)
          this.user.password = ''
          this.user.userName = ''
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              let result = xhr.responseText
              switch(result){
                case 'false':
                alert('用户名或密码错误')
                break;
                case 'true':
                window.location = '/home'
                break;
              }
            }
          }
        }
      }
    }
  }


</script>
<style type="text/css" lang="less">
  .login{
    display: inline-block;
    background: #1b9095;
    padding:0 30px;
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
