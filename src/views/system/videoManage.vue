<template>
  <div class="main-box">

    <div class="table-box">
      <el-table :data="tableData"
                border>
        <el-table-column prop="title"
                         :show-overflow-tooltip="true"
                         center
                         label="标 题">
        </el-table-column>x
        <el-table-column prop="type"
                         label="类 型">
        </el-table-column>
        <el-table-column prop="price"
                         label="售 价">
        </el-table-column>
        <el-table-column prop="linkSee"
                         label="试看链接">
        </el-table-column>

        <el-table-column prop="pwdSee"
                         label="密 码">
        </el-table-column>
        <el-table-column prop="linkBuy"
                         label="购买链接">
        </el-table-column>

        <el-table-column prop="pwdBuy"
                         label="密 码">
        </el-table-column>
        <el-table-column prop="createdAt"
                         label="上传时间">
        </el-table-column>
        <el-table-column prop="updatedAt"
                         label="更新时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="table-text-blue mr-16">查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="params.pageNum"
                     :page-size="params.pageSize"
                     layout="prev, pager, next"
                     background
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getVideos } from '@/api/videos.js'
export default {
  data () {
    return {
      tableData: [],
      params: {
        type: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 1
    }
  },
  created () {
    let user = {
      title: 'bool',
      type: 'css',
      price: '0',
      linkSee: 'http://www.baidu.com',
      pwdSee: 'sfdf',
      linkBuy: 'http://www.baidu.com',
      pwdBuy: 'eres',
      updateAt: '123',
      createAt: '000'
    }
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(user)
    }
    // this.tableData = arr
    this.getVideoLists()

  },
  methods: {
    getVideoLists () {
      getVideos(this.params).then(res => {
        // console.log(res.data.data)
        this.tableData = res.data;
        this.total = res.count;

      })
    },
    handleCurrentChange (val) {//分页 事件
      this.params.pageNum = val;
      // this.getUserLists();
    },
  }
}
</script>