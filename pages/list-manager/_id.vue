<template>
  <div class="list-detail" v-if="Object.keys(item).length > 0">
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="title">
      <h1>{{ item.name }}</h1>
      <b-button
        variant="outline-success"
        @click="
          isEdit = false;
          isOpenEdit = true;
        "
        >Add new item</b-button
      >
    </div>
    <b-form-group
        id="input-group-img"
        label="Image"
    >
        <b-img :src="item.image || '/images/default-img.jpg'" width="200px" height="200px" fluid alt="Responsive image" @click="onChosseFile" style="cursor: pointer;"></b-img >
        <input type="file" class="d-none" id="fileInput" ref="fileInput" accept="image/*" @change="uploadFile">
        
    </b-form-group>
    <div class="table-content">
      <b-table-simple bordered show-empty responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th v-for="(field, index) in fields" :key="index">{{
              field
            }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-if="item.list.length > 0">
          <b-tr v-for="(detailItem, index) in item.list" :key="detailItem.id">
            <b-td style="width: 5%">{{ index + 1 }}</b-td>
            <b-td style="width: 15%">
                <b-img :src="detailItem.image || '/images/default-img.jpg'" width="200px" height="200px" fluid alt="Responsive image" style="cursor: pointer;"></b-img>
            </b-td>
            <b-td style="width: 10%">{{ detailItem.name }}</b-td>
            <b-td style="width: 35%">{{ detailItem.description }}</b-td>
            <b-td style="width: 10%">{{ detailItem.listCate.toString() }}</b-td>
            <b-td class="group-btn" style="width: 15%">
              <b-button variant="warning" @click="editItem(detailItem)">Edit</b-button>
              <b-button variant="danger" @click="itemEdit = detailItem; isOpenMessage = true">Remove</b-button>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tbody v-else>
          <b-tr>
            <b-td colspan="6" class="text-center">No data</b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="6" variant="secondary" class="text-right">
              Total Items: <b>{{ item.list.length }}</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </div>
    <PopupEditDetail
      v-if="isOpenEdit"
      :id="item.id"
      :item="itemEdit"
      :isEdit="isEdit"
      :title="!isEdit ? 'Add new item' : 'Edit item'"
      @hide="isOpenEdit = false"
      @handleEdit="getList"
    ></PopupEditDetail>
    <PopupMessage
      :item="itemEdit"
      v-if="isOpenMessage"
      title="Warning"
      message="Are you sure you want to delete this item?"
      is-show-ok-button
      is-show-cancel-button
      @submit="remove"
      @hide="isOpenMessage = false"
    ></PopupMessage>
    <PopupMessage
      v-if="isOpenMessageSuccess"
      title="Success"
      message="Delete success"
      is-show-ok-button
      @hide="isOpenMessage = false"
    ></PopupMessage>
    <PopupCropperImg
        id="UploadCropperImage"
        ref="UploadCropperImage"
        type-upload="avatar"
        @avatarUpload="handleImgCropper"
        @close="handleCloseUpload"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PopupEditDetail from "@/components/PopupEditDetail";
import PopupMessage from "@/components/PopupMessage";
export default {
  components: {
    PopupEditDetail,
    PopupMessage
  },
  data() {
    return {
      item: {},
      breadcrumb: [
        {
          text: "Home",
          to: "/"
        }
      ],
      fields: ["Num.", "Image", "Name", "Description", "Categories", "Action"],
      isOpenEdit: false,
      isEdit: false,
      itemEdit: {},
      isOpenMessage: false,
      isOpenMessageSuccess: false,
      message: {
          title: 'Warning',
          text: 'Are you sure you want to delete this item?',
          isShowOkBtn: true,
          isShowCancelBtn: true
      },
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.getList();
    }
  },
  methods: {
    ...mapActions(["getListById", "removeItemById", "updateImgList"]),
    async getList() {
      const result = await this.getListById({ id: this.$route.params.id });
      if (result) {
        this.item = result;
        this.breadcrumb[1] = { text: result.name, active: true };
      }
    },
    editItem(item) {
      this.isEdit = true;
      this.itemEdit = item;
      this.$nextTick(() => {
        this.isOpenEdit = true;
      });
    },
    remove(item) {
        this.removeItemById({idList: this.$route.params.id, idItem: item.id});
        this.$nextTick(() => {
            this.isOpenMessageSuccess = true;
            this.getList();
        });
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
                        this.updateImgList({id: this.item.id, image: e.target.result});
                        // this.item.image = e.target.result;
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
  }
};
</script>
<style lang="scss" scoped>
.list-detail {
  .breadcrumb {
    background-color: transparent;
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
}
</style>
