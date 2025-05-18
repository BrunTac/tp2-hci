<script setup>
  import { ref } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';

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
      { cardNum: '123456789', cardType: 'visa' },
      { cardNum: '789456123', cardType: 'visa' },
      { cardNum: '789456789', cardType: 'visa' },
      { cardNum: '789456789', cardType: 'visa' },
      { cardNum: '789456789', cardType: 'visa' },
      { cardNum: '123456789', cardType: 'visa' },
      { cardNum: '789456123', cardType: 'visa' },
      { cardNum: '789456789', cardType: 'visa' },
      { cardNum: '789456789', cardType: 'visa' },
      { cardNum: '789456789', cardType: 'visa' },
    ];
  }
</script>

<template>
  <Sidebar />
  <div>
    <h1>Tarjetas</h1>
    <v-infinite-scroll :height="300" :items="cards" @load="load">
      <template v-for="(item, index) in cards" :key="index">
        <div>
          {{ item.cardNum }}
        </div>
      </template>
    </v-infinite-scroll>

    <v-card class="w-25 d-flex flex-row justify-space-around" style="background-color: #fff2ef">
      <div>
        <v-btn class="mx-4" size="x-large">
          <v-icon>mdi-camera-outline</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn class="mx-4" size="x-large">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
