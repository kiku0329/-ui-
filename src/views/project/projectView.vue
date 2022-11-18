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
              <!--        <el-button type="success">成功按钮-->
              <!--        </el-button>-->
              <!--        <el-button type="info"-->
              <!--                   size="small"-->
              <!--                   icon="el-icon-edit"-->
              <!--                   v-if="permission.project_delete"-->
              <!--                   @click="">发起审核-->
              <!--        </el-button>-->
              <!--        <el-button type="success"-->
              <!--                   size="small"-->
              <!--                   icon="el-icon-edit"-->
              <!--                   v-if="permission.project_delete"-->
              <!--                   @click="">审核通过-->
              <!--        </el-button>-->
              <!--        <el-button type="warning"-->
              <!--                   size="small"-->
              <!--                   icon="el-icon-edit"-->
              <!--                   v-if="permission.project_delete"-->
              <!--                   @click="">驳回-->
              <!--        </el-button>-->
              <el-row>
                <el-col :span="24">
                  <el-button type="primary"
                             size="small"
                             icon="el-icon-add"
                             plain
                             v-if="permission.project_delete"
                             @click="upload">合同上传
                  </el-button>
                  <el-button type="info"
                             size="small"
                             icon="el-icon-add"
                             plain
                             v-if="permission.project_delete"
                             @click="download">合同下载
                  </el-button>
                  <el-button type="success"
                             size="small"
                             icon="el-icon-add"
                             plain
                             v-if="permission.project_delete"
                             @click="clickOpenProj">项目文件下载
                  </el-button>
<!--                  <el-button type="danger"-->
<!--                             size="small"-->
<!--                             icon="el-icon-delete"-->
<!--                             plain-->
<!--                             v-if="permission.project_delete"-->
<!--                             @click="handleDelete">删 除-->
<!--                  </el-button>-->
                </el-col>

              </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-add"
                       v-if="permission.project_delete"
                       @click="clickOpenProj">人员管理
            </el-button>
            <el-button type="success"
                       size="small"
                       icon="el-icon-add"
                       v-if="permission.project_delete"
                       @click="clickOpenProj">成本查询
            </el-button>
            <el-button type="info"
                       size="small"
                       icon="el-icon-add"
                       v-if="permission.project_delete"
                       @click="clickOpenProj">费用管理
              </el-button>
            <el-button type="primary"
                       size="small"
                       icon="el-icon-add"
                       v-if="permission.project_delete"
                       @click="clickOpenProj">项目节点
            </el-button>
            <el-button type="success"
                       size="small"
                       icon="el-icon-add"
                       plain
                       v-if="permission.project_delete"
                       @click="clickOpenProj">项目文件上传
            </el-button>
            <el-button type="danger"
                       size="small"
                       icon="el-icon-add"
                       v-if="permission.project_delete"
                       @click="clickOpenProj">项目作废
            </el-button>

            <el-button type="warning"
                       size="small"
                       icon="el-icon-add"
                       v-if="permission.project_delete"
                       @click="clickOpenProj">项目成本预估
            </el-button>
            <el-button type="primary"
                       size="small"
                       icon="el-icon-add"
                       plain
                       v-if="permission.project_delete"
                       @click="clickOpenProj">备忘录
            </el-button>
<!--            <el-button type="danger"-->
<!--                       size="small"-->
<!--                       icon="el-icon-delete"-->
<!--                       plain-->
<!--                       v-if="permission.project_delete"-->
<!--                       @click="handleDelete">删 除-->
<!--            </el-button>-->
          </el-col>

        </el-row>
            </template>
    </avue-crud>
    <el-dialog :visible.sync="payDialog" append-to-body title="项目人员" width="1300px">
      <pro-peo>
      </pro-peo>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/project/project";
  import {mapGetters} from "vuex";
  import projectList from "@/views/project/project";
  import proPeo from "@/views/people/proPeo";

  export default {
    components:{projectList,proPeo},
    data() {
      return {
        payDialog:false,
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
          tip: true,
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
              label: "创建人",
              prop: "createUser",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
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
            },
            {
              label: "修改人",
              prop: "updateUser",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },
            {
              label: "修改时间",
              prop: "updateTime",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },
            {
              label: "状态",
              prop: "status",
              type: "input",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },
            {
              label: "是否已删除",
              prop: "isDeleted",
              type: "input",
              hide: true,
            },
            {
              label: "项目名称",
              prop: "name",
              type: "input",
              search: true,
            },
            {
              label: "项目编号",
              prop: "projNumber",
              type: "input",
              search: true,
            },
            {
              label: "合同编号",
              prop: "projId",
              type: "input",
              search: true,
            },
            {
              label: "项目地址",
              prop: "projLocation",
              type: "input",
              span: 24,
            },
            {
              label: "合同金额",
              prop: "projPrice",
              type: "input",
            },
            {
              label: "合同创建时间",
              prop: "buildTime",
              type: "input",
            },
            {
              label: "计划金额成本",
              prop: "plantPrice",
              type: "input",
            },
            {
              label: "甲方单位",
              prop: "partyA",
              type: "input",
              search: true,
              rules: [{
                required: true,
                message: "请输入甲方单位",
                trigger: "blur"
              }],
            },
            {
              label: "甲方单位地址",
              prop: "partyLt",
              type: "input",
              rules: [{
                required: true,
                message: "请输入甲方单位地址",
                trigger: "blur"
              }],
            },
            {
              label: "项目人数",
              prop: "projPeople",
              type: "input",
            },
            {
              label: "甲方对接人",
              prop: "partyName",
              type: "input",
            },
            {
              label: "电话",
              prop: "partyPhone",
              type: "input",
            },
            {
              label: "付款方式",
              prop: "plantPay",
              type: "select",
              search:true,
              dicUrl: "/api/blade-system/dict/dictionary?code=pay",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
            },
            {
              label: "备注",
              prop: "remarks",
              type: "textarea",
              span: 24,
            },
            {
              label: "项目内容",
              prop: "content",
              type: "textarea",
              span: 24,
              rules: [{
                required: true,
                message: "请输入项目内容",
                trigger: "blur"
              }],
            },
            {
              label: "附件链接",
              prop: "url",
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
          addBtn: this.vaildData(this.permission.projectView_add, false),
          viewBtn: this.vaildData(this.permission.projectView_view, false),
          delBtn: this.vaildData(this.permission.projectView_delete, false),
          editBtn: this.vaildData(this.permission.projectView_edit, false)
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
      clickOpenProj(){
        this.payDialog  = true;
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
      },
      upload() {
      },
      download(){}
    }
  };
</script>

<style>
</style>
