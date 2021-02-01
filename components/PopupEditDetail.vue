<template>
    <div
        id="popupEditDetail"
        class="modal fade"
        tabindex="-1"
        role="dialog"
    >
        <div
            class="modal-dialog modal-dialog-centered modal-lg"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-body">
                    <div
                        class="d-flex justify-content-between align-items-center"
                    >
                        <h4>{{ title }}</h4>
                        <a
                            v-if="isClose"
                            class="close-btn"
                            href="javascript:;"
                            @click="hide"
                        >
                            CLOSE
                        </a>
                    </div>
                    <ValidationObserver ref="ValidationObserver" slim>
                        <b-form class="form-content">
                            <ValidationProvider
                                v-slot="v"
                                name="name"
                                rules="required"
                                slim
                            >
                                <b-form-group
                                    id="input-group-1"
                                    label="Name"
                                    label-for="input-1"
                                >
                                    <input
                                    id="input-1"
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Enter name"
                                    :class="v.classes"
                                    />
                                </b-form-group>
                                <div v-show="v.failedRules.required" class="text-error">Name cannot be empty.</div>
                            </ValidationProvider>
                            <ValidationProvider
                                v-slot="v"
                                name="description"
                                rules="required"
                                slim
                            >
                                <b-form-group
                                    id="input-group-2"
                                    label="Description"
                                    label-for="input-2"
                                >
                                    <input
                                    id="input-2"
                                    v-model="form.description"
                                    type="text"
                                    placeholder="Enter description"
                                    :class="v.classes"
                                    />
                                </b-form-group>
                                <div v-show="v.failedRules.required" class="text-error">Description cannot be empty.</div>
                            </ValidationProvider>
                            <b-form-group
                                id="input-group-3"
                                label="Image"
                            >
                                <b-img :src="form.image || '/images/default-img.jpg'" width="200px" height="200px" fluid alt="Responsive image" @click="onChosseFile"></b-img >
                                <input type="file" class="d-none" id="fileInput" ref="fileInput" accept="image/*" @change="uploadFile">
                            </b-form-group>
                            <b-form-group
                                id="input-group-4"
                                label="Category"
                            >
                                <div class="list-categoty">
                                    <b-badge v-for="cate in form.listCate" :key="cate">{{ cate }}</b-badge>
                                </div>
                                <b-button @click="isOpenSelectCate = true" variant="success">Edit</b-button>
                            </b-form-group>
                        </b-form>
                    </ValidationObserver>
                </div>
                <div class="modal-footer">
                    <b-button class="btn-submit" @click="onSubmit">{{ isEdit ? 'Save' : 'Add'}}</b-button>
                </div>
            </div>
        </div>
        <PopupCropperImg
            id="UploadCropperImage"
            ref="UploadCropperImage"
            type-upload="avatar"
            @avatarUpload="handleImgCropper"
            @close="handleCloseUpload"
        />
        <PopupSelectCategory v-if="isOpenSelectCate" :list-cate-data="form.listCate" @submit="handleSelectCate" @hide="isOpenSelectCate = false"></PopupSelectCategory>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import PopupCropperImg from "@/components/PopupCropperImg";
import PopupSelectCategory from "@/components/PopupSelectCategory";
export default {
    props: {
        id: {
            type: [String, Number],
            require: true
        },
        item: {
            type: Object,
            default: () => {}
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Add new list'
        },
        isClose: {
            type: Boolean,
            default: true
        }
    },
    components: {
        PopupCropperImg,
        PopupSelectCategory
    },
    data() {
        return {
            name: null,
            listData: [],
            form: {
                id: null,
                name: null,
                description: null,
                image: null,
                listCate: []
            },
            isOpenSelectCate: false
        };
    },
    computed: {
        listManager() {
            return this.$store.state.listManager;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.show();
        });
        $(this.$el).on('hidden.bs.modal', e => {
            if (this.$el === e.target)
                this.$emit('hide');
        });
        if (this.isEdit) {
            this.form = JSON.parse(JSON.stringify(this.item));
        }
    },
    beforeDestroy() {
        this.hide();
    },
    methods: {
        ...mapActions(['addNewItem', 'editItem']),
        show() {
            $(this.$el).modal('show');
        },
        hide() {
            $(this.$el).modal('hide');
        },
        async onSubmit() {
            const validate = await this.$refs.ValidationObserver.validate();
            if (!validate)
                return;
            if (this.isEdit) {
                this.editItem({idList: this.id, item: this.form});
                this.$nextTick(() => {
                    this.hide();
                    this.$emit('handleEdit');
                });
            } else {
                this.form.id = Date.now().toString();
                this.addNewItem({idList: this.id, item: this.form});
                this.$nextTick(() => {
                    this.hide();
                    this.$emit('handleEdit');
                });
            }
        },
        onChosseFile() {
            this.$refs.fileInput.click();
        },
        uploadFile(event) {
            const i = event.target;
            if(i.files && i.files[0]) {
                this.$nextTick(()=>{
                    this.$refs.UploadCropperImage.show(i.files[0]);
                });
            }
        },
        handleImgCropper(canvas) {
            if(canvas) {
                canvas.toBlob(blob=>{
                    const reader = new FileReader();
                        reader.onload = (e)=>{
                            this.form.image = e.target.result;
                        };
                        reader.readAsDataURL(blob);
                        document.getElementById('fileInput').value = '';
                });
            }
        },
        handleCloseUpload(typeUpload) {
            if(typeUpload === 'avatar')
                document.getElementById('fileInput').value = '';
        },
        handleSelectCate(list) {
            this.form.listCate = list;
        }
    }
};
</script>

<style lang="scss" scoped>
#popupEditDetail {
    .modal-dialog {
        .modal-content {
            margin: auto;
            max-height: 600px;
            padding: 40px;
            padding-bottom: 20px;
        }
    }
    .modal-body {
        border-top: 1px solid #979797;
        padding: 20px 0;
        h4 {
            color: #606266;
        }
        .close-btn {
            color: #000000;
            text-decoration: none;
            &:hover {
                color: green;
                text-decoration: underline;
            }
        }
        .form-content {
            overflow: auto;
            max-height: 300px;
            input {
                width: 100%;
                height: 3rem;
                border: 1px solid #d2d2d2;
                font-size: 1rem;
                outline: none;
                padding: 1rem;
                &:focus {
                    border: 2px solid green;
                }
            }
            .list-categoty {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .badge {
                    margin: 0 0.5rem 0.5rem 0;
                    padding: 15px;
                    font-size: 1rem;
                }
            }
        }
    }
    .modal-footer {
        margin-top: 1rem;
        border-top: 1px solid #979797;
        padding: 20px 0 0 0;
        .btn-submit {
            margin: 0;
            border: none;
            border-radius: 0;
            background-color: green;
            color: #fff;
            font-size: 1rem;
            padding: 10px 25px;
            &.disabled {
                cursor: not-allowed;
                color: #656565;
                background-color: #f5f5f5;
            }
        }
    }
    .text-error {
        margin-top: 0.5rem;
        color: red;
        font-size: 0.8rem;
    }
}

</style>
