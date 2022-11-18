<template>
  <basic-container>
<!--    <div>-->
<!--      <el-form ref="formTray" :inline="true" :model="form" :rules="rules" size="small" label-width="115px">-->
<!--        <el-form-item v-if="isShow" label="ID">-->
<!--          <el-input v-model="form.id" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="托盘方" prop="custName">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-tooltip effect="dark" placement="top-start">&ndash;&gt;-->
<!--&lt;!&ndash;            <div slot="content">{{ formTray.custName }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="formTray.custName" required clearable style="width: 200px" />&ndash;&gt;-->
<!--&lt;!&ndash;          </el-tooltip>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="法定代理人" prop="legalAgent">-->
<!--          <el-input v-model="form.legalAgent" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="委托代理人" prop="agent">-->
<!--          <el-input v-model="form.agent" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址" prop="address">-->
<!--          <el-input v-model="form.address" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="传真号码" prop="faxNumber">-->
<!--          <el-input v-model="form.faxNumber" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开户行" prop="depositBank">-->
<!--          <el-input v-model="form.depositBank" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开户行号" prop="bankNo">-->
<!--          <el-input v-model="form.bankNo" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="账号" prop="account">-->
<!--          <el-input v-model="form.account" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="税号" prop="ein">-->
<!--          <el-input v-model="form.ein" clearable style="width: 200px" />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--&lt;!&ndash;          <el-button type="primary"  v-if="permission.tray_save" @click="submitForms('formTray')">保存</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button type="danger"  @click="clear()">清空</el-button>&ndash;&gt;-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
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
        <el-button size="mini"
                   icon="el-icon-refresh"
                   @click="searchReset">审核通过
        </el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   @click="handleDelete">审核不通过
        </el-button>

      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/cost/cost";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        rules: {
          custName: [{ required: true, message: '请输入托盘方', trigger: 'blur' }]
        },
        isShow: false,
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
          // height:'auto',
          calcHeight: 30,
          tip: false,
          addBtn:false,
          border: true,
          index: true,
          viewBtn: false,
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
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide: true,
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
            {
              label: "费用名称",
              prop: "name",
              type: "input",
              search: true,
              rules: [{
                required: true,
                message: "请输入费用名称",
                trigger: "blur"
              }],
            },
            {
              label: "项目名称",
              prop: "plantName",
              type: "input",
              search: true,
              rules: [{
                required: true,
                message: "请输入项目名称",
                trigger: "blur"
              }],
            },
            {
              label: "申请人",
              prop: "userName",
              type: "input",
              search: true,
            },
            {
              label: "费用类型",
              prop: "type",
              type: "input",
              search: true,
            },
            {
              label: "项目id",
              prop: "plantId",
              type: "input",
            },
            {
              label: "是否报销",
              prop: "idType",
              type: "input",
            },
            {
              label: "备注",
              prop: "remarks",
              type: "input",
            },
            {
              label: "费用产生时间",
              prop: "payTime",
              type: "input",
            },
            {
              label: "起始地",
              prop: "startPs",
              type: "input",
            },
            {
              label: "目的地",
              prop: "endPs",
              type: "input",
            },
            {
              label: "票据数量",
              prop: "numberP",
              type: "input",
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
          addBtn: this.vaildData(this.permission.cost_add, false),
          viewBtn: this.vaildData(this.permission.cost_view, false),
          delBtn: this.vaildData(this.permission.cost_delete, false),
          editBtn: this.vaildData(this.permission.cost_edit, false)
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
