<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar"
               :is-active="sidebar.opened"
               class="hamburger-container" />
    <breadcrumb />
    <el-dropdown class="avatar-container"
                 trigger="click">
      <div class="avatar-wrapper">
        <img :src="imgUrl"
             class="user-avatar">
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown"
                        class="user-dropdown">
        <router-link class="inlineBlock"
                     to="/">
          <el-dropdown-item>
            返回首页
          </el-dropdown-item>
        </router-link>

        <el-dropdown-item divided>
          <span style="display:block;"
                @click="handleLogin">登录/注册</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;"
                @click="logout">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="log-reg-box"
         v-if="showLogReg">
      <log-reg v-on:closelogregback='closelogregback'></log-reg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import xiaoRen from './../../../assets/images/xiaoren.gif';

import { logout } from '@/api/login';
export default {
  data () {
    return {
      imgUrl: xiaoRen,
      showLogReg: false
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    handleLogin () {
      this.showLogReg = true;
    },
    closelogregback (val) {
      this.showLogReg = false;
    },
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      logout({
        phone: userInfo.phone,
        id: userInfo.id
      }).then(res => {
        this.$message({
          message: '退出成功！',
          type: 'success',
          showClose: true
        })
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        //   location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch(err => {
        // console.log('err')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

