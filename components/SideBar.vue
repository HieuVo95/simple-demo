<template>
  <div>
    <b-sidebar
      id="sidebar-1"
      title="Sidebar"
      shadow
      bg-variant="dark"
      text-variant="light"
      width="180px"
      backdrop-variant="dark"
      backdrop
      no-header
    >
      <div class="py-2 w-100 h-100">
        <div class="content-menu">
            <nuxt-link to="/" class="d-flex justify-content-center align-items-center">
                <Logo class="logo" />
            </nuxt-link>
            <ul class="menu">
                <li class="menu-item" :class="$route.path === '/' && 'active'">
                    <nuxt-link
                        to="/"
                        class="menu-link"
                    >
                        <b-icon class="icon mr-3" icon="house-door-fill"></b-icon>
                        <div>Home</div>
                    </nuxt-link>
                </li>
                <li v-for="item in menuListManager" :key="item.id" class="menu-item" :class="$route.path === `/list-manager/${item.id}` && 'active'">
                    <nuxt-link
                        :to="`/list-manager/${item.id}`"
                        class="menu-link"
                    >
                        <b-avatar variant="light" :text="item.id.toString().padStart(2, 0)" class="mr-3" size="sm"></b-avatar>
                        <div>{{ item.name }}</div>
                    </nuxt-link>
                </li>
                <li class="menu-item text-center">
                    <b-button class="mt-3" variant="outline-success" @click="addList">Add new list</b-button>
                </li>
            </ul>
        </div>
      </div>
    </b-sidebar>
    <PopupAddList v-if="isOpenAddListPopup" @hide="isOpenAddListPopup = false"></PopupAddList>
  </div>
</template>

<script>
import PopupAddList from "@/components/PopupEditInfoList"

export default {
    components: {
        PopupAddList
    },
    data() {
        return {
            menuListManager: [],
            isOpenAddListPopup: false
        };
    },
    computed: {
        listManager() {
            return this.$store.state.listManager;
        }
    },
    mounted() {
        this.menuListManager = this.listManager;
    },
    methods: {
        addList() {
            this.isOpenAddListPopup = true;
        }
    }
}
</script>

<style lang="scss" scoped>
ul{
    padding-left: 0;
    li{
        list-style: none;
    }
}
.content-menu {
    height: 100%;
    .logo {
        max-width: 100px;
        max-height: 100px;
        padding: 20px;
    }
    .menu-item {
        width: 100%;
        border-left: 4px solid transparent;
        &.active{
            border-left-color: #f8f9fa;
            a {
                color: #fff;
                text-decoration: none;
            }
        }
    }
    .menu-link {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 1rem;
    }
    &::-webkit-scrollbar {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border: 1px solid #212121;
    }
    &::-webkit-scrollbar-track {
        box-shadow: none;
        -webkit-box-shadow: none;
        background-color: transparent;
    }
}
.menu a{
    font-family: cursive;
    font-size: 1.5rem;
    color: rgba(172,182,191,.5);
    cursor: pointer;
    &:hover{
        color: #fff;
        text-decoration: none;
    }
}
</style>