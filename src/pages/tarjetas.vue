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
  <div class="d-flex flex-column align-center">
    <h1 class="my-10">Tarjetas</h1>
    <v-infinite-scroll
      :height="600"
      :items="cards"
      style="scrollbar-width: none;"
      :width="600"
      @load="load"
    >
      <template v-for="(item, index) in cards" :key="index">
        <CreditCard
          :card-holder="item.cardHolder"
          :card-number="item.cardNumber"
          :cvv="item.cvv"
          :expiry-month="item.expiryMonth"
          :expiry-year="item.expiryYear"
        />
      </template>
    </v-infinite-scroll>

    <v-card class="w-25 my-10 d-flex flex-row justify-space-around" style="background-color: #fff2ef">
      <div>
        <v-btn
          class="rounded-circle grey-button"
          size="small"
          style="width: 2vw; min-width: auto; height: 2vw"
        >
          <v-icon
            size="1.2vw"
          >mdi-camera-outline</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          class="rounded-circle grey-button"
          size="small"
          style="width: 2vw; min-width: auto; height: 2vw"
        >
          <v-icon
            size="1.2vw"
          >mdi-pencil-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.grey-button {
  background-color: #ece6f0;
  color: #4d4d4d;
  min-width: 0;
  width: 3.5vw;
  height: 6vh;
  padding: 0;
}
</style>
