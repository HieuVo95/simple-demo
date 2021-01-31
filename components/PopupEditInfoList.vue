<template>
    <div
        id="popupEditInfoList"
        class="modal fade"
        tabindex="-1"
        role="dialog"
    >
        <div
            class="modal-dialog modal-dialog-centered"
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
                    <ValidationProvider
                        ref="validateName"
                        v-slot="v"
                        name="nameList"
                        :rules="checkList() ? 'required|hasError' : 'required'"
                        slim>
                        <div class="input-name mt-3">
                            <input type="text" placeholder="Input name here.." v-model="name" :class="v.classes" />
                        </div>
                    <div v-show="v.failedRules.required" class="text-error">This name cannot be empty.</div>
                    <div v-show="v.failedRules.hasError" class="text-error">This name already exists</div>
                    </ValidationProvider>
                </div>
                <div class="modal-footer">
                    <b-button class="btn-submit" @click="addList">Add list</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    props: {
        title: {
            type: String,
            default: 'Add new list'
        },
        isClose: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            name: null,
            listData: []
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
        this.listData = JSON.parse(JSON.stringify(this.listManager));
    },
    beforeDestroy() {
        this.hide();
    },
    methods: {
        ...mapActions(['addNewList']),
        show() {
            $(this.$el).modal('show');
        },
        hide() {
            $(this.$el).modal('hide');
        },
        checkList() {
            if (this.name) {
                let err = this.listData.some(o => {
                    return o.name.toLowerCase() === this.name.toLowerCase();
                });
                return err;
            }
        },
        async addList() {
            const validate = await this.$refs.validateName.validate();
            if (!validate.valid)
                return;
            this.addNewList({name: this.name});
            this.$nextTick(() => {
                this.hide();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
#popupEditInfoList {
    .modal-dialog {
        .modal-content {
            margin: auto;
            height: 100%;
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
        .input-name {
            display: flex;
            justify-content: center;
            align-items: center;
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
