<template>
    <div
        id="popupSelectCate"
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
                        name="list-cate"
                        rules="required"
                        slim>
                        <div class="list-cate mt-3">
                            <b-form-select v-model="listCate" :options="listCategory" multiple :select-size="4" :class="v.classes"></b-form-select>
                        </div>
                    <div v-show="v.failedRules.required" class="text-error">This category cannot be empty.</div>
                    </ValidationProvider>
                </div>
                <div class="modal-footer">
                    <b-button class="btn-submit" @click="save">Save</b-button>
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
            default: 'Popup Select Category'
        },
        isClose: {
            type: Boolean,
            default: true
        },
        listCateData: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            name: null,
            listCate: [],
        };
    },
    computed: {
        listCategory() {
            return this.$store.state.listCategory;
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
        if (this.listCateData.length > 0) {
            this.listCate = this.listCateData;
        }
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
        async save() {
            const validate = await this.$refs.validateName.validate();
            if (!validate.valid)
                return;
            this.$emit('submit', this.listCate);
            this.$nextTick(() => {
                this.hide();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
#popupSelectCate {
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
