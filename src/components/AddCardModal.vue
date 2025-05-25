<template>
  <div v-if="isVisible" class="add-credit-card-overlay" @click="closeModal">
    <div class="add-credit-card-modal" @click.stop>
      <div class="modal-header">
        <h2>Añadir nueva tarjeta de crédito</h2>
        <button class="close-button" @click="closeModal">
          <v-icon style="color: #1f2937">mdi-close</v-icon>
        </button>
      </div>

      <div class="modal-content">
        <!-- Card Preview -->
        <div class="card-preview-section">
          <h3>Vista previa</h3>
          <div class="credit-card-container">
            <div class="credit-card" :class="[cardType.toLowerCase()]">
              <div class="credit-card__front">
                <div class="credit-card__chip" />

                <div class="credit-card__number">
                  <span>{{ displayCardNumber.slice(0, 4) }}</span>
                  <span>{{ displayCardNumber.slice(4, 8) }}</span>
                  <span>{{ displayCardNumber.slice(8, 12) }}</span>
                  <span>{{ displayCardNumber.slice(12, 16) }}</span>
                </div>

                <div class="credit-card__details">
                  <div class="credit-card__holder">
                    <div class="credit-card__label">Dueño</div>
                    <div class="credit-card__name">{{ displayCardHolder }}</div>
                  </div>
                  <div class="credit-card__expires">
                    <div class="credit-card__label">Vence en</div>
                    <div class="credit-card__date">{{ displayExpiryMonth }}/{{ displayExpiryYear }}</div>
                  </div>
                </div>

                <div class="credit-card__logo">
                  <div v-if="cardType === 'Visa'" class="visa-logo">VISA</div>
                  <div v-else-if="cardType === 'Mastercard'" class="mastercard-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Section -->
        <div class="form-section">
          <v-form ref="form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <v-text-field
                id="cardNumber"
                v-model="formData.cardNumber"
                color="#d28d8d"
                :error="!!errors.cardNumber"
                :error-messages="errors.cardNumber"
                label="Número de la tarjeta"
                maxlength="19"
                placeholder="1234 5678 9012 3456"
                variant="outlined"
                @input="formatCardNumber"
              />
            </div>

            <div class="form-group">
              <v-text-field
                id="cardHolder"
                v-model="formData.cardHolder"
                color="#d28d8d"
                :error="!!errors.cardHolder"
                :error-messages="errors.cardHolder"
                label="Nombre del dueño"
                placeholder="John Doe"
                variant="outlined"
                @input="formatCardHolder"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <v-select
                  id="expiryMonth"
                  v-model="formData.expiryMonth"
                  color="#d28d8d"
                  :error="!!errors.expiryMonth"
                  :error-messages="errors.expiryMonth"
                  item-title="label"
                  item-value="value"
                  :items="months"
                  label="Mes de Venc."
                  variant="outlined"
                />
              </div>

              <div class="form-group">
                <v-select
                  id="expiryYear"
                  v-model="formData.expiryYear"
                  color="#d28d8d"
                  :error="!!errors.expiryYear"
                  :error-messages="errors.expiryYear"
                  item-title="label"
                  item-value="value"
                  :items="years.map(year => ({ label: year, value: year }))"
                  label="Año de venc."
                  variant="outlined"
                />
              </div>

              <div class="form-group">
                <v-text-field
                  id="cvv"
                  v-model="formData.cvv"
                  color="#d28d8d"
                  :error="!!errors.cvv"
                  :error-messages="errors.cvv"
                  label="CVV"
                  maxlength="4"
                  placeholder="123"
                  variant="outlined"
                  @input="formatCvv"
                />
              </div>
            </div>

            <div class="form-actions">
              <v-btn
                class="cancel-button"
                color="#d28d8d"
                variant="outlined"
                @click="closeModal"
              >
                Cancel
              </v-btn>
              <v-btn
                class="submit-button"
                color="#d28d8d"
                :disabled="!isFormValid"
                type="submit"
              >
                Add Card
              </v-btn>
            </div>
          </v-form>
        </div>
      </div></div></div></template>

<script>
  export default {
    name: 'AddCreditCardModal',
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['close', 'card-added'],
    data () {
      return {
        formData: {
          cardNumber: '',
          cardHolder: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: '',
        },
        errors: {},
      }
    },
    computed: {
      displayCardNumber () {
        const cardNumber = this.formData.cardNumber.replace(/\s/g, '')
        return (cardNumber + '0000000000000000').substring(0, 16)
      },
      displayCardHolder () {
        return this.formData.cardHolder || 'YOUR NAME'
      },
      displayExpiryMonth () {
        return this.formData.expiryMonth || '12'
      },
      displayExpiryYear () {
        return this.formData.expiryYear || '25'
      },
      cardType () {
        const cardNumber = this.displayCardNumber
        const firstDigit = cardNumber.charAt(0)
        const firstTwoDigits = parseInt(cardNumber.substring(0, 2))
        const firstFourDigits = parseInt(cardNumber.substring(0, 4))

        if (firstDigit === '4') {
          return 'Visa'
        } else if ((firstTwoDigits >= 51 && firstTwoDigits <= 55) ||
          (firstFourDigits >= 2221 && firstFourDigits <= 2720)) {
          return 'Mastercard'
        } else {
          return 'Unknown'
        }
      },
      months () {
        return [
          { value: '01', label: '01 - January' },
          { value: '02', label: '02 - February' },
          { value: '03', label: '03 - March' },
          { value: '04', label: '04 - April' },
          { value: '05', label: '05 - May' },
          { value: '06', label: '06 - June' },
          { value: '07', label: '07 - July' },
          { value: '08', label: '08 - August' },
          { value: '09', label: '09 - September' },
          { value: '10', label: '10 - October' },
          { value: '11', label: '11 - November' },
          { value: '12', label: '12 - December' },
        ]
      },
      years () {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let i = 0; i < 20; i++) {
          const year = (currentYear + i).toString().slice(-2)
          years.push(year)
        }
        return years
      },
      isFormValid () {
        return this.formData.cardNumber.replace(/\s/g, '').length >= 13 &&
          this.formData.cardHolder.length >= 2 &&
          this.formData.expiryMonth &&
          this.formData.expiryYear &&
          this.formData.cvv.length >= 3 &&
          Object.keys(this.errors).length === 0
      },
    },
    watch: {
      isVisible (newVal) {
        if (newVal) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
        }
      },
    },
    beforeUnmount () {
      document.body.style.overflow = ''
    },
    methods: {
      closeModal () {
        this.resetForm()
        this.$emit('close')
      },
      resetForm () {
        this.formData = {
          cardNumber: '',
          cardHolder: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: '',
        }
        this.errors = {}
      },
      formatCardNumber (event) {
        let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '')
        value = value.substring(0, 16)
        value = value.replace(/(.{4})/g, '$1 ').trim()
        this.formData.cardNumber = value
        this.validateCardNumber()
      },
      formatCardHolder (event) {
        this.formData.cardHolder = event.target.value.toUpperCase()
        this.validateCardHolder()
      },
      formatCvv (event) {
        this.formData.cvv = event.target.value.replace(/\D/g, '').substring(0, 4)
        this.validateCvv()
      },
      validateCardNumber () {
        const cardNumber = this.formData.cardNumber.replace(/\s/g, '')
        if (cardNumber.length === 0) {
          delete this.errors.cardNumber
        } else if (cardNumber.length < 13) {
          this.errors.cardNumber = 'Card number must be at least 13 digits'
        } else if (!this.isValidCardNumber(cardNumber)) {
          this.errors.cardNumber = 'Invalid card number'
        } else {
          delete this.errors.cardNumber
        }
      },
      validateCardHolder () {
        if (this.formData.cardHolder.length === 0) {
          delete this.errors.cardHolder
        } else if (this.formData.cardHolder.length < 2) {
          this.errors.cardHolder = 'Name must be at least 2 characters'
        } else if (!/^[A-Z\s]+$/.test(this.formData.cardHolder)) {
          this.errors.cardHolder = 'Name can only contain letters and spaces'
        } else {
          delete this.errors.cardHolder
        }
      },
      validateCvv () {
        if (this.formData.cvv.length === 0) {
          delete this.errors.cvv
        } else if (this.formData.cvv.length < 3) {
          this.errors.cvv = 'CVV must be at least 3 digits'
        } else {
          delete this.errors.cvv
        }
      },
      isValidCardNumber (cardNumber) {
        // Luhn algorithm for card validation
        let sum = 0
        let isEven = false

        for (let i = cardNumber.length - 1; i >= 0; i--) {
          let digit = parseInt(cardNumber.charAt(i))

          if (isEven) {
            digit *= 2
            if (digit > 9) {
              digit -= 9
            }
          }

          sum += digit
          isEven = !isEven
        }

        return sum % 10 === 0
      },
      handleSubmit () {
        // Validate all fields
        this.validateCardNumber()
        this.validateCardHolder()
        this.validateCvv()

        if (!this.formData.expiryMonth) {
          this.errors.expiryMonth = 'Please select expiry month'
        } else {
          delete this.errors.expiryMonth
        }

        if (!this.formData.expiryYear) {
          this.errors.expiryYear = 'Please select expiry year'
        } else {
          delete this.errors.expiryYear
        }

        if (this.isFormValid) {
          const cardData = {
            cardNumber: this.formData.cardNumber.replace(/\s/g, ''),
            cardHolder: this.formData.cardHolder,
            expiryMonth: this.formData.expiryMonth,
            expiryYear: this.formData.expiryYear,
            cvv: this.formData.cvv,
            id: Date.now(),
          }

          this.$emit('card-added', cardData)
          this.closeModal()
        }
      },
    },
  }
</script>

<style scoped>
.add-credit-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.add-credit-card-modal {
  background: #ffe9e5;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #6b7280;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 32px;
}

.card-preview-section h3 {
  margin: 0 0 24px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

/* Credit Card Preview Styles */
.credit-card-container {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.credit-card {
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background: linear-gradient(45deg, #1a1a1a, #444);
  color: white;
  overflow: hidden;
}

.credit-card.visa {
  background: linear-gradient(135deg, #0055b7, #00338d);
}

.credit-card.mastercard {
  background: linear-gradient(135deg, #1a1a1a, #333);
}

.credit-card__front {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.credit-card__chip {
  width: 40px;
  height: 30px;
  background: linear-gradient(135deg, #bbb, #ddd);
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  position: relative;
  margin-bottom: 20px;
}

.credit-card__chip::before,
.credit-card__chip::after {
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

.credit-card__number {
  font-family: 'Courier New', monospace;
  font-size: 20px;
  letter-spacing: 3px;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.credit-card__number span {
  display: block;
}

.credit-card__details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.credit-card__holder,
.credit-card__expires {
  flex: 1;
}

.credit-card__label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 5px;
}

.credit-card__name,
.credit-card__date {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.credit-card__logo {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.visa-logo {
  font-family: Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: white;
  letter-spacing: -1px;
}

.mastercard-logo {
  display: inline-block;
  height: 1.5em;
  width: 2.4em;
  position: relative;
}

.mastercard-logo::before,
.mastercard-logo::after {
  border-radius: 50%;
  content: "";
  display: inline-block;
  height: 1.5em;
  position: absolute;
  width: 1.5em;
}

.mastercard-logo::before {
  background-color: #eb001b;
  left: 0;
  top: 0;
}

.mastercard-logo::after {
  background-color: #f79e1b;
  right: 0;
  top: 0;
  opacity: 0.8;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #d28d8d;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group input.error,
.form-group select.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.cancel-button,
.submit-button {
  flex: 1;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  color: #374151;
}

.cancel-button:hover {
  background: #e5e7eb;
}

.submit-button {
  background: #3b82f6;
  border: 2px solid #3b82f6;
  color: white;
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
  border-color: #2563eb;
}

.submit-button:disabled {
  background: #d28d8d;
  border-color: #1f2937;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .form-actions {
    flex-direction: column;
  }

  .add-credit-card-modal {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
}
</style>
