<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/admin">GO2</router-link>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color=""
           data-image="static/img/background/background-2.jpg">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form @submit.prevent>
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header">
                      <h3 class="card-title">Login</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>Username</label>
                        <input v-model="username" type="text" placeholder="Enter username"
                               class="form-control input-no-border">
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input v-model="password" type="password" placeholder="Password"
                               class="form-control input-no-border">
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button @click.prevent="login" type="submit" class="btn btn-fill btn-wd ">Let's go</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              Insert GO2 Copyright Here
            </div>
          </div>
        </footer>
        <div class="full-page-background" style="background: #000"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import swal from 'sweetalert2'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push('/admin')
        })
          .catch(error => {
            swal({
              title: 'Error',
              text: error.message,
              type: 'error',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-danger btn-fill'
            })
          })
      }
    }
  }
</script>
<style>
</style>
