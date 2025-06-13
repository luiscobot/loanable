<script setup>
import CheckmarkIcon from "@/components/icons/IconCheckmark.vue";
import { ref } from "vue";

// Receives the current step number from parent component
const props = defineProps({
    currentStep: {
        type: Number, // Current active step in the loan application process
    },
});

// Defines the sequence of steps in the loan application workflow
const steps = ref([
    { id: crypto.randomUUID(), label: "Identidad" }, // Identity verification step
    { id: crypto.randomUUID(), label: "Plazos" }, // Payment terms selection step
    { id: crypto.randomUUID(), label: "Firmas" }, // Document signing step
]);
</script>

<template>
    <!-- Visual progress indicator showing loan application workflow -->
    <div class="step-progress">
        <!-- Individual step representation with visual state indicators -->
        <div v-for="(step, index) in steps" :key="step.id" class="step-item">
            <!-- Circular indicator showing step completion status -->
            <div
                class="step-circle"
                :class="{
                    completed: index < currentStep - 1, // Steps that have been finished
                    current: index === currentStep - 1, // Currently active step
                    upcoming: index > currentStep - 1, // Steps not yet reached
                }"
            >
                <!-- Checkmark icon for completed steps -->
                <CheckmarkIcon
                    width="18"
                    height="18"
                    v-if="index < currentStep - 1"
                />
                <!-- Step number for current and upcoming steps -->
                <span v-else class="step-number">{{ index + 1 }}</span>
            </div>

            <!-- Connecting line between steps (hidden for last step) -->
            <div
                v-if="index < steps.length - 1"
                class="step-line"
                :class="{
                    completed: index < currentStep - 1, // Completed connection
                    current: index === currentStep - 1, // In-progress connection
                }"
            ></div>

            <!-- Step name/label with status-based styling -->
            <div
                class="step-label"
                :class="{
                    completed: index < currentStep - 1, // Completed step styling
                    current: index === currentStep - 1, // Active step styling
                    upcoming: index > currentStep - 1, // Future step styling
                }"
            >
                {{ step.label }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.step-progress {
    display: flex;
    align-items: flex-start;
    padding: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 1rem;
    margin: 1rem 0;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    position: relative;
}

.step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    position: relative;
    border: 3px solid transparent;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step-circle.completed {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-color: #10b981;
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
}

.step-circle.current {
    background: linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%);
    color: white;
    border-color: #5a67d8;
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(90, 103, 216, 0.5);
    animation: pulse 2s infinite;
}

.step-circle.upcoming {
    background: white;
    color: #64748b;
    border-color: #cbd5e1;
}

.step-circle.upcoming:hover {
    border-color: #94a3b8;
    transform: scale(1.05);
}

@keyframes pulse {
    0%,
    100% {
        box-shadow: 0 6px 20px rgba(90, 103, 216, 0.5);
    }
    50% {
        box-shadow:
            0 6px 20px rgba(90, 103, 216, 0.7),
            0 0 0 8px rgba(90, 103, 216, 0.1);
    }
}

.step-number {
    font-size: 1.125rem;
    font-weight: 600;
}

.step-line {
    position: absolute;
    top: 24px;
    left: calc(50% + 24px);
    right: calc(-50% + 24px);
    height: 4px;
    background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
    border-radius: 2px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
}

.step-line.completed {
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    height: 6px;
    top: 23px;
}

.step-line.current {
    background: linear-gradient(90deg, #5a67d8 0%, #e2e8f0 100%);
    height: 6px;
    top: 23px;
    animation: progress 1.5s ease-in-out;
}

@keyframes progress {
    0% {
        background: linear-gradient(90deg, #e2e8f0 0%, #e2e8f0 100%);
    }
    100% {
        background: linear-gradient(90deg, #5a67d8 0%, #e2e8f0 100%);
    }
}

.step-label {
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    transition: all 0.3s ease;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
}

.step-label.completed {
    color: #059669;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.1);
}

.step-label.current {
    color: #4c51bf;
    font-weight: 600;
    background: rgba(90, 103, 216, 0.1);
    transform: scale(1.05);
}

.step-label.upcoming {
    color: #64748b;
}

@media (max-width: 768px) {
    .step-progress {
        padding: 1.5rem 1rem;
    }

    .step-circle {
        width: 40px;
        height: 40px;
    }

    .step-circle.current {
        transform: scale(1.1);
    }

    .step-circle.completed {
        transform: scale(1.05);
    }

    .step-number {
        font-size: 1rem;
    }

    .step-label {
        font-size: 0.75rem;
    }

    .step-line {
        left: calc(50% + 20px);
        right: calc(-50% + 20px);
        top: 20px;
    }

    .step-line.completed,
    .step-line.current {
        top: 19px;
    }
}

@media (max-width: 480px) {
    .step-progress {
        flex-direction: column;
        align-items: stretch;
        gap: 1.5rem;
    }

    .step-item {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .step-line {
        display: none;
    }

    .step-label {
        text-align: left;
        flex: 1;
    }
}
</style>
