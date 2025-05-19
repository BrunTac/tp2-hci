<template>
  <div class="credit-card-container">
    <div
      class="credit-card"
      :class="[cardType.toLowerCase(), { 'flipped': showBack }]"
      @click="flipCard"
    >      <!-- Front of card -->
      <div class="credit-card__front">
        <div class="credit-card__chip" />
        <div
          class="credit-card__toggle-details"
          @click.stop="toggleHideDetails"
        >
          <v-icon color="white" size="small">
            {{ hideCardDetails ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
          </v-icon>
        </div>
        <div class="credit-card__number">
          <template v-for="(group, index) in formattedCardNumber" :key="index">
            <div class="credit-card__number-group">
              {{ hideCardDetails && index < 3 ? '••••' : group }}
            </div>
          </template>
        </div>
        <div class="credit-card__details">
          <div class="credit-card__holder">
            <div class="credit-card__label">Card Holder</div>
            <div class="credit-card__name">{{ cardHolder }}</div>
          </div>
          <div class="credit-card__expires">
            <div class="credit-card__label">Expires</div>
            <div class="credit-card__date">{{ expiryMonth }}/{{ expiryYear }}</div>
          </div>
        </div>
        <div class="credit-card__logo">
          <div v-if="cardType === 'Visa'" class="visa-logo">VISA</div>
          <div v-else-if="cardType === 'Mastercard'" class="mastercard-logo" />
        </div>
      </div>

      <!-- Back of card -->
      <div class="credit-card__back">
        <div class="credit-card__magnetic-stripe" />
        <div class="credit-card__signature-panel">
          <div class="credit-card__signature" />
          <div class="credit-card__cvv">
            {{ hideCardDetails ? '•••' : cvv }}
          </div>
        </div>
        <div class="credit-card__back-logo">
          <div v-if="cardType === 'Visa'" class="visa-logo">VISA</div>
          <div v-else-if="cardType === 'Mastercard'" class="mastercard-logo" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'CreditCard',
    props: {
      cardNumber: {
        type: String,
        default: '5111111111111111',
      },
      cardHolder: {
        type: String,
        default: 'JOHN DOE',
      },
      expiryMonth: {
        type: String,
        default: '12',
      },
      expiryYear: {
        type: String,
        default: '25',
      },
      cvv: {
        type: String,
        default: '123',
      },
      mastercardLogoUrl: {
        type: String,
        default: '', // Set to empty by default, user can provide a URL
      },
    },
    data () {
      return {
        hideCardDetails: true,
        showBack: false,
      }
    },
    computed: {
      cardType () {
        const firstDigit = this.cardNumber.charAt(0)
        const firstTwoDigits = parseInt(this.cardNumber.substring(0, 2))
        const firstFourDigits = parseInt(this.cardNumber.substring(0, 4))

        if (firstDigit === '4') {
          return 'Visa'
        } else if ((firstTwoDigits >= 51 && firstTwoDigits <= 55) ||
          (firstFourDigits >= 2221 && firstFourDigits <= 2720)) {
          return 'Mastercard'
        } else {
          return 'Unknown'
        }
      },
      formattedCardNumber () {
        const groups = []
        for (let i = 0; i < this.cardNumber.length; i += 4) {
          groups.push(this.cardNumber.substring(i, i + 4))
        }
        return groups
      },
    },
    methods: {
      toggleHideDetails () {
        this.hideCardDetails = !this.hideCardDetails
      },
      flipCard () {
        this.showBack = !this.showBack
      },
    },
  }
</script>

<style scoped>
.credit-card-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.credit-card {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 63%; /* Standard credit card aspect ratio (85.6mm × 53.98mm) */
  border-radius: 12px;
  perspective: 1000px;
  margin-bottom: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.credit-card.flipped {
  transform: rotateY(180deg);
}

.credit-card__front, .credit-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 25px;
  box-sizing: border-box;
  overflow: hidden;
}

.credit-card__front {
  background: linear-gradient(45deg, #1a1a1a, #444);
  color: white;
}

.credit-card.visa .credit-card__front {
  background: linear-gradient(135deg, #0055b7, #00338d);
}

.credit-card.mastercard .credit-card__front {
  background: linear-gradient(135deg, #1a1a1a, #333);
}

.credit-card__back {
  background: linear-gradient(45deg, #333, #555);
  color: white;
  transform: rotateY(180deg);
}

/* Chip */
.credit-card__chip {
  position: absolute;
  top: 25px;
  left: 25px;
  width: 45px;
  height: 35px;
  background: linear-gradient(135deg, #bbb, #ddd);
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.credit-card__chip::before, .credit-card__chip::after {
  content: '';
  position: absolute;
  width: 80%;
  height: 1px;
  background: rgba(0, 0, 0, 0.3);
  left: 10%;
}

.credit-card__chip::before {
  top: 30%;
}

.credit-card__chip::after {
  top: 60%;
}

/* Toggle Details Icon */
.credit-card__toggle-details {
  position: absolute;
  top: 25px;
  right: 25px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.credit-card__toggle-details:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Card Number */
.credit-card__number {
  position: absolute;
  top: 45%;
  left: 25px;
  right: 25px;
  display: flex;
  justify-content: space-between;
  font-family: 'Courier New', monospace;
  font-size: 22px;
  letter-spacing: 2px;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.credit-card__number-group {
  display: inline-block;
  text-align: center;
  min-width: 60px;
}

/* Card Details */
.credit-card__details {
  position: absolute;
  bottom: 25px;
  left: 25px;
  right: 90px; /* Increased to make room for the logo */
  display: flex;
  justify-content: space-between;
}

.credit-card__holder, .credit-card__expires {
  width: 48%; /* Give each section a specific width */
}

.credit-card__label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 5px;
  white-space: nowrap;
}

.credit-card__name, .credit-card__date {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Card Logos */
.credit-card__logo {
  position: absolute;
  bottom: 25px;
  right: 25px;
}

.visa-logo {
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  color: white;
  letter-spacing: -1px;
}

.mastercard-logo {
  display: inline-block;
  height: 2em;
  isolation: isolate;
  position: relative;
  line-height: 2em;
  vertical-align: middle;
  width: 3.222em;
}

.mastercard-logo::before,
.mastercard-logo::after {
  border-radius: 1em;
  content: "";
  display: inline-block;
  height: 2em;
  position: absolute;
  width: 2em;
}

.mastercard-logo::before {
  background-color: #eb001b;
  left: 0;
  top: 0;
}

.mastercard-logo::after {
  background-color: #f79e1b;
  mix-blend-mode: hard-light;
  right: 0;
  top: 0;
}

/* Back of Card */
.credit-card__magnetic-stripe {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #333;
}

.credit-card__signature-panel {
  position: absolute;
  top: 100px;
  left: 25px;
  width: calc(100% - 50px);
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.credit-card__signature {
  width: 70%;
  height: 20px;
  background: repeating-linear-gradient(
    45deg,
    #ccc,
    #ccc 2px,
    #eee 2px,
    #eee 4px
  );
}

.credit-card__cvv {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: black;
  letter-spacing: 2px;
}

.credit-card__back-logo {
  position: absolute;
  bottom: 25px;
  right: 25px;
}

.credit-card-hint {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}
</style>
