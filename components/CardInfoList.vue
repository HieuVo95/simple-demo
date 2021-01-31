<template>
  <div>
    <b-card
      class="card-info"
      :title="item.name"
      :img-src="item.image || '/images/default-img.jpg'"
      img-top
    >
      <h3 class="number-item">{{ item.list.length }}</h3>
      <div class="footer-btn">
        <b-button variant="info" @click="toEdit">Edit</b-button>
        <b-button variant="danger" @click="isOpenMessage = true">Remove</b-button>
      </div>
    </b-card>
    <PopupMessage
      v-if="isOpenMessage"
      title="Warning"
      message="Are you sure you want to delete this list?"
      is-show-ok-button
      is-show-cancel-button
      @submit="remove"
      @hide="isOpenMessage = false"
    ></PopupMessage>
  </div>
</template>

<script>
import PopupMessage from "@/components/PopupMessage";
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    PopupMessage
  },
  data() {
    return {
      isOpenMessage: false
    };
  },
  methods: {
    toEdit() {
      this.$router.push(`/list-manager/${this.item.id}`);
    },
    remove() {
      this.$emit("remove", this.item.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-info {
  margin-bottom: 1rem;
  width: 300px;
  border-radius: 12px;
  border: 4px solid #a5c38b;
  background-color: #fff;
  color: #a5c38b;
  .card-img-top {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .number-item {
    font-size: 4rem;
    text-align: center;
  }
  .footer-btn {
    margin: 0 -4px;
    button {
      width: 127px;
    }
  }
}
</style>
