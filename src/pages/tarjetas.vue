<script setup>
  import { ref } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
  import CreditCard from '@/components/CreditCard.vue';

  const cards = ref(getCardsPage());

  // La función real debería tener esta pinta, mientras tanto usamos la otra versión
  // function load ({ done }) {
  //   const res = getCardsPage();
  //
  //   if (!res || res.length === 0) {
  //     done('empty');
  //   } else {
  //     cards.value.push(...res); // <- importante: desestructura
  //     done('ok');
  //   }
  // }

  let page = 1;
  const maxPages = 5;

  function load ({ done }) {
    if (page >= maxPages) {
      done('empty');
      return;
    }

    const res = getCardsPage();
    cards.value.push(...res);
    page++;
    done('ok');
  }


  function getCardsPage () {
    return [
      {
        cardNumber: '4111111111111111',
        cardHolder: 'JOHN DOE',
        expiryMonth: '12',
        expiryYear: '25',
        cvv: '123',
      },
      {
        cardNumber: '5500000000000004',
        cardHolder: 'JANE SMITH',
        expiryMonth: '06',
        expiryYear: '24',
        cvv: '456',
      },
      {
        cardNumber: '2223000048400011',
        cardHolder: 'ALICE JOHNSON',
        expiryMonth: '09',
        expiryYear: '27',
        cvv: '789',
      },
      {
        cardNumber: '4111222233334444',
        cardHolder: 'BOB BROWN',
        expiryMonth: '01',
        expiryYear: '26',
        cvv: '321',
      },
      {
        cardNumber: '5555555555554444',
        cardHolder: 'CHARLIE DAVIS',
        expiryMonth: '11',
        expiryYear: '28',
        cvv: '654',
      },
    ]
  }
</script>

<template>
  <Sidebar />
  <v-container class="main-container">
    <v-card-text style="font-size: 3rem; font-weight: 500;">Tarjetas</v-card-text>
    <v-infinite-scroll
      :height="600"
      :items="cards"
      style="scrollbar-width: none;"
      :width="600"
      @load="load"
    >
      <template v-for="(item) in cards" :key="item">
        <CreditCard
          :card-holder="item.cardHolder"
          :card-number="item.cardNumber"
          :cvv="item.cvv"
          :expiry-month="item.expiryMonth"
          :expiry-year="item.expiryYear"
        />
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
            >
              <v-icon size="2.8vw">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-card-text style="font-size: 1.2vw; font-weight: 450; padding-top: 1.5vh; padding-bottom: 0vh;">Agregar Manualmente</v-card-text>
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
