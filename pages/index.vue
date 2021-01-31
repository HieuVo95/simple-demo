<template>
  <div>
    <div>
      <h1>Overview</h1>
      <div class="content-body">
        <div class="group-header">
          <h3>Total {{ listItem.length }}</h3>
          <div>
            <b-button
              variant="outline-success"
              @click="isOpenAddListPopup = true"
              >Add new list</b-button
            >
          </div>
        </div>
        <div class="list-card">
          <b-row>
            <b-col
              cols="12"
              md="6"
              sm="12"
              xl="3"
              lg="4"
              v-for="item in listItem"
              :key="item.id"
            >
              <CardInfoList :item="item" @remove="remove"></CardInfoList>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <PopupAddList
      v-if="isOpenAddListPopup"
      @hide="isOpenAddListPopup = false"
    ></PopupAddList>
    <PopupMessage
      v-if="isOpenMessage"
      title="Success"
      message="Delete success"
      is-show-ok-button
      @hide="isOpenMessage = false"
    ></PopupMessage>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PopupAddList from "@/components/PopupEditInfoList";
import PopupMessage from "@/components/PopupMessage";
import CardInfoList from "@/components/CardInfoList";
export default {
  components: {
    PopupAddList,
    PopupMessage,
    CardInfoList
  },
  data() {
    return {
      listItem: [],
      isOpenAddListPopup: false,
      isOpenMessage: false
    };
  },
  computed: {
    listManager() {
      return this.$store.state.listManager;
    }
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    ...mapActions(['removeListById']),
    getAllList() {
      if (this.listManager) {
      this.listItem = this.listManager;
    }
    },
    remove(id) {
      this.removeListById({id: id});
      this.$nextTick(() => {
        this.isOpenMessage = true;
        this.getAllList();
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.group-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list-card {
  margin-top: 1rem;
}
</style>
