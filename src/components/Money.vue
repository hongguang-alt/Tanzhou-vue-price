<template>
  <div class="money">
    <div class="top">
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" class="select" @click="selectBytime"
        >筛选</el-button
      >
      <el-button type="primary" class="select" @click="showAddVisible">添加</el-button>
    </div>
    <div class="mytable">
      <el-table :data="datalist" border style="width: 100%">
        <el-table-column label="时间" width="250">
          <template slot-scope="scope">
            {{ scope.row.date | moment("YYYY-MM-DD h:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="消费类型" width="180">
        </el-table-column>
        <el-table-column prop="income" label="收入" width="180">
        </el-table-column>
        <el-table-column prop="expend" label="支出"> </el-table-column>
        <el-table-column prop="cash" label="现金"> </el-table-column>
        <el-table-column prop="remark" label="评论">
          <template slot-scope="scope">
            <span v-if="scope.row.remark">{{ scope.row.remark }}</span>
            <span v-else>----</span>
          </template>
        </el-table-column>
        <el-table-column prop="descript" label="描述"> </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="toDelete(scope.row)"
              >删除</el-button
            >
            <el-button type="warning" size="small" @click="showEditVisible(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="list.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="list.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 这是添加的模板 -->
    <el-dialog title="添加账单" :visible.sync="addVisible" width="50%">
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类型:" prop="type">
            <el-input v-model="addForm.type"></el-input>
          </el-form-item>
           <el-form-item label="描述:" prop="descript">
            <el-input v-model="addForm.descript"></el-input>
          </el-form-item>
           <el-form-item label="收入:" prop="income">
            <el-input v-model="addForm.income"></el-input>
          </el-form-item>
           <el-form-item label="支出:" prop="expend">
            <el-input v-model="addForm.expend"></el-input>
          </el-form-item>
           <el-form-item label="现金:" prop="cash">
            <el-input v-model="addForm.cash"></el-input>
          </el-form-item>
           <el-form-item label="评论:" >
            <el-input v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-form>
         <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="修改账单" :visible.sync="editVisible" width="50%">
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类型:" prop="type">
            <el-input v-model="editForm.type"></el-input>
          </el-form-item>
           <el-form-item label="描述:" prop="descript">
            <el-input v-model="editForm.descript"></el-input>
          </el-form-item>
           <el-form-item label="收入:" prop="income">
            <el-input v-model="editForm.income"></el-input>
          </el-form-item>
           <el-form-item label="支出:" prop="expend">
            <el-input v-model="editForm.expend"></el-input>
          </el-form-item>
           <el-form-item label="现金:" prop="cash">
            <el-input v-model="editForm.cash"></el-input>
          </el-form-item>
           <el-form-item label="评论:" >
            <el-input v-model="editForm.remark"></el-input>
          </el-form-item>
        </el-form>
         <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editItem">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      date: [],
      datalist: [],
      list: {
        currentPage: 1,
        pageSize: 5,
        start: "",
        end: ""
      },
      total: 20,
      //添加的单元框
      addVisible: false,
      //修改的单元框
      editVisible:false,
      //添加的数据：
      addForm:{
        type:'',
        descript:'',
        income:'',
        expend:'',
        cash:'',
        remark:''
      },
      editForm:{},
      //添加的验证规则：
      addFormRules:{
        type:[
          { required: true, message: '请输入消费类型', trigger: 'blur' }
        ],
        income:[
          { required: true, message: '请输入收入', trigger: 'blur' }
        ],
        expend:[
          { required: true, message: '请输入支出', trigger: 'blur' }
        ],
        cash:[
          { required: true, message: '请输入现金', trigger: 'blur' }
        ],
        descript:[
          { required: true, message: '请输入收入', trigger: 'blur' }
        ]
      },
      editFormRules:{
        type:[
          { required: true, message: '请输入消费类型', trigger: 'blur' }
        ],
        income:[
          { required: true, message: '请输入收入', trigger: 'blur' }
        ],
        expend:[
          { required: true, message: '请输入支出', trigger: 'blur' }
        ],
        cash:[
          { required: true, message: '请输入现金', trigger: 'blur' }
        ],
        descript:[
          { required: true, message: '请输入收入', trigger: 'blur' }
        ]
      },
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //筛选
    selectBytime() {
      if (this.date) {
        this.list.start = this.date[0];
        this.list.end = this.date[1];
      }else if(this.date===null){
        this.list.start = ''
        this.list.end = ''
      }
      this.getlist();
    },
    async getlist() {
      console.log(this.list)
      let result = await this.$axios.get("profiles/find", {
        params: this.list
      });
      if (result.data.status == 200) {
        this.$message.success("查询成功！");
        this.datalist = result.data.data;
        this.total = result.data.total;
      } else {
        this.$message.error("查询失败！");
      }
    },
    //页数发生改变的时候
    handleSizeChange(value) {
      this.list.pageSize = value;
      this.getlist();
    },
    //当前条数改变的时候
    handleCurrentChange(value) {
      this.list.currentPage = value;
      this.getlist();
    },
    showAddVisible() {
      this.addVisible = true;
    },
    //添加数据：
    addItem(){
      this.$refs.addFormRef.validate(async value=>{
        if(value){
          let result = await this.$axios.post('/profiles/add',this.addForm)
          if(result.data.status==201) return this.$message.error('添加失败')
          this.$message.success('添加成功！');
          this.addVisible = false 
          this.getlist()
        }
      })
    },
    showEditVisible(role){
      this.editVisible = true;
      this.editForm = role
      console.log(this.editForm)
    },
    //修改数据
    editItem(){
      this.$refs.editFormRef.validate(async value=>{
        if(value){
          let result = await this.$axios.post(`/profiles/edit/${this.editForm._id}`,this.editForm)
          this.editVisible = false 
          this.getlist()
        }
      })
    },
    //删除数据：
   async toDelete(role){
      let data = await this.$confirm('此操作将永久删除该账单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(value =>{ return value })
        if(data=='confirm'){
            let result =await this.$axios.get(`/profiles/delete`,{
                params: {
                  id: role._id
              }})
            if(result.data.status==201) return this.$message.error('删除失败')
            this.$message.success('删除成功！')
            this.getlist()
        }else{
          this.$message.info('已经取消删除！')
        }
    }
  }
};
</script>

<style scoped>
.money {
  width: 100%;
  height: 100%;
}
.select {
  margin-left: 20px;
}
.mytable {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
