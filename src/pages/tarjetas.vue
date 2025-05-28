<script setup>
  import { computed, onMounted, ref } from 'vue'
  import Sidebar from '@/components/Sidebar.vue';
  import CreditCard from '@/components/CreditCard.vue';
  import { useCardStore } from '@/stores/cardStore.js';
  import AddCreditCardModal from '@/components/AddCardModal.vue'
  import Header from '@/components/Header.vue';
  import { reactive } from 'vue'

  const pageSize = 5;
  const dialog = ref(false);
  const selectedCardId = ref(null);
  const filterType = ref('all'); // 'all', 'credit', 'debit'

  let index = 0;
  const renderedCards = reactive([]);

  const isLoading = ref(true);
  const hasLoaded = ref(false);

  const cardStore = useCardStore();

  onMounted(async () => {
    isLoading.value = true;
    await cardStore.getAll();
    hasLoaded.value = true;
    isLoading.value = false;
  });

  // Computed para filtrar las tarjetas
  const filteredCards = computed(() => {
    if (filterType.value === 'all') {
      return cardStore.cards;
    }
    return cardStore.cards.filter(card => card.type.toLowerCase() === filterType.value);
  });

  function getCardsPage () {
    const toReturn = filteredCards.value.slice(index, index + pageSize);
    index += pageSize;
    return toReturn;
  }

  function load ({ done }) {
    if (!hasLoaded.value) {
      const interval = setInterval(() => {
        if (hasLoaded.value) {
          clearInterval(interval);
          load({ done });
        }
      }, 100);
      return;
    }

    const res = getCardsPage();
    if (!res || res.length === 0) {
      done('empty');
    } else {
      renderedCards.push(...res);
      console.log(renderedCards);
      done('ok');
    }
  }

  // Función para reiniciar el scroll cuando cambia el filtro
  function resetScroll () {
    renderedCards.length = 0;
    index = 0;
    // Trigger a reload of the infinite scroll
    const res = getCardsPage();
    if (res && res.length > 0) {
      renderedCards.push(...res);
    }
  }

  function onFilterChange () {
    resetScroll();
    selectedCardId.value = null;
  }

  async function handleCardAdded (cardData) {
    const aux = await cardStore.add(cardData);
    cardStore.cards.push(aux);
    // Solo agregar a renderedCards si pasa el filtro actual
    if (filterType.value === 'all' || aux.type.toLowerCase() === filterType.value) {
      renderedCards.push(aux);
      index++;
    }
  }

  function selectCard (cardId) {
    if (selectedCardId.value === cardId) {
      selectedCardId.value = null;
    } else {
      selectedCardId.value = cardId;
    }
  }

  async function deleteSelectedCard () {
    if (!selectedCardId.value) return;

    await cardStore.remove(selectedCardId.value);

    // Eliminar de renderedCards
    const cardIndex = renderedCards.findIndex(card => card.id === selectedCardId.value);
    if (cardIndex !== -1) {
      renderedCards.splice(cardIndex, 1);
    }

    // Eliminar de cardStore.cards
    const storeIndex = cardStore.cards.findIndex(card => card.id === selectedCardId.value);
    if (storeIndex !== -1) {
      cardStore.cards.splice(storeIndex, 1);
    }

    selectedCardId.value = null;
    index--;
  }
</script>

<template>
  <Header>Tarjetas</Header>
  <Sidebar />
  <v-container class="main-container">
    <div class="header-section">
      <h1 class="page-title">Tarjetas</h1>
      <div class="filter-container">
        <label class="filter-label">Filtrar por tipo:</label>
        <select
          v-model="filterType"
          class="filter-select"
          @change="onFilterChange"
        >
          <option value="all">Todas</option>
          <option value="credit">Crédito</option>
          <option value="debit">Débito</option>
        </select>
      </div>
    </div>

    <div class="cards-section">

      <!-- Infinite scroll de tarjetas -->
      <v-infinite-scroll
        :height="500"
        :items="renderedCards"
        style="scrollbar-width: none;"
        :width="600"
        @load="load"
      >
        <template #default>
          <div
            v-for="(item) in renderedCards"
            :key="item.id"
            class="card-wrapper"
            :class="{ 'selected': selectedCardId === item.id }"
            @click="selectCard(item.id)"
          >
            <CreditCard
              :cvv="item.cvv"
              :expiration-date="item.expirationDate"
              :full-name="item.fullName"
              :number="item.number"
              :type="item.type"
            />
            <div v-if="selectedCardId === item.id" class="selection-indicator">
              <div class="checkmark">✓</div>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="empty-state">
            <v-icon color="grey-lighten-1" size="64">mdi-credit-card-off-outline</v-icon>
            <p class="empty-text">
              {{ filterType === 'all' ? 'No hay más tarjetas' : `No hay tarjetas de ${filterType === 'credit' ? 'crédito' : 'débito'}` }}
            </p>
          </div>
        </template>
      </v-infinite-scroll>
    </div>

    <!-- Botones de acción -->
    <div class="action-buttons-section">
      <div class="action-buttons">
        <button
          class="cancel-button"
          :disabled="!selectedCardId"
          @click="selectedCardId = null"
        >
          Cancelar
        </button>

        <button
          class="submit-button"
          @click="dialog = true"
        >
          Agregar Tarjeta
        </button>

        <button
          class="delete-button"
          :disabled="!selectedCardId"
          @click="deleteSelectedCard"
        >
          Eliminar Tarjeta
        </button>
      </div>
    </div>

    <!-- Modal para agregar tarjeta -->
    <AddCreditCardModal
      :is-visible="dialog"
      @card-added="handleCardAdded"
      @close="dialog = false"
    />
  </v-container>
</template>

<style scoped>
.main-container {
  width: 60%;
  max-width: 800px;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.header-section {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.cards-section {
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.filter-container {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 6em;
  margin-right: 1.5em;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.filter-select {
  padding: 8px 12px;
  border: 2px solid #d28d8d;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #000000;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: #000000;
}

.card-wrapper {
  padding-left: 2em;
  padding-right: 2em;
  position: relative;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.card-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-wrapper.selected {
  border: 3px solid #d28d8d;
  transform: scale(1.000001);
  padding: 3px;
  box-sizing: border-box;
}

.selection-indicator {
  position: absolute;
  top: -15px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #d28d8d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.checkmark {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.empty-text {
  font-size: 1.2rem;
  color: #666;
  margin-top: 1rem;
  margin-bottom: 0;
}

.action-buttons-section {
  width: 100%;
  padding: 1.5rem 0;
  border-top: 1px solid #e5e7eb;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

/* Estilos de botones consistentes con AddCardModal.vue */
.cancel-button,
.submit-button,
.delete-button {
  flex: 1;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-button {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  color: #374151;
}

.cancel-button:hover:not(:disabled) {
  background: #e5e7eb;
}

.submit-button {
  background: #d28d8d;
  color: white;
}

.submit-button:hover {
  background: #c17a7a;
}

.delete-button {
  background: #ef4444;
  color: white;
}

.delete-button:hover:not(:disabled) {
  background: #dc2626;
}

.cancel-button:disabled,
.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-container {
    width: 95%;
    padding: 0 1rem;
  }

  .header-section {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .filter-container {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: flex-end;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
