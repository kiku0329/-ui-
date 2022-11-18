<template>
    <basic-container>
        <!-- <avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" :permission="permissionList"
            :before-open="beforeOpen" v-model="form" ref="crud" @row-update="rowUpdate" @row-save="rowSave"
            @row-del="rowDel" @search-change="searchChange" @search-reset="searchReset"
            @selection-change="selectionChange" @current-change="currentChange" @size-change="sizeChange"
            @refresh-change="refreshChange" @on-load="onLoad"> -->
                <avue-crud :option="option" 
                :table-loading="loading" 
                :data="data" 
                :page.sync="page" 
                :permission="permissionList"
                :before-open="beforeOpen" 
                 v-model="form" ref="crud" 
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
                v-if="permission.plepipe_delete"
                @click="handleDelete">删 除
                </el-button>
                <el-button type="success" 
                size="small" plain 
                v-if="userInfo.role_name.includes('admin')" 
                icon="el-icon-upload2"
                @click="handleImport">导入
                </el-button>
            </template>
        </avue-crud>
        <el-dialog title="用户数据导入" 
        append-to-body :visible.sync="excelBox" 
        width="555px">
        <avue-form 
        :option="excelOption" 
        v-model="excelForm" 
        :upload-after="uploadAfter">
        <template slot="excelTemplate">
        <el-button type="primary" 
        @click="handleTemplate">
        点击下载
        <i class="el-icon-download el-icon--right"></i>
                    </el-button>
                </template>
            </avue-form>
        </el-dialog>
    </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/content/plepipe";
import { mapGetters } from "vuex";
import website from '@/config/website';
import { exportBlob } from "@/api/common";
import { downloadXls } from "@/util/util";
import { getToken } from '@/util/auth';

export default {
    data() {
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
                height: 'auto',
                calcHeight: 30,
                tip: false,
                border: true,
                index: true,
                viewBtn: true,
                selection: true,
                excelBox:false,
                searchMenuSpan: 4,
                column: [
                    {
                        label: "员工编号",
                        prop: "number",
                        type: "input",
                        search: true,
                        rules: {
                            required: false,
                            message: "请输入员工编号",
                            trigger: "blur"
                       }
                    },
                    {
                        label: "所属角色",
                        prop: "role",
                        type: "tree",
                        dicUrl: "/api/blade-system/tenant/select",
                        props: {
                            label: "tenantName",
                            value: "tenantId"
                        },
                        hide: !website.tenantMode,
                        addDisplay: website.tenantMode,
                        editDisplay: website.tenantMode,
                        viewDisplay: website.tenantMode,
                        rules: [{
                            required: true,
                            message: "请输入您的身份",
                            trigger: "click"
                        }],
                        span: 12,
                    },
                    {
                        label: "员工姓名 ",
                        prop: "name",
                        type: "input",
                        search: true,
                        rules: {
                            required: true,
                            message: "请输入员工姓名",
                            trigger: "blur"
                        }
                    },
                    {
                        label: "性别",
                        prop: "gender",
                        type: "select",
                        dicData: [
                            {
                                label: "男",
                                value: 1
                            },
                            {
                                label: "女",
                                value: 2
                            }
                        ],
                        search: true,
                    },
                    {
                        label: "年龄",
                        prop: "year",
                        type: "input",
                    },
                    {
                        label: "联系电话",
                        prop: "phone",
                        type: "input",
                    },
                    {
                        label: "邮箱",
                        prop: "email",
                        type: "input",
                    },
                    {
                        label: "地址",
                        prop: "address",
                        type: "input",
                    },
                    {
                        label: "出生年月",
                        prop: "birth",
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                    },  
                    {
                        label: "毕业院校",
                        prop: "school",
                        type: "input",
                    },
                    {
                        label: "学位",
                        prop: "degree",
                        type: 'select',
                        dicData: [
                            {
                                label: "副学士",
                                value: 1
                            },
                            {
                                label: "学士",
                                value: 2
                            },
                            {
                                label: "硕士",
                                value: 3
                            },
                            {
                                label: "博士",
                                value: 4
                            },
                            {
                                label: "其他",
                                value:5
                            }
                        ],
                        
                    },
                    {
                        label: "证书编号",
                        prop: "certificate",
                        type:'input'
                    },
                    {
                        label: "创建时间",
                        prop: "createTime",
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                    },
                    {
                        label: "所属部门",
                        prop: "createDept",
                        type: "input",
                    },
                    {
                        label: "入职时间",
                        prop: "entry",
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                    },
                    {
                        label: "转正时间",
                        prop: "positive",
                        type: "datetime",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                    },
                    {
                        label: "备注",
                        prop: "remark",
                        type: "input",
                    },
                ],
                dialogClickModal: false,
            },
            data: [],
            excelForm: {},
            excelOption: {
                submitBtn: false,
                emptyBtn: false,
                column: [
                    {
                        label: '模板上传',
                        prop: 'excelFile',
                        type: 'upload',
                        drag: true,
                        loadText: '模板上传中，请稍等',
                        span: 24,
                        propsHttp: {
                            res: 'data'
                        },
                        tip: '请上传 .xls,.xlsx 标准格式文件',
                        action: "/api/blade-user/import-user"
                    },
                    {
                        label: "数据覆盖",
                        prop: "isCovered",
                        type: "switch",
                        align: "center",
                        width: 80,
                        dicData: [
                            {
                                label: "否",
                                value: 0
                            },
                            {
                                label: "是",
                                value: 1
                            }
                        ],
                        value: 0,
                        slot: true,
                        rules: [
                            {
                                required: true,
                                message: "请选择是否覆盖",
                                trigger: "blur"
                            }
                        ]
                    },
                    {
                        label: '模板下载',
                        prop: 'excelTemplate',
                        formslot: true,
                        span: 24,
                    }
                ]
            }

        };
    },
    computed: {
        ...mapGetters(["userInfo", "permission"]),
        permissionList() {
            return {
                addBtn: this.vaildData(this.permission.plepipe_add, false),
                viewBtn: this.vaildData(this.permission.plepipe_view, false),
                delBtn: this.vaildData(this.permission.plepipe_delete, false),
                editBtn: this.vaildData(this.permission.plepipe_edit, false)
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
    watch: {
        'excelForm.isCovered'() {
            if (this.excelForm.isCovered !== '') {
                const column = this.findObject(this.excelOption.column, "excelFile");
                column.action = `/api/blade-user/import-user?isCovered=${this.excelForm.isCovered}`;
            }
        }  
    },
    methods: {
        handleTemplate() {
            exportBlob(`/api/blade-user/export-template?${this.website.tokenHeader}=${getToken()}`).then(res => {
                downloadXls(res.data, "用户数据模板.xlsx");
            })
        },
        uploadAfter(res, done, loading, column) {
            window.console.log(column);
            this.excelBox = false;
            this.refreshChange();
            done();
        },
        handleImport() {
            this.excelBox = true;
        },
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
        currentChange(currentPage) {
            this.page.currentPage = currentPage;
        },
        sizeChange(pageSize) {
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
