<template>
  <div class="main-content">
    <NavBar></NavBar>
    <SideBar></SideBar>
    <div class="col-right">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar"
import SideBar from "@/components/SideBar"
export default {
  components: {
    NavBar,
    SideBar
  }
}
</script>
<style lang="scss">
.main-content {
  height: 100vh;
  overflow: hidden;
  background-color: #F5F7FA;
  .col-right {
    padding: 0 40px 20px 200px;
    overflow-y: auto;
    height: 100%;
  }
}
</style>
