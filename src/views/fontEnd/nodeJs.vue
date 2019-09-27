<template>
  <div class="main-box">
    <div>
      <el-row>
        <el-col :xs="12"
                :sm="8"
                :md="6"
                :lg="6"
                :xl="4"
                class="col-box"
                v-for="(item,index) in datas"
                :key="index">
          <div class="plate-box">
            <div class="cover-box">
              <img :src="item.imgSrc"
                   alt="">
              <div class="label-box"><span v-for="(label,index) in item.labels"
                      :key="index"> {{label}}
                </span></div>
              <div class="menu-btns">
                <el-button type="primary"
                           round
                           style="margin-right:10px;"
                           @click="handleSeeVideo(item)">试 看</el-button>
                <el-button type="success"
                           round
                           @click="handleBuyVideo(item)">获 取</el-button>
              </div>
              <div class="new-logo-box"
                   v-if='index<4'>NEW</div>
            </div>
            <div class="plate-title">
              {{ item.title }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="pagination-box"
         v-if="total>params.pageSize">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="params.pageNum"
                     :page-size="params.pageSize"
                     layout="prev, pager, next"
                     background
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="dialogVideoTitle"
               top='20vh'
               :visible.sync="dialogVideoSee"
               class="dialog-see-video">
      <img class="zan-shang-img"
           src="@/assets/images/zanshang.png"
           alt="">
      <div class="link-box">地址：<a :href="seeLinkText"
           target="_blank"
           rel="noopener noreferrer">{{seeLinkText}}</a></div>
      <div class="pwd-box">密码：{{seePwdText}}</div>
    </el-dialog>
    <div class="log-reg-box "
         v-if="showLogReg">
      <log-reg v-on:closelogregback='closelogregback'></log-reg>
    </div>
  </div>
</template>
<script>
import { getVideos, getVideoInfos } from '@/api/videos';

export default {
  data () {
    return {
      dialogVideoTitle: '',
      showLogReg: false,
      dialogVideoSee: false,
      seeLinkText: '',
      seePwdText: '',
      datas: [],
      total: 1,
      params: {
        type: 'Node',
        pageSize: 24,
        pageNum: 1
      },
    }
  },
  created () {
    this.getVideoLists()
  },
  methods: {
    getVideoLists () {
      getVideos(this.params).then(res => {
        // console.log(res.data)
        this.datas = res.data;
        this.total = res.count;
      })
    },
    handleCurrentChange (val) {//分页 事件
      this.params.pageNum = val;
      this.getVideoLists();
    },
    handleSeeVideo (item) {
      // console.log(item)
      this.dialogVideoTitle = '视频试看';
      this.seeLinkText = item.linkSee;
      this.seePwdText = item.pwdSee;
      this.dialogVideoSee = true;
    },
    handleBuyVideo (item) {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$confirm('您尚未登录或已登录过期, 是否立即登录?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLogReg = true;
        }).catch(() => { });
        return;
      }

      getVideoInfos({
        id: item.id
      }).then(res => {
        // console.log(res)
        this.dialogVideoTitle = '视频获取';
        this.seeLinkText = res.data.linkBuy;
        this.seePwdText = res.data.pwdBuy;
        this.dialogVideoSee = true;
      })
    },
    closelogregback (val) {
      this.showLogReg = false;
    },

  },

}

</script>