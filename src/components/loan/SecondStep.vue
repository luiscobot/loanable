<script setup>
import { ref, computed, onMounted, inject } from "vue";

// Access to the global loan application state
const loanStore = inject("loanStore");

// Events that this component can emit to parent components
const emit = defineEmits(["next-step"]);

// Currently selected payment date option
const selectedDate = ref(null);
// Available payment date options for the current month
const dateOptions = ref([]);

// Extracts the day number from the selected date for display purposes
const selectedDay = computed(() => {
    if (!selectedDate.value) return "";
    const selectedOption = dateOptions.value.find(
        (option) => option.value === selectedDate.value,
    );
    return selectedOption ? selectedOption.dayNumber : "";
});

// Determines if user has selected a payment date
const isDateSelected = computed(() => !!selectedDate.value);

// Generates available payment date options for the current month
const generateDateOptions = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Abbreviated month names in Spanish for display
    const monthNames = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];

    const monthName = monthNames[currentMonth];

    // Predefined payment date options (6th, 15th, 28th of each month)
    const dates = [6, 15, 28]; // You can customize these dates

    // Creates formatted date objects for each payment option
    dateOptions.value = dates.map((day) => ({
        value: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        day: String(day).padStart(2, "0"),
        monthYear: `${monthName} ${currentYear}`,
        dayNumber: day,
    }));

    // Pre-selects previously chosen date or defaults to first option
    selectedDate.value =
        loanStore?.state.loanPaymentDate || dateOptions.value[0]?.value;
};

// Handles user selection of a payment date
const selectDate = (dateValue) => {
    selectedDate.value = dateValue;
};

// Proceeds to next step with selected payment date information
const nextStep = () => {
    if (selectedDate.value) {
        emit("next-step", {
            date: selectedDate.value,
            day: selectedDay.value,
        });
    }
};

// Initializes payment date options when component loads
onMounted(() => {
    generateDateOptions();
});
</script>

<template>
    <!-- Payment date selection interface -->
    <div class="date-selector">
        <h2 class="title">Elige tu fecha de pago</h2>
        <p class="description">
            Recuerda seleccionar una fecha que se ajuste a tus ingresos para que
            puedas pagar tus cuotas cómodamente.
        </p>

        <h3 class="subtitle">Elige tu primera fecha de pago</h3>

        <!-- Available payment date options displayed as cards -->
        <div class="date-options">
            <button
                v-for="date in dateOptions"
                :key="date.value"
                :class="[
                    'date-option',
                    { active: selectedDate === date.value },
                ]"
                @click="selectDate(date.value)"
            >
                <!-- Day number display -->
                <div class="day">{{ date.day }}</div>
                <!-- Month and year display -->
                <div class="month-year">{{ date.monthYear }}</div>
            </button>
        </div>

        <!-- Confirmation message showing selected payment schedule -->
        <div v-if="isDateSelected" class="payment-info">
            <p>
                Tu fecha de pago será el
                <strong>día {{ selectedDay }} de cada</strong> mes.
            </p>
        </div>

        <!-- Action button to proceed with selected date -->
        <div class="button-group">
            <button
                type="button"
                :disabled="!isDateSelected"
                class="btn btn-primary"
                @click="nextStep"
            >
                Confirmar
            </button>
        </div>
    </div>
</template>

<style scoped>
.date-selector {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 1rem;
    text-align: center;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.title {
    color: #2c5282;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.description {
    color: #4a5568;
    line-height: 1.5;
    margin-bottom: 2rem;
    font-size: 0.95rem;
}

.subtitle {
    color: #2c5282;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.date-options {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.date-option {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1.25rem;
    min-width: 90px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.date-option:hover {
    border-color: #4299e1;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.15);
}

.date-option.active {
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    border-color: #4299e1;
    color: white;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(66, 153, 225, 0.3);
}

.day {
    font-size: 1.375rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.month-year {
    font-size: 0.875rem;
    opacity: 0.85;
    font-weight: 500;
}

.payment-info {
    background: linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%);
    border: 2px solid #ed8936;
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin-bottom: 2rem;
    color: #2d3748;
    font-size: 0.95rem;
    box-shadow: 0 2px 8px rgba(237, 137, 54, 0.15);
}

.button-group {
    display: flex;
    justify-content: center;
}

.btn {
    padding: 0.875rem 2rem;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
    min-width: 180px;
    text-transform: uppercase;
    letter-spacing: 0.025em;
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

@media (max-width: 768px) {
    .date-selector {
        margin: 1rem;
        padding: 1.5rem;
    }

    .title {
        font-size: 1.25rem;
    }

    .date-options {
        gap: 0.75rem;
    }

    .date-option {
        min-width: 80px;
        padding: 1rem;
    }

    .btn {
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 480px) {
    .date-selector {
        padding: 1rem;
    }

    .date-options {
        gap: 0.5rem;
    }

    .date-option {
        min-width: 70px;
        padding: 0.875rem;
    }

    .day {
        font-size: 1.125rem;
    }

    .month-year {
        font-size: 0.75rem;
    }
}
</style>
