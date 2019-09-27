<template>
  <div class="main-box">
    <div class="table-box">
      <el-table :data="tableData" border>
        <el-table-column prop="username" center label="用户名">
        </el-table-column
        >x
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column
          prop="regTime"
          :show-overflow-tooltip="true"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column prop="logTime" label="最近登录时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="table-text-blue mr-16">查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-box">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        layout="prev, pager, next"
        background
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- <svg-icon icon-class="example2" /> -->
  </div>
</template>
<script>
import { getUsers } from '@/api/users';


export default {
  data () {
    return {
      tableData: [],
      params: {
        userId: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 1,
    }
  },
  created () {
    this.getUserLists()
  },
  methods: {
    getUserLists () {
      getUsers(this.params).then(res => {
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