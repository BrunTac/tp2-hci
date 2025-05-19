<template>
  <div class="credit-card-container">
    <div class="credit-card" :class="[cardType.toLowerCase(), { 'flipped': showBack }]">
      <!-- Front of card -->
      <div class="credit-card__front">
        <div class="credit-card__chip" />
        <div class="credit-card__contactless">
          <div class="credit-card__contactless-icon" />
        </div>
        <div class="credit-card__number">
          <template v-for="(group, index) in formattedCardNumber" :key="index">
            <div class="credit-card__number-group">
              {{ hideCardDetails && index > 0 && index < 3 ? '••••' : group }}
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
          <div v-else-if="cardType === 'Mastercard'" class="mastercard-logo">
            <template v-if="mastercardLogoUrl">
              <img alt="Mastercard" class="mastercard-logo-image" :src="mastercardLogoUrl">
            </template>
            <template v-else>
              <div class="mastercard-circles">
                <div class="mastercard-circle mastercard-circle--red" />
                <div class="mastercard-circle mastercard-circle--orange" />
                <div class="mastercard-circle mastercard-circle--yellow" />
              </div>
            </template>
          </div>
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
          <div v-else-if="cardType === 'Mastercard'" class="mastercard-logo">
            <template v-if="mastercardLogoUrl">
              <img alt="Mastercard" class="mastercard-logo-image" :src="mastercardLogoUrl">
            </template>
            <template v-else>
              <div class="mastercard-circles">
                <div class="mastercard-circle mastercard-circle--red" />
                <div class="mastercard-circle mastercard-circle--orange" />
                <div class="mastercard-circle mastercard-circle--yellow" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="credit-card-controls">
      <v-btn class="mr-2" color="primary" variant="tonal" @click="toggleCardSide">
        <template #prepend>
          <v-icon>{{ showBack ? 'mdi-rotate-left' : 'mdi-rotate-right' }}</v-icon>
        </template>
        {{ showBack ? 'Show Front' : 'Show Back' }}
      </v-btn>
      <v-btn color="secondary" variant="tonal" @click="toggleHideDetails">
        <template #prepend>
          <v-icon>{{ hideCardDetails ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </template>
        {{ hideCardDetails ? 'Show Details' : 'Hide Details' }}
      </v-btn>
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
      toggleCardSide () {
        this.showBack = !this.showBack
      },
    },
  }
</script>

<style scoped>
.credit-card-container {
  width: 100%;
  max-width: 25em;
  margin: 0 auto;
}

.credit-card {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 63%;
  border-radius: 0.75em;
  perspective: 62.5em;
  margin-bottom: 1.25em;
  box-shadow: 0 0.625em 1.25em rgba(0, 0, 0, 0.19), 0 0.375em 0.375em rgba(0, 0, 0, 0.23);
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.credit-card.flipped {
  transform: rotateY(180deg);
}

.credit-card__front, .credit-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.75em;
  padding: 1.5625em;
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
  top: 1.5625em;
  left: 1.5625em;
  width: 2.8125em;
  height: 2.1875em;
  background: linear-gradient(135deg, #bbb, #ddd);
  border-radius: 0.375em;
  box-shadow: 0 0.0625em 0.0625em rgba(0, 0, 0, 0.3);
}

.credit-card__chip::before, .credit-card__chip::after {
  content: '';
  position: absolute;
  width: 80%;
  height: 0.0625em;
  background: rgba(0, 0, 0, 0.3);
  left: 10%;
}

.credit-card__chip::before {
  top: 30%;
}

.credit-card__chip::after {
  top: 60%;
}

/* Contactless */
.credit-card__contactless {
  position: absolute;
  top: 1.5625em;
  left: 5em;
  width: 1.875em;
  height: 1.875em;
}

.credit-card__contactless-icon {
  position: relative;
  width: 100%;
  height: 100%;
}

.credit-card__contactless-icon::before {
  content: '';
  position: absolute;
  top: 0.3125em;
  left: 0;
  width: 100%;
  height: 70%;
  border-top: 0.125em solid rgba(255, 255, 255, 0.7);
  border-radius: 50% 50% 0 0;
}

.credit-card__contactless-icon::after {
  content: '';
  position: absolute;
  top: 0.625em;
  left: 0.3125em;
  width: 70%;
  height: 50%;
  border-top: 0.125em solid rgba(255, 255, 255, 0.7);
  border-radius: 50% 50% 0 0;
}

/* Card Number */
.credit-card__number {
  position: absolute;
  top: 45%;
  left: 1.5625em;
  right: 1.5625em;
  display: flex;
  justify-content: space-between;
  font-family: 'Courier New', monospace;
  font-size: 1.375em;
  letter-spacing: 0.125em;
  color: white;
  text-shadow: 0 0.0625em 0.0625em rgba(0, 0, 0, 0.3);
}

.credit-card__number-group {
  display: inline-block;
  text-align: center;
  min-width: 3.75em;
}

/* Card Details */
.credit-card__details {
  position: absolute;
  bottom: 1.5625em;
  left: 1.5625em;
  right: 5.625em;
  display: flex;
  justify-content: space-between;
}

.credit-card__holder, .credit-card__expires {
  width: 48%;
}

.credit-card__label {
  font-size: 0.625em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 0.3125em;
  white-space: nowrap;
}

.credit-card__name, .credit-card__date {
  font-family: 'Courier New', monospace;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 0.0625em;
  text-shadow: 0 0.0625em 0.0625em rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Card Logos */
.credit-card__logo {
  position: absolute;
  bottom: 1.5625em;
  right: 1.5625em;
}

.visa-logo {
  font-family: Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  font-style: italic;
  color: white;
  letter-spacing: -0.0625em;
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
  top: 2.5em;
  left: 0;
  width: 100%;
  height: 2.5em;
  background-color: #333;
}

.credit-card__signature-panel {
  position: absolute;
  top: 6.25em;
  left: 1.5625em;
  width: calc(100% - 3.125em);
  height: 2.5em;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.625em;
}

.credit-card__signature {
  width: 70%;
  height: 1.25em;
  background: repeating-linear-gradient(
    45deg,
    #ccc,
    #ccc 0.125em,
    #eee 0.125em,
    #eee 0.25em
  );
}

.credit-card__cvv {
  font-family: 'Courier New', monospace;
  font-size: 0.875em;
  color: black;
  letter-spacing: 0.125em;
}

.credit-card__back-logo {
  position: absolute;
  bottom: 1.5625em;
  right: 1.5625em;
}

.credit-card-controls {
  display: flex;
  justify-content: center;
  margin-top: 1.25em;
}

</style>
