<template>
  <div class="upload-container">
    <el-row>
      <el-col :span="10"
              class="upload-left">
        <el-form :model="uploadForm"
                 :rules="formRules"
                 ref="uploadFormOne"
                 label-width="100px"
                 label-position="right"
                 size="small"
                 autocomplete='on'>
          <el-form-item label="标 题："
                        prop="title">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}"
                      resize='none'
                      clearable
                      v-model="uploadForm.title"></el-input>
          </el-form-item>
          <el-form-item label="售 价："
                        prop="price">
            <el-input v-model="uploadForm.price"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="选择类型："
                        prop="type">
            <el-select v-model="uploadForm.type"
                       placeholder="请选择">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择标签："
                        prop="labels">
            <el-select v-model="uploadForm.labels"
                       multiple
                       placeholder="请选择">
              <el-option v-for="item in labelOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="试看网址："
                        prop="linkSee">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}"
                      resize="none"
                      placeholder="http://yuedu.1539.ink"
                      v-model="uploadForm.linkSee"></el-input>
          </el-form-item>
          <el-form-item label="试看密码："
                        prop="pwdSee">
            <el-input v-model="uploadForm.pwdSee"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="购买网址："
                        prop="linkBuy">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}"
                      resize="none"
                      placeholder="http://yuedu.1539.ink"
                      v-model="uploadForm.linkBuy"></el-input>
          </el-form-item>

          <el-form-item label="购买密码："
                        prop="pwdBuy">
            <el-input v-model="uploadForm.pwdBuy"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit"
                       size="small">确认上传</el-button>
            <el-button size="small"
                       @click="resetForm">清空全部</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="14"
              class="upload-right">
        <el-form :model="uploadForm"
                 label-width="100px"
                 label-position="right"
                 size="mini"
                 autocomplete='on'>
          <el-form-item label="封面图："
                        prop="coverImg"
                        hide-required-asterisk="false"
                        class="cover-image">
            <my-upload ref="uploader"
                       field="file"
                       enctype="multipart/form-data"
                       @crop-success="cropSuccess"
                       v-model="show"
                       :no-circle="true"
                       :width="220"
                       :height="120"
                       img-format="png"></my-upload>
            <el-button size="small"
                       type="primary"
                       plain
                       @click="toggleShow">选择图片</el-button>
            <!-- <div class="">只能上传jpeg/jpg/png/gif格式的图片，且不超过5M</div> -->
            <div class="coverImg">
              <div>预 览</div>
              <img :src="detailRuleForm.coverImg"
                   alt="">
            </div>
          </el-form-item>

          <el-form-item label="示例图："
                        prop="tipImg">
            <img src="../../assets/images/example/video.jpg"
                 alt="示例图">
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { uploadFormDatas, uploadImg, imageupload } from "@/api/upload";
import { valiteText_r, valiteNum_r, valitUrl_r } from '@/utils/validate';
import myUpload from "vue-image-crop-upload";

export default {
  data () {
    return {
      typeOptions: [
        {
          value: 'HTML/CSS',
          label: 'HTML/CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        },
        {
          value: 'jQuery',
          label: 'jQuery'
        },
        {
          value: 'Vue',
          label: 'Vue'
        },
        {
          value: 'Node',
          label: 'Node'
        },
        {
          value: 'FontOther',
          label: 'FontOther'
        },
        {
          value: 'Java',
          label: 'Java'
        },
        {
          value: 'PHP',
          label: 'PHP'
        },
        {
          value: 'Python',
          label: 'Python'
        },
        {
          value: 'EndOther',
          label: 'EndOther'
        },
      ],
      labelOptions: [
        {
          value: 'HTML/CSS',
          label: 'HTML/CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        },
        {
          value: 'jQuery',
          label: 'jQuery'
        },
        {
          value: 'Vue',
          label: 'Vue'
        },
        {
          value: 'Node',
          label: 'Node'
        },
        {
          value: 'MUI',
          label: 'MUI'
        },
        {
          value: 'Angular',
          label: 'Angular'
        },
        {
          value: 'Bootstrap',
          label: 'Bootstrap'
        },
        {
          value: 'WeiChat',
          label: 'WeiChat'
        },
        {
          value: 'Gulp',
          label: 'Gulp'
        },
        {
          value: 'Webpack',
          label: 'Webpack'
        },
        {
          value: 'MongoDb',
          label: 'MongoDb'
        },
        {
          value: 'Mysql',
          label: 'Mysql'
        },
        {
          value: 'Redis',
          label: 'Redis'
        },
        {
          value: 'FontOther',
          label: 'FontOther'
        },
        {
          value: 'Java',
          label: 'Java'
        },
        {
          value: 'PHP',
          label: 'PHP'
        },
        {
          value: 'Python',
          label: 'Python'
        },
        {
          value: 'EndOther',
          label: 'EndOther'
        },
      ],
      uploadForm: {
        title: '',
        price: '',
        type: '',
        labels: [],
        linkSee: '',
        pwdSee: '',
        linkBuy: '',
        pwdBuy: '',
        // img: ''
      },
      formRules: {
        title: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        price: [
          { required: true, validator: valiteNum_r, trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        labels: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        linkSee: [
          { required: true, validator: valitUrl_r, trigger: 'blur' }
        ],
        pwdSee: [
          { required: true, trigger: 'blur', message: '不能为空' }
        ],
        linkBuy: [
          { required: true, validator: valitUrl_r, trigger: 'blur' }
        ],
        pwdBuy: [
          { required: true, trigger: 'blur', message: '不能为空' }
        ],
      },
      show: false,
      detailRuleForm: {
        coverImg: ''
      }
    }
  },
  components: {
    myUpload
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      this.$refs['uploadFormOne'].validate((valid) => {
        if (valid) {
          if (this.detailRuleForm.coverImg == '') {
            this.$message({
              message: '请选择图片',
              type: 'warning',
              showClose: true
            })
            return;
          }
          let datas = this.uploadForm;
          datas.coverimg = this.detailRuleForm.coverImg;
          uploadFormDatas(datas).then((res) => {
            // console.log(res)
            this.$message({
              message: '上传成功！',
              type: 'success',
              showClose: true
            })
            this.resetForm();
          })
        } else {
          this.$message({
            message: '输入有误！',
            type: 'error',
            showClose: true
          })
          return false;
        }
      });
    },
    resetForm () {
      this.$refs['uploadFormOne'].resetFields();
      this.detailRuleForm.coverImg = '';
    },
    toggleShow () {
      this.show = !this.show;
    },
    cropSuccess (coverImg, field) {
      this.detailRuleForm.coverImg = coverImg;
    },
    closelogregback (val) {
      this.showLogReg = false;
    },
  }
}
</script>
<style lang="scss" scoped>
.upload-container {
  background-color: #fff;
  padding: 40px;
  border: 1px solid #e9eef3;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  .upload-right {
    padding-left: 30px;
  }
  .cover-image {
    position: relative;
    width: 370px;
    height: 150px;
    .coverImg {
      position: absolute;
      top: 0;
      right: -60px;
      width: 230px;
      height: 130px;
      box-sizing: border-box;
      padding: 4px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      overflow: hidden;
      div {
        position: absolute;
        color: #d9d9d9;
        top: 40px;
        left: 94px;
      }
    }
  }
  .el-textarea,
  .el-input,
  .el-select {
    width: 330px;
  }
}
</style>


