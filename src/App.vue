<script setup>
import { provide, reactive, computed } from "vue";
import { Loan } from "@/components/loan";

// Reactive state that stores all loan application information
const loanState = reactive({
    currentStep: 1, // Current step in the loan application flow
    holderName: "Luis Romero", // Full name of the document holder
    idNumber: "1.012.345.678", // Identification number of the holder
    documentIssueDate: null, // Issue date of the identity document
    loanPaymentDate: null, // Chosen day of the month for loan payments
    documentType: "Cédula de Ciudadanía", // Type of identity document
    isConfirmed: false, // User confirmation status of the provided information
});

// Available actions to modify the loan state
const loanActions = {
    // Updates the current step in the application flow
    updateStep(step) {
        loanState.currentStep = step;
    },

    // Sets the document issue date
    updateDocumentIssueDate(date) {
        loanState.documentIssueDate = date;
    },

    // Sets the preferred payment date for monthly installments
    updateLoanPaymentDate(date) {
        loanState.loanPaymentDate = date;
    },

    // Updates the user's confirmation status
    updateConfirmation(confirmed) {
        loanState.isConfirmed = confirmed;
    },

    // Resets the application state to initial values
    resetState() {
        loanState.currentStep = 1;
        loanState.documentIssueDate = null;
        loanState.loanPaymentDate = null;
        loanState.isConfirmed = false;
    },
};

// Main store object that provides state management for the loan application
const loanStore = {
    state: loanState,
    actions: loanActions,
    getters: {
        // Formats the payment date for display purposes
        formattedPaymentDate: computed(() =>
            loanState.loanPaymentDate
                ? `Día ${loanState.loanPaymentDate} de cada mes`
                : "",
        ),
    },
};

// Makes the loan store available to all child components
provide("loanStore", loanStore);
</script>

<template>
    <Loan />
</template>
