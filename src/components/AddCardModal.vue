<template>
  <div v-if="isVisible" class="add-credit-card-overlay" @click="closeModal">
    <div class="add-credit-card-modal" @click.stop>
      <div class="modal-header">
        <h2>Añadir nueva tarjeta</h2>
        <button class="close-button" @click="closeModal">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m18 6-12 12" />
            <path d="m6 6 12 12" />
          </svg>
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

                <!-- Card Type Badge -->
                <div class="card-type-badge">
                  {{ formData.cardType.toUpperCase() }}
                </div>

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
          <form @submit.prevent="handleSubmit">
            <!-- Card Type Selection -->
            <div class="form-group">
              <label class="form-label">Tipo de tarjeta</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input
                    v-model="formData.cardType"
                    name="cardType"
                    type="radio"
                    value="credit"
                  >
                  <span class="radio-custom" />
                  Tarjeta de Crédito
                </label>
                <label class="radio-option">
                  <input
                    v-model="formData.cardType"
                    name="cardType"
                    type="radio"
                    value="debit"
                  >
                  <span class="radio-custom" />
                  Tarjeta de Débito
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="cardNumber">Número de la tarjeta</label>
              <input
                id="cardNumber"
                v-model="formData.cardNumber"
                :class="['form-input', { 'error': !!errors.cardNumber }]"
                maxlength="19"
                placeholder="1234 5678 9012 3456"
                @input="formatCardNumber"
              >
              <span v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cardHolder">Nombre del dueño</label>
              <input
                id="cardHolder"
                v-model="formData.cardHolder"
                :class="['form-input', { 'error': !!errors.cardHolder }]"
                placeholder="JOHN DOE"
                @input="formatCardHolder"
              >
              <span v-if="errors.cardHolder" class="error-message">{{ errors.cardHolder }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="expiryMonth">Mes de Venc.</label>
                <select
                  id="expiryMonth"
                  v-model="formData.expiryMonth"
                  :class="['form-input', { 'error': !!errors.expiryMonth }]"
                >
                  <option value="">Mes</option>
                  <option v-for="month in months" :key="month.value" :value="month.value">
                    {{ month.label }}
                  </option>
                </select>
                <span v-if="errors.expiryMonth" class="error-message">{{ errors.expiryMonth }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="expiryYear">Año de venc.</label>
                <select
                  id="expiryYear"
                  v-model="formData.expiryYear"
                  :class="['form-input', { 'error': !!errors.expiryYear }]"
                >
                  <option value="">Año</option>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
                <span v-if="errors.expiryYear" class="error-message">{{ errors.expiryYear }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="cvv">CVV</label>
                <input
                  id="cvv"
                  v-model="formData.cvv"
                  :class="['form-input', { 'error': !!errors.cvv }]"
                  maxlength="4"
                  placeholder="123"
                  @input="formatCvv"
                >
                <span v-if="errors.cvv" class="error-message">{{ errors.cvv }}</span>
              </div>
            </div>

            <div class="form-actions">
              <button
                class="cancel-button"
                type="button"
                @click="closeModal"
              >
                Cancelar
              </button>
              <button
                class="submit-button"
                :disabled="!isFormValid"
                type="submit"
              >
                Agregar Tarjeta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

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
          cardType: 'credit', // Nuevo campo para tipo de tarjeta
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
        return this.formData.cardHolder || 'TU NOMBRE'
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
          { value: '01', label: '01 - Enero' },
          { value: '02', label: '02 - Febrero' },
          { value: '03', label: '03 - Marzo' },
          { value: '04', label: '04 - Abril' },
          { value: '05', label: '05 - Mayo' },
          { value: '06', label: '06 - Junio' },
          { value: '07', label: '07 - Julio' },
          { value: '08', label: '08 - Agosto' },
          { value: '09', label: '09 - Septiembre' },
          { value: '10', label: '10 - Octubre' },
          { value: '11', label: '11 - Noviembre' },
          { value: '12', label: '12 - Diciembre' },
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
          this.formData.cardType && // Validar que se haya seleccionado un tipo
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
          cardType: 'credit', // Reset al valor por defecto
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
          this.errors.cardNumber = 'El número de tarjeta debe tener al menos 13 dígitos'
        } else if (!this.isValidCardNumber(cardNumber)) {
          this.errors.cardNumber = 'Número de tarjeta inválido'
        } else {
          delete this.errors.cardNumber
        }
      },
      validateCardHolder () {
        if (this.formData.cardHolder.length === 0) {
          delete this.errors.cardHolder
        } else if (this.formData.cardHolder.length < 2) {
          this.errors.cardHolder = 'El nombre debe tener al menos 2 caracteres'
        } else if (!/^[A-Z\s]+$/.test(this.formData.cardHolder)) {
          this.errors.cardHolder = 'El nombre solo puede contener letras y espacios'
        } else {
          delete this.errors.cardHolder
        }
      },
      validateCvv () {
        if (this.formData.cvv.length === 0) {
          delete this.errors.cvv
        } else if (this.formData.cvv.length < 3) {
          this.errors.cvv = 'El CVV debe tener al menos 3 dígitos'
        } else {
          delete this.errors.cvv
        }
      },
      isValidCardNumber (cardNumber) {
        // Algoritmo de Luhn para validación de tarjetas
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
        // Validar todos los campos
        this.validateCardNumber()
        this.validateCardHolder()
        this.validateCvv()

        if (!this.formData.expiryMonth) {
          this.errors.expiryMonth = 'Por favor selecciona el mes de vencimiento'
        } else {
          delete this.errors.expiryMonth
        }

        if (!this.formData.expiryYear) {
          this.errors.expiryYear = 'Por favor selecciona el año de vencimiento'
        } else {
          delete this.errors.expiryYear
        }

        if (this.isFormValid) {
          const cardData = {
            type: this.formData.cardType.toUpperCase(), // Incluir el tipo de tarjeta
            number: this.formData.cardNumber.replace(/\s/g, ''),
            expirationDate: `${this.formData.expiryMonth}/${this.formData.expiryYear}`,
            fullName: this.formData.cardHolder,
            cvv: this.formData.cvv,
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
  max-width: 100vh;
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
  background: linear-gradient(135deg, #000000, #000000);
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

/* Card Type Badge */
.card-type-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
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

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #d28d8d;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
  box-sizing: border-box;
  color: #000000; /* Make input text black */
}

.form-input:focus {
  outline: none;
  border-color: #000000;
}

.form-input.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}

/* Radio Group Styles */
.radio-group {
  display: flex;
  gap: 24px;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d28d8d;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s;
}

.radio-option input[type="radio"]:checked + .radio-custom {
  border-color: #000000;
  background-color: #000000;
}

.radio-option input[type="radio"]:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
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
  border: none;
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
  background: #d28d8d;
  color: white;
}

.submit-button:hover:not(:disabled) {
  background: #d28d8d;
}

.submit-button:disabled {
  background: #d28d8d;
  cursor: not-allowed;
  opacity: 0.6;
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

  .radio-group {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
