<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb />
    <div id="text-roll-box">
      <img src="./../../../assets/images/horn2.png" alt="" />
      <div id="text-roll-inner">
        <!-- <vue-text-roll class="text-roll-demo" :duration="8000" :gutter="100"> -->
        <vue-text-roll class="text-roll-demo" :duration="10000">
          <p>
            欢迎来到悦度空间！每周持续更新，分享更多视频资源，注册登录后即可获取所有资源！
          </p>
        </vue-text-roll>
      </div>
    </div>
    <div id="music-player-box">
      <svg class="icon svg-icon" aria-hidden="true" @click="onPre">
        <use xlink:href="#icon-music_pre"></use>
      </svg>
      <svg
        class="icon svg-icon"
        aria-hidden="true"
        v-show="isPlay"
        @click="onPause"
      >
        <use xlink:href="#icon-music-on-copy"></use>
      </svg>
      <svg
        class="icon svg-icon"
        aria-hidden="true"
        v-show="!isPlay"
        @click="onPlay"
      >
        <use xlink:href="#icon-music-off-copy"></use>
      </svg>
      <svg class="icon svg-icon" aria-hidden="true" @click="onNext">
        <use xlink:href="#icon-music_next"></use>
      </svg>
    </div>
    <div id="audio-box">
      <audio
        ref="audioMusic"
        :preload="preload"
        :src="currentMusic"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
      ></audio>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="imgUrl" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            返回首页
          </el-dropdown-item>
        </router-link>

        <el-dropdown-item divided>
          <span style="display:block;" @click="handleLogin">登录/注册</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="log-reg-box" v-if="showLogReg">
      <log-reg v-on:closelogregback="closelogregback"></log-reg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import xiaoRen from './../../../assets/images/xiaoren.gif';

import { logout } from '@/api/login';
import { VueTextRoll } from 'text-roll';
import Aplayer from 'vue-aplayer';
import Music from 'vue-music-component'

export default {
  data () {
    return {
      imgUrl: xiaoRen,
      showLogReg: false,
      isPlay: true,
      preload: 'auto',
      currentMusic: '',
      // musicUrlList: [
      //   'http://127.0.0.1:8081/static/music/渔舟唱晚.mp3',
      //   'http://127.0.0.1:8081/static/music/沧海一声笑.mp3',
      //   'http://127.0.0.1:8081/static/music/冰菊物语.mp3',
      //   'http://127.0.0.1:8081/static/music/出水莲.mp3',
      //   'http://127.0.0.1:8081/static/music/春江花月夜.mp3',
      //   'http://127.0.0.1:8081/static/music/高山流水.mp3',
      //   'http://127.0.0.1:8081/static/music/寒鸦戏水.mp3',
      //   'http://127.0.0.1:8081/static/music/梁祝.mp3',
      //   'http://127.0.0.1:8081/static/music/梅花雪.mp3',
      //   'http://127.0.0.1:8081/static/music/琵琶语.mp3',
      //   'http://127.0.0.1:8081/static/music/偏偏喜欢你.mp3',
      //   'http://127.0.0.1:8081/static/music/片片枫叶情.mp3',
      //   'http://127.0.0.1:8081/static/music/平湖秋月.mp3',
      //   'http://127.0.0.1:8081/static/music/上海滩.mp3',
      //   'http://127.0.0.1:8081/static/music/西厢词.mp3',
      //   'http://127.0.0.1:8081/static/music/小城故事.mp3',
      //   'http://127.0.0.1:8081/static/music/雪花红梅.mp3',
      // ],
      musicUrlList: [
        '/static/music/渔舟唱晚.mp3',
        '/static/music/沧海一声笑.mp3',
        '/static/music/冰菊物语.mp3',
        '/static/music/出水莲.mp3',
        '/static/music/春江花月夜.mp3',
        '/static/music/高山流水.mp3',
        '/static/music/寒鸦戏水.mp3',
        '/static/music/梁祝.mp3',
        '/static/music/梅花雪.mp3',
        '/static/music/琵琶语.mp3',
        '/static/music/偏偏喜欢你.mp3',
        '/static/music/片片枫叶情.mp3',
        '/static/music/平湖秋月.mp3',
        '/static/music/上海滩.mp3',
        '/static/music/西厢词.mp3',
        '/static/music/小城故事.mp3',
        '/static/music/雪花红梅.mp3',
      ],
      musicIndex: 0
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    VueTextRoll,
    Aplayer,
    Music
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created () {
    this.initMuisc();
  },
  methods: {
    initMuisc () {
      let len = this.musicUrlList.length + 1;
      this.musicIndex = Math.floor(Math.random() * len);
      this.currentMusic = this.musicUrlList[this.musicIndex];

    },
    onPlay () {
      this.$refs.audioMusic.play();
      this.isPlay = true;
    },
    onPause () {
      this.$refs.audioMusic.pause();
      this.isPlay = false;
    },
    onTimeupdate (res) {
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      // console.log(res.target.currentTime)
      // console.log(res.target.duration)
    },
    onLoadedmetadata (res) {
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // console.log(res)
      this.onPlay()
    },
    onNext () {
      this.onPause();
      this.musicIndex++;
      if (this.musicIndex >= this.musicUrlList.length) {
        this.musicIndex = 0;
      }
      this.currentMusic = this.musicUrlList[this.musicIndex];
    },
    onPre () {
      this.onPause();
      this.musicIndex--;
      if (this.musicIndex < 0) {
        this.musicIndex = this.musicUrlList.length - 1;
      }
      this.currentMusic = this.musicUrlList[this.musicIndex];
    },
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
  #text-roll-box {
    display: inline-block;
    position: relative;

    width: 350px;
    height: 50px;
    overflow: hidden;
    margin-left: 30px;
    img {
      display: inline-block;
      width: 20px;
      height: auto;
      margin-top: 16px;
    }

    #text-roll-inner {
      position: absolute;
      width: 300px;
      height: 100%;
      top: -12px;
      left: 24px;
      color: #b8b8b8;
      font-size: 14px;
    }
  }
  #music-player-box {
    display: inline-block;
    width: 100px;
    height: 50px;
    padding-top: 4px;
    overflow: hidden;
    color: #b8b8b8;
    svg {
      cursor: pointer;
      font-size: 20px;
      &:hover {
        font-size: 22px;
      }
    }
  }
  #audio-box {
    display: inline-block;
    width: 100px;
    height: 50px;
    overflow: hidden;
  }
}
</style>

