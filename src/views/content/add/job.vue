<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.job_delete"
                   @click="handleDelete">删除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/content/job";
  import {mapGetters} from "vuex";

  export default {
    data() {
      const statusValidate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入参数'));
        } else if(isNaN(value)){
          callback(new Error('请输入数字型参数'));
        } else {
          callback();
        }
      };
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height:'auto',
          calcHeight: 30,
          searchMenuSpan:4,
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          column: [
            {
              label: "主键",
              prop: "id",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "租户ID",
              prop: "tenantId",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "账号",
              prop: "account",
              type: "input",
              hide: true,
            },
            {
              label: "昵称",
              prop: "name",
              type: "input",
              search: true,
              rules: [{
                required: true,
                message: "请输入昵称",
                trigger: "blur"
              }],
            },
            {
              label: "日志内容",
              prop: "content",
              type: "textarea",
              span: 24,
            },
            {
              label: "日志质量",
              prop: "level",
              type: "input",
            },
            {
              label: "提出的问题",
              prop: "problem",
              type: "input",
            },
            {
              label: "评价",
              prop: "evaluate",
              type: "input",
            },
            {
              label: "项目名",
              prop: "projectName",
              type: "input",
              search: false,
            },
            {
              label: "录入时间",
              prop: "time",
              type: "datetime",
            },
            {
              label: "创建人",
              prop: "createUser",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "创建部门",
              prop: "createDept",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "创建时间",
              prop: "createTime",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "修改人",
              prop: "updateUser",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "修改时间",
              prop: "updateTime",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
            {
              label: "状态",
              prop: "status",
              type: "input",
              search: true,
              rules: [
                {
                  required: true,
                  validator: statusValidate,
                  trigger: 'blur'
                }
              ],
            },
            {
              label: "是否已删除",
              prop: "isDeleted",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.job_add, false),
          viewBtn: this.vaildData(this.permission.job_view, false),
          delBtn: this.vaildData(this.permission.job_delete, false),
          editBtn: this.vaildData(this.permission.job_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowSave(row, done, loading) {
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
