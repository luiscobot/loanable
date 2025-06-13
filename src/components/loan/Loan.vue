<script setup>
import StepProgress from "./StepProgress.vue";
import { inject, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// Access to the global loan application state
const loanStore = inject("loanStore");
// Current route information for tracking navigation
const route = useRoute();
// Router instance for programmatic navigation
const router = useRouter();

// Monitors route changes to keep step state synchronized with URL
watch(route, () => {
    updateCurrentStep(route.path);
});

// Extracts step number from URL and updates the loan state accordingly
function updateCurrentStep(path) {
    const match = path.match(/\/loan\/step-(\d+)/);
    if (match) {
        const step = Number.parseInt(match.at(1));
        loanStore.actions.updateStep(step);
    }
}

// Handles progression to the next step in the loan application flow
function nextStep(data) {
    // Updates document issue date if provided by the current step
    if (data.date) {
        loanStore.actions.updateDocumentIssueDate(data.date);
    }

    // Updates preferred payment day if selected by user
    if (data.day) {
        loanStore.actions.updateLoanPaymentDate(data.day);
    }

    // Updates user confirmation status if provided
    if (data.confirmed !== undefined) {
        loanStore.actions.updateConfirmation(data.confirmed);
    }

    // Calculates the next step number and navigates to it
    const nextStepNumber = loanStore.state.currentStep + 1;
    router.push(`/loan/step-${nextStepNumber}`);
}
</script>

<template>
    <!-- Displays progress indicator showing current position in the flow -->
    <StepProgress :currentStep="loanStore.state.currentStep" />
    <!-- Renders the current step component and listens for step completion events -->
    <router-view @next-step="nextStep" />
</template>
