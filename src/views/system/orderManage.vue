<template>
  <div class="main-box">

    <div class="table-box">
      <el-table :data="tableData"
                border>
        <el-table-column prop="userId"
                         center
                         label="用户名Id">
        </el-table-column>
        <el-table-column prop="title"
                         label="资源名称">
        </el-table-column>
        <el-table-column prop="price"
                         label="售 价">
        </el-table-column>
        <el-table-column prop="buyTime"
                         label="购买时间">
        </el-table-column>
        <el-table-column prop="linkBuy"
                         label="购买链接">
        </el-table-column>
        <el-table-column prop="pwdBuy"
                         label="密 码">
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
import { getOrders } from '@/api/orders.js';
export default {
  data () {
    return {
      tableData: [],
      params: {
        userId: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 1

    }
  },
  created () {
    let user = {
      username: 'bool',
      phone: '123',
      email: 'qq.com',
      title: '123',
      price: '000',
      buyTime: '3213'
    }
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(user)
    }
    // this.tableData = arr
    this.getOrderLists();

  },
  methods: {
    getOrderLists () {
      getOrders(this.params).then(res => {
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