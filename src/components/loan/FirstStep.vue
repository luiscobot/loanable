<script setup>
import { ref, computed, onMounted, watch, inject } from "vue";
import ChevronIcon from "@/components/icons/IconChevron.vue";
import InfoIcon from "@/components/icons/IconInfo.vue";

// Access to the global loan application state
const loanStore = inject("loanStore");

// Events that this component can emit to parent components
const emit = defineEmits(["next-step"]);

// Form fields for capturing document issue date
const selectedDay = ref("");
const selectedMonth = ref("");
const selectedYear = ref("");
// User confirmation that they are the document holder
const isConfirmed = ref(false);

// Validation errors for each form field and date logic
const errors = ref({
    day: false,
    month: false,
    year: false,
    date: "",
});

// Available day options for the date selector (01-31)
const days = computed(() => {
    const daysArray = [];
    for (let i = 1; i <= 31; i++) {
        daysArray.push(i.toString().padStart(2, "0"));
    }
    return daysArray;
});

// Month names in Spanish for the dropdown selector
const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

// Available year options from current year back to 1949
const years = computed(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear; i >= 1949; i--) {
        yearsArray.push(i);
    }
    return yearsArray;
});

// Determines if all required fields are filled and valid
const isFormValid = computed(() => {
    return (
        selectedDay.value &&
        selectedMonth.value &&
        selectedYear.value &&
        isConfirmed.value &&
        !errors.value.date
    );
});

// Formatted data object ready for submission to next step
const formData = computed(() => ({
    confirmed: isConfirmed.value,
    date:
        selectedDay.value && selectedMonth.value && selectedYear.value
            ? `${selectedDay.value.padStart(2, "0")}/${selectedMonth.value.toString().padStart(2, "0")}/${selectedYear.value}`
            : null,
}));

// Validates the selected date against business rules and constraints
const validateDate = () => {
    errors.value.date = "";

    if (!selectedDay.value || !selectedMonth.value || !selectedYear.value) {
        return;
    }

    const dayNum = Number.parseInt(selectedDay.value);
    const monthNum = Number.parseInt(selectedMonth.value);
    const yearNum = Number.parseInt(selectedYear.value);

    const selectedDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();
    const minDate = new Date(1950, 0, 1);

    // Prevents future dates from being selected
    if (selectedDate > today) {
        errors.value.date = "La fecha no puede ser futura";
        return;
    }

    // Ensures date is not too old (before 1950)
    if (selectedDate < minDate) {
        errors.value.date = "La fecha debe ser posterior al 01/01/1950";
        return;
    }

    // Validates that the date actually exists (e.g., not Feb 30)
    if (
        selectedDate.getDate() !== dayNum ||
        selectedDate.getMonth() !== monthNum - 1 ||
        selectedDate.getFullYear() !== yearNum
    ) {
        errors.value.date = "La fecha seleccionada no es válida";
        return;
    }
};

// Performs complete form validation before submission
const validateForm = () => {
    errors.value = {
        day: !selectedDay.value,
        month: !selectedMonth.value,
        year: !selectedYear.value,
        date: "",
    };

    if (selectedDay.value && selectedMonth.value && selectedYear.value) {
        validateDate();
    }

    return (
        !Object.values(errors.value).some((error) => error) && isConfirmed.value
    );
};

// Handles form submission and progression to next step
const nextStep = (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    emit("next-step", formData.value);
};



// Automatically validates date whenever any date field changes
watch([selectedDay, selectedMonth, selectedYear], () => {
    if (selectedDay.value && selectedMonth.value && selectedYear.value) {
        validateDate();
    } else {
        errors.value.date = "";
    }
});

// Initializes clean error state when component loads
onMounted(() => {
    errors.value = { day: false, month: false, year: false, date: "" };
});
</script>

<template>
    <div class="first-step">
        <!-- Form for capturing document issue date and user confirmation -->
        <form class="document-form" @submit.prevent="nextStep" novalidate>
            <h2 class="form-title">
                Completa la fecha de expedición del documento*
            </h2>

            <div class="required-label">Obligatorio (*)</div>

            <!-- Date selection inputs arranged in a grid -->
            <div class="date-inputs">
                <!-- Day selector dropdown -->
                <div class="select-group">
                    <select
                        v-model="selectedDay"
                        class="date-select"
                        :class="{ error: errors.day || errors.date }"
                        name="day"
                        required
                    >
                        <option value="" disabled>Día*</option>
                        <option v-for="day in days" :key="day" :value="day">
                            {{ day }}
                        </option>
                    </select>
                    <ChevronIcon class="chevron-icon" />
                </div>

                <!-- Month selector dropdown -->
                <div class="select-group">
                    <select
                        v-model="selectedMonth"
                        class="date-select"
                        :class="{ error: errors.month || errors.date }"
                        name="month"
                        required
                    >
                        <option value="" disabled>Mes*</option>
                        <option
                            v-for="(month, index) in months"
                            :key="index"
                            :value="index + 1"
                        >
                            {{ month }}
                        </option>
                    </select>
                    <ChevronIcon class="chevron-icon" />
                </div>

                <!-- Year selector dropdown -->
                <div class="select-group">
                    <select
                        v-model="selectedYear"
                        class="date-select"
                        :class="{ error: errors.year || errors.date }"
                        name="year"
                        required
                    >
                        <option value="" disabled>Año*</option>
                        <option v-for="year in years" :key="year" :value="year">
                            {{ year }}
                        </option>
                    </select>
                    <ChevronIcon class="chevron-icon" />
                </div>
            </div>

            <!-- Display date validation errors to user -->
            <div v-if="errors.date" class="date-error">
                {{ errors.date }}
            </div>

            <!-- Identity confirmation section with warning styling -->
            <div class="confirmation-section">
                <InfoIcon class="info-icon" />
                <div class="warning-box">
                    <label class="confirmation-label">
                        <input
                            type="checkbox"
                            v-model="isConfirmed"
                            class="confirmation-checkbox"
                            name="confirmation"
                            required
                        />
                        <p>
                            ¿Confirmas que eres
                            <span>{{ loanStore.state.holderName }}</span> el
                            titular de la cédula
                            <span>{{ loanStore.state.idNumber }}</span
                            >?
                        </p>
                    </label>
                </div>
            </div>

            <!-- Action buttons for form submission or cancellation -->
            <div class="button-group">

                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!isFormValid"
                >
                    Continuar
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.first-step {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 1rem;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-title {
    color: #2c5282;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.3;
    text-align: center;
}

.required-label {
    color: #4a5568;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-style: italic;
}

.date-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.select-group {
    position: relative;
}

.select-group .chevron-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #4a5568;
    pointer-events: none;
    transition: color 0.3s ease;
}

.date-select {
    width: 100%;
    padding: 1rem 2.5rem 1rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    background-color: white;
    color: #2d3748;
    appearance: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.date-select:hover {
    border-color: #4299e1;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.15);
}

.date-select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    transform: translateY(-2px);
}

.date-select:focus + .chevron-icon {
    color: #4299e1;
}

.date-select.error {
    border-color: #e53e3e;
    background-color: #fed7d7;
}

.date-select.error:focus {
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.date-error {
    color: #e53e3e;
    font-size: 0.85rem;
    padding: 0.75rem;
    background: linear-gradient(135deg, #fed7d7 0%, #fecaca 100%);
    border: 2px solid #e53e3e;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(229, 62, 62, 0.15);
}

.confirmation-section {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin: 2rem 0;
}

.confirmation-section .info-icon {
    flex-shrink: 0;
    color: #ed8936;
    margin-top: 0.25rem;
}

.warning-box {
    background: linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%);
    border: 2px solid #ed8936;
    border-radius: 0.75rem;
    padding: 1.25rem;
    color: #2d3748;
    flex: 1;
    box-shadow: 0 4px 12px rgba(237, 137, 54, 0.15);
}

.confirmation-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
}

.confirmation-checkbox {
    margin: 0.25rem 0 0 0;
    transform: scale(1.3);
    cursor: pointer;
    accent-color: #4299e1;
}

.warning-box p {
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
}

.warning-box p span {
    font-weight: 700;
    color: #2c5282;
}

.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    padding: 0.875rem 1.75rem;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
    min-width: 160px;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.btn-secondary {
    background: transparent;
    color: #e53e3e;
    border-color: #e53e3e;
}

.btn-secondary:hover {
    background: #e53e3e;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(229, 62, 62, 0.3);
}

.btn-primary {
    background: linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%);
    color: white;
    border-color: #5a67d8;
    box-shadow: 0 4px 15px rgba(90, 103, 216, 0.3);
}

.btn-primary:not(:disabled):hover {
    background: linear-gradient(135deg, #4c51bf 0%, #434190 100%);
    border-color: #4c51bf;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(90, 103, 216, 0.4);
}

.btn-primary:disabled {
    cursor: not-allowed;
    background: #a0aec0;
    color: #e2e8f0;
    border-color: #a0aec0;
    transform: none;
    box-shadow: none;
}

/* Responsive design */
@media (max-width: 768px) {
    .first-step {
        margin: 1rem;
        padding: 1.5rem;
    }

    .form-title {
        font-size: 1.25rem;
    }

    .date-inputs {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .button-group {
        flex-direction: column;
        align-items: center;
    }

    .btn {
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 640px) {
    .first-step {
        padding: 1rem;
    }

    .confirmation-section {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .confirmation-label {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
}
</style>
