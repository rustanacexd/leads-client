<template>
  <div class="user">
    <div class="info">
      <a data-toggle="collapse" @click="toggleMenu" href="javascript:void(0)">
           <span>
             Admin
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <li>
              <a href="javascript:void(0)">
                <span class="sidebar-mini">S</span>
                <span class="sidebar-normal">Settings</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="logout">
                <span class="sidebar-mini">LO</span>
                <span class="sidebar-normal">Logout</span>
              </a>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: false
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      },
      logout () {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
