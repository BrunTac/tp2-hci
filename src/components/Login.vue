<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center" class="login-header">
            <v-col cols="auto" class="text-center">
                <div style="display: flex; flex-direction: column;">
                    <h1 class="login-title"> DreamPay </h1>
                    <h1 class="login-subtitle"> La billetera virtual de tus suenios </h1>
                </div>
            </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="auto" style="margin-left: 35vw;">
            <h2 style="margin-top: 8vw"> Log In </h2>
            <v-form @submit.prevent>
              <v-text-field
              label="Email"
              clearable
              type="email"
              placeholder="example@gmail.com"
              variant="outlined"
              color="#d28d8d"
              width="27vw"
              style="margin-top: 1.5vw;"
              />

              <v-text-field
              label="Password"
              clearable
              type="password"
              variant="outlined"
              color="#d28d8d"
              width="27vw"
              style="margin-top: 1vw;"
              />

              <v-btn
                color="#d28d8d"
                text="white"
                rounded="lg"
                size="large"
                style="justify-self: center;"
              > Iniciar sesión </v-btn>
            </v-form>
            
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="auto" style="margin-left: 35vw;">
            
          </v-col>
        </v-row>
    </v-container>
</template>



<style scoped>

.login-page {
    background-color: white;
}

.login-title {
    font-size: 2rem;
    line-height: 1.1;
    font-weight: bold;
    color: black;
}

.login-subtitle {
    font-size: 0.75rem;
    margin-top: 0.4rem;
    font-weight: 600;
    color: black;
}

.login-header {
    background-color: #d28d8d;
}

@media (min-width: 600px) {
  .login-title {
    font-size: 2.5rem;
  }
  .login-subtitle {
    font-size: 1rem;
  }
}

@media (min-width: 960px) {
  .login-title {
    font-size: 3.5rem;
  }
  .login-subtitle {
    font-size: 1.25rem;
  }
}

@media (min-width: 1501px) {
  .login-title {
    font-size: rem;
  }
  .login-subtitle {
    font-size: 1.5rem;
  }
}

</style>