<template>
  <Sidebar />
  <Header>Datos Personales</Header>
  <v-container style="display: flex; justify-content: center; align-items: baseline; margin-top: 2rem">
    <v-card class="card" color="#FFE9E5" height="80vh" width="35vw">
      <div style="display: flex; justify-content: flex-start; margin-top: 3rem; margin-left: 3rem">
        <div class="avatar-container">
          <label class="avatar-overlay" for="profile-upload">
            <span class="overlay-text">Presione para cambiar la foto</span>
          </label>
          <v-avatar :image="profileImage" size="70" />
          <input
            id="profile-upload"
            accept="image/*"
            style="display: none"
            type="file"
            @change="handleUpload"
          />
        </div>
        <v-card-title style="font-size: 2rem; color: black;">{{ userStore.nombre }} {{ userStore.apellido }}</v-card-title>
      </div>
      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 30vw;" />
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-text-field
          v-model="userStore.cvu"
          label="CVU"
          readonly
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        ><template #append-inner>
          <v-btn icon variant="plain" @click="copyToClipboard(cvu)">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </template></v-text-field>
        <v-text-field
          v-model="userStore.alias"
          label="Alias"
          :readonly="!editingAlias"
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        ><template #append-inner>
          <template v-if="!editingAlias">
            <v-btn icon variant="plain" @click="editingAlias = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon variant="plain" @click="copyToClipboard(alias)">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>

          <template v-else>
            <v-btn icon variant="plain" @click="confirmAliasEdit">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
        </template></v-text-field>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 30vw;" />
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-text-field
          v-model="userStore.DNI"
          label="DNI"
          readonly
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        />
        <v-text-field
          v-model="userStore.tel"
          label="Telefono"
          readonly
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        />
        <v-text-field
          v-model="userStore.mail"
          label="Mail"
          readonly
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        />

      </v-list-item>

    </v-card>
  </v-container>
  <v-bottom-sheet v-model="showBottomSheet" transition="slide-y-reverse-transition">
    <v-card class="home-card" style="display: flex; align-items: center; justify-content: center;">
      <v-card-text style="font-size: 1.2vw; font-weight: 450;">{{ copyMessage }}</v-card-text>
    </v-card>
  </v-bottom-sheet>

</template>

<script setup lang="ts">
  import Sidebar from '@/components/Sidebar.vue';
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
  import { ref } from 'vue'
  const editingAlias = ref(false)
  const showBottomSheet = ref(false)
  const copyMessage = ref('')
  const profileImage = ref('/src/assets/profile_M.png')

  function confirmAliasEdit () {
    editingAlias.value = false
  }

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text)
      .then(() => {
        copyMessage.value = 'CVU copiado!'
        showBottomSheet.value = true
        setTimeout(() => {
          showBottomSheet.value = false
        }, 3000)
      })
      .catch(() => {
        copyMessage.value = 'Error al copiar el CVU'
        showBottomSheet.value = true
      })
  }
  function handleUpload (event) {
    const file = event.target.files[0]
    if (file) {
      profileImage.value = URL.createObjectURL(file)
    }
  }

</script>

<style scoped>

.card {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 0.4rem;
  color: black;
}

.avatar-container {
  position: relative;
  width: 70px;
  height: 70px;
  cursor: pointer;
}

.avatar-overlay {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-text {
  color: white;
  font-size: 0.65rem;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 0 4px;
}

.avatar-container:hover .avatar-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
.avatar-container:hover .overlay-text {
  opacity: 1;
}

</style>
