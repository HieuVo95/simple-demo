<template>
    <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
    >
        <div
            class="modal-dialog modal-dialog-centered"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-body text-center">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <a
                            class="close-btn ml-auto"
                            href="javascript:;"
                            @click="hide"
                        >
                            CLOSE
                        </a>
                    </div>
                    <h4>{{ title }}</h4>
                    <p class="description">
                        {{ message }}
                    </p>
                    <div class="d-flex justify-content-around align-items-center mt-3 group-btn">
                        <button
                            v-if="isShowCancelButton"
                            class="btn-cancel"
                            @click="cancel"
                        >
                            {{ cancelText }}
                        </button>
                        <button
                            v-if="isShowOkButton"
                            class="btn-ok"
                            @click="submit"
                        >
                            {{ submitText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        title: {
            type: String,
            default: 'Warning'
        },
        message: {
            type: String,
            default: ''
        },
        isShowOkButton: {
            type: Boolean,
            default: false
        },
        isShowCancelButton: {
            type: Boolean,
            default: false
        },
        submitText: {
            type: String,
            default: () => 'OK'
        },
        cancelText: {
            type: String,
            default: () => 'CANCEL'
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
    },
    beforeDestroy() {
        this.hide();
    },
    methods: {
        show() {
            $(this.$el).modal({backdrop: 'static', keyboard: false});
        },
        hide() {
            $(this.$el).modal('hide');
        },
        cancel() {
            this.$emit('cancel', this.item);
            this.hide();
        },
        submit() {
            this.$emit('submit', this.item);
            this.hide();
        }
    }
};
</script>
<style lang="scss" scoped>
.modal-dialog {
    .modal-content {
        width: 460px;
        margin: auto;
        padding: 40px;
    }
}
.modal-body {
    border-top: 1px solid #979797;
    border-bottom: 1px solid #979797;
    padding: 20px 0;
    h4 {
        font-size: 2rem;
        line-height: 1.9rem;
        color: #000000;
    }
    .close-btn {
        color: #000000;
            text-decoration: none;
            &:hover {
                color: green;
                text-decoration: underline;
            }
    }
    .description {
        margin-top: 1rem;
        letter-spacing: 0.05rem;
        line-height: 1.8rem;
        color: #2c2c2c;
    }
    .group-btn {
        margin-bottom: 20px;
        .btn-cancel {
            color: #656565;
            font-size: 1rem;
            line-height: 1.56rem;
            letter-spacing: 0.041rem;
            background-color: #f5f5f5;
            padding: 10px 25px;
            border: none;
            outline: none;
            min-width: 10rem;
            min-height: 3rem;
            width: 100px;
            height: 40px;
        }
        .btn-ok {
            color: #ffffff;
            font-size: 1rem;
            line-height: 1.56rem;
            letter-spacing: 0.041rem;
            background-color: green;
            padding: 10px 25px;
            border: none;
            outline: none;
            min-width: 10rem;
            min-height: 3rem;
            width: 100px;
            height: 40px;
        }
    }
}
.popup-allCategories .modal-body h4 {
    font-family: "HKGrotesk-Bold";
    font-size: 2rem;
    line-height: 2.5rem;
    color: #d95842;
    text-transform: uppercase;
    margin-bottom: 2.5rem;
}

</style>
