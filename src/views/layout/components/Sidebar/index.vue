<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <logo v-if="showLogo"
          :collapse="isCollapse" />
    <el-menu :default-active="$route.path"
             :collapse="isCollapse"
             :background-color="variables.menuBg"
             :text-color="variables.menuText"
             :active-text-color="variables.menuActiveText"
             :collapse-transition="false"
             mode="vertical">
      <sidebar-item v-for="route in routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import Logo from './Logo'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    showLogo () {
      return true;
    }
  },
  mounted () {
    // console.log('index.vue -> routes : ')
    // console.log(this.routes)
  }
}
</script>
