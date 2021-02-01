<template>
    <div
        class="modal fade CropperImage"
        tabindex="-1"
        role="dialog"
    >
        <div
            class="modal-dialog modal-dialog-centered modal-xl"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-body overflow-auto">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="modal-title">
                            UPLOAD PHOTO
                        </h4>
                        <a
                            class="close-btn"
                            href="javascript:;"
                            @click="close"
                        >
                            CLOSE
                        </a>
                    </div>
                    <div
                        class="position-relative"
                    >
                        <cropper
                            v-if="isLoadCropper"
                            ref="cropper"
                            class="upload-example-cropper"
                            :src="image"
                            :stencil-component="isUploadRound ? 'circle-stencil' : 'rectangle-stencil'"
                            :stencil-props="stencilProps()"
                            :image-restriction="restrictionType"
                            background-class="black"
                        />
                        <div class="vertical-btn">
                            <div
                                class="square-button"
                                title="Zoom In"
                                @click="zoomCropper(1.15)"
                            >
                                <b-icon class="icon" icon="zoom-in"></b-icon>
                            </div>
                            <div
                                class="square-button"
                                title="Zoom Out"
                                @click="zoomCropper(0.85)"
                            >
                                <b-icon class="icon" icon="zoom-out"></b-icon>
                            </div>
                        </div>
                        <input
                            id="inputFile"
                            ref="inputFile"
                            key="inputFile"
                            hidden
                            type="file"
                            accept="image/*"
                            @change.stop="reSelectImg($event)"
                            @click="$event.target.value = null"
                        >
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button
                        class="btn-upload reset mr-3"
                        @click="changeImg"
                    >
                        RE SELECT IMAGE
                    </button>
                    <button
                        class="btn-upload"
                        @click="upload"
                    >
                        UPLOAD
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
    components: {
        Cropper
    },
    props: {
        isUploadRound: {
            type: Boolean,
            default: false
        },
        typeUpload: {
            type: String,
            default: 'normal'
        },
        aspectRatioCustom: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            image: null,
            loading: false,
            objectFit: 'cover',
            objectFitList: ['contain', 'cover', 'fill', 'scale-down', 'none'],
            isLoadCropper: true,
            aspectRatio: null,
            restrictionType: 'stencil',
        };
    },
    methods: {
        show(file) {
            if (file)
                this.loadImage(file);
            else
                return;
            $(this.$el).modal({backdrop: 'static', keyboard: false});
        },
        hide() {
            this.image = null;
            $(this.$el).modal('hide');
        },
        loadImage(file) {
            this.image = null;
            switch (this.typeUpload) {
            case 'avatar':
                this.aspectRatio = 1;
                break;
            case 'background':
                this.aspectRatio = 3.9;
                break;
            case 'medias':
                this.aspectRatio = this.aspectRatioCustom;
                break;
            default:
                break;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
            this.loading = true;
        },
        upload() {
            const {canvas} = this.$refs.cropper.getResult();
            if (canvas) {
                switch (this.typeUpload) {
                case 'normal':
                    this.$emit('normalUpload', canvas);
                    break;
                case 'avatar':
                    this.$emit('avatarUpload', canvas);
                    break;
                case 'background':
                    this.$emit('backgroundUpload', canvas);
                    break;
                case 'medias':
                    this.$emit('mediasUpload', canvas);
                    break;
                default:
                    break;
                }
            }
            this.hide();
        },
        stencilProps() {
            return {
                aspectRatio: this.aspectRatio,
                handlersClasses: {
                    default: 'handler',
                    hover: 'handler--hover',
                    eastNorth: 'handler--custom',
                    north: 'handler--custom',
                    westNorth: 'handler--custom',
                    west: 'handler--custom',
                    westSouth: 'handler--custom',
                    south: 'handler--custom',
                    eastSouth: 'handler--custom',
                    east: 'handler--custom',
                },
                linesClasses: {
                    default: 'line-custom'
                }
            };
        },
        resetCropper() {
            this.isLoadCropper = false;
            this.$nextTick(() => {
                this.isLoadCropper = true;
            });
        },
        close() {
            this.$emit('close', this.typeUpload);
            this.hide();
        },
        zoomCropper(value) {
            this.$refs.cropper.zoom(value);
        },
        changeImg() {
            this.$refs.inputFile.click();
        },
        reSelectImg(event) {
            const i = event.target;
            if (i.files && i.files[0]) {
                this.$nextTick(() => {
                    this.loadImage(i.files[0]);
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.CropperImage {
    .modal-content {
        margin: auto;
        height: 100%;
        padding: 40px;
        padding-bottom: 20px;
    }
    .modal-body {
        border-top: 1px solid #979797;
        padding: 20px 0;
        position: relative;
    }
    .modal-title {
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
    .upload-example-cropper {
        height: 100%;
        width: 100%;
    }
    .vertical-btn {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        .square-button {
            cursor: pointer;
            padding: 1rem 2rem;
            align-items: center;
            color: #000000;
            font-size: 1.5rem;
        }
    }

    .button {
        color: white;
        font-size: 16px;
        padding: 10px 20px;
        background: #3fb37f;
        cursor: pointer;
        transition: background 0.5s;
    }

    .button:hover {
        background: #38d890;
    }

    .modal-footer {
        .btn-upload {
            color: #ffffff;
            font-size: 1rem;
            line-height: 1.56rem;
            letter-spacing: 0.041rem;
            background-color: green;
            padding: 10px 25px;
            margin-top: 20px;
            border: none;
            outline: none;
            min-width: 10rem;
            min-height: 3rem;
            width: 219px;
            height: 40px;
            &.reset {
                background-color: #f5f5f5;
                color: #656565;
            }
        }
    }
    .description {
        font-size: 1.2rem;
        line-height: 1.4rem;
        letter-spacing: 0.185rem;
    }
}

@media (min-width: 1200px){
    .modal-xl {
        max-width: 1059px !important;
    }
}
@media (min-width: 992){
    .modal-xl {
        max-width: 800px;
    }
}
</style>
