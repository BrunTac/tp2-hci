<script setup>
  import { ref } from 'vue'
  import Sidebar from '@/components/Sidebar.vue';
  import CreditCard from '@/components/CreditCard.vue';
  import { useCardStore } from '@/stores/cardStore.js';
  import AddCreditCardModal from '@/components/AddCardModal.vue'
  import Header from '@/components/Header.vue';
  import { reactive } from 'vue'

  const cardStore = useCardStore();
  const pageSize = 5;
  let index = 0;
  const dialog = ref(false)

  const renderedCards = reactive([]);

  const isLoading = ref(true);
  const hasLoaded = ref(false);

  onMounted(async () => {
    isLoading.value = true;
    await cardStore.getAll();
    hasLoaded.value = true;
    isLoading.value = false;
  });

  function getCardsPage () {
    const toReturn = cardStore.cards.slice(index, index + pageSize);
    index += pageSize;
    return toReturn;
  }

  // La función real debería tener esta pinta, mientras tanto usamos la otra versión
  function load ({ done }) {
    if (!hasLoaded.value) {
      // Espera y vuelve a intentar después
      const interval = setInterval(() => {
        if (hasLoaded.value) {
          clearInterval(interval);
          load({ done }); // Intenta de nuevo
        }
      }, 100);
      return;
    }

    const res = getCardsPage();
    if (!res || res.length === 0) {
      done('empty');
    } else {
      renderedCards.push(...res);
      done('ok');
    }
  }


  async function handleCardAdded (cardData) {
    const aux = await cardStore.add(cardData);
    cardStore.cards.push(aux);
    renderedCards.push(aux);
    console.log(renderedCards)
    index++;
  }

</script>

<template>
  <Header>Tarjetas</Header>
  <Sidebar />
  <v-container class="main-container">
    <v-card-text style="font-size: 3rem; font-weight: 500;">Tarjetas</v-card-text>
    <v-infinite-scroll
      :height="500"
      :items="renderedCards"
      style="scrollbar-width: none;"
      :width="600"
      @load="load"
    >
      <template #default>
        <CreditCard
          v-for="(item) in renderedCards"
          :key="item.id"
          :cvv="item.cvv"
          :expiration-date="item.expirationDate"
          :full-name="item.fullName"
          :number="item.number"
          :type="item.type"
        />
      </template>
      <template #empty>
        <v-card-text class="text-center" style="font-size: 1.5rem; font-weight: 500;">No hay más tarjetas</v-card-text>
      </template>
    </v-infinite-scroll>

    <v-divider class="my-5 w-33" :thickness="3" />

    <v-card
      class="home-card"
      flat
      style="display: flex; flex-direction: column; margin-top: 0.2vh; width: auto; height: auto;"
    >
      <v-container
        style="display: flex; align-items: center; background-color: transparent; padding-top: 0.5vh;"
      >
        <v-row style="margin-bottom: 0.2vh;">
          <v-col class="button-container" cols="auto">
            <v-btn
              class="grey-button"
              rounded="lg"
              @click="dialog = true"
            >
              <v-icon size="2.8vw">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-card-text style="font-size: 1.2vw; font-weight: 450; padding-top: 1.5vh; padding-bottom: 0vh;">Agregar Manualmente</v-card-text>
            <AddCreditCardModal
              :is-visible="dialog"
              @card-added="handleCardAdded"
              @close="dialog = false"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
.home-card {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 1.5em;
  color: black;
}

.grey-button {
  background-color: #ece6f0;
  color: #4d4d4d;
  min-width: 0;
  width: 3.5vw;
  height: 6vh;
  padding: 0;
  margin: 1em;
}

.main-container {
  width:50%;
  margin-top: 0.5em;
  margin-left: auto;
  margin-right: auto;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
