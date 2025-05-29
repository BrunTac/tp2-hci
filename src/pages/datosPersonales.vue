<template>
  <Sidebar />
  <Header>Datos Personales</Header>
  <v-container
    v-if="currUser && currAccount"
    style="display: flex; justify-content: center; align-items: baseline; margin-top: 2rem"
  >
    <v-card class="card" color="#FFE9E5" height="auto" width="35vw" style="margin-top: 12vh">
      <div style="display: flex; justify-content: flex-start; margin-top: 3rem; margin-left: 3rem">
        <v-avatar size="70" class="me-4" color="#d28d8d">
          <span style="font-size: 2rem; font-weight: bold; color: white;">
            {{ currUser.firstName?.charAt(0).toUpperCase() }}
          </span>
        </v-avatar>
        <v-card-title style="font-size: 2rem; color: black;">
          {{ currUser.firstName }} {{ currUser.lastName }}
        </v-card-title>
      </div>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 30vw;" />
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-text-field
          v-model="currAccount.cvu"
          label="CVU"
          readonly
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        >
          <template #append-inner>
            <v-btn icon variant="plain" @click="copyToClipboard(currAccount.cvu)">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
        </v-text-field>

        <v-text-field
          v-model="aliasEdit"
          label="Alias"
          :readonly="!editingAlias"
          style="width: 25vw; margin-top: 0.5rem;"
          variant="outlined"
        >
          <template #append-inner>
            <template v-if="!editingAlias">
              <v-btn icon variant="plain" @click="editingAlias = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon variant="plain" @click="copyToClipboard(currAccount.alias)">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <template v-else>
              <v-btn icon variant="plain" @click="confirmAliasEdit">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </template>
          </template>
        </v-text-field>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 30vw;" />
      </v-list-item>

      <v-list-item class="d-flex justify-center" style="margin-bottom: 2vh; margin-top: 1vh;">
        <v-text-field
          v-model="currUser.email"
          label="Email"
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
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useAccountStore } from '@/stores/accountStore';
import { Account } from '@/api/account.js';
import { User } from '@/api/user.js';

const editingAlias = ref(false);
const showBottomSheet = ref(false);
const copyMessage = ref('');
const aliasEdit = ref('');

const accountStore = useAccountStore();
const userStore = useUserStore();
const currAccount = ref<Account | null>(null);
const currUser = ref<User | null>(null);

onMounted(async () => {
  currUser.value = await userStore.getCurrentUser();
  currAccount.value = await accountStore.getAccount();
  if (currAccount.value) {
    aliasEdit.value = currAccount.value.alias;
  }
});

function confirmAliasEdit() {
  accountStore.updateAlias(aliasEdit.value);
  editingAlias.value = false;
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      copyMessage.value = 'CVU copiado!';
      showBottomSheet.value = true;
      setTimeout(() => {
        showBottomSheet.value = false;
      }, 3000);
    })
    .catch(() => {
      copyMessage.value = 'Error al copiar el CVU';
      showBottomSheet.value = true;
    });
};
</script>

<style scoped>
.card {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 0.4rem;
  color: black;
}

.home-card {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 1.5rem;
  color: black;
}
</style>

