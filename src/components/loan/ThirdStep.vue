<script setup>
import { computed, inject } from "vue";
import UserIcon from "@/components/icons/IconUser.vue";
import DocumentIcon from "@/components/icons/IconDocument.vue";
import CreditCardIcon from "@/components/icons/IconCreditCard.vue";

// Access to the global loan application state
const loanStore = inject("loanStore");

// Events that this component can emit to parent components
const emit = defineEmits(["confirm"]);


// Converts document issue date to Colombian format (DD/MM/YYYY)
const formattedDocumentIssueDate = computed(() => {
    const date = loanStore.state.documentIssueDate;
    if (!date) return "";

    // Returns date as-is if already in DD/MM/YYYY format
    if (date.includes("/")) {
        return date;
    }

    // Converts from ISO format (YYYY-MM-DD) to Colombian format
    if (date.includes("-")) {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }

    return date;
});

// Handles final confirmation and emits collected loan data
const handleConfirm = () => {
    loanStore.actions.updateConfirmation(true);
    emit("confirm", {
        holderName: loanStore.state.holderName,
        documentNumber: loanStore.state.idNumber,
        documentIssueDate: formattedDocumentIssueDate.value,
        loanPaymentDate: loanStore.state.loanPaymentDate,
    });
};
</script>

<template>
    <!-- Summary view displaying all collected loan application information -->
    <div class="document-summary">
        <!-- Header section with title and instructions -->
        <div class="summary-header">
            <h2 class="title">Resumen de Información</h2>
            <p class="subtitle">
                Verifica que todos los datos sean correctos antes de continuar
            </p>
        </div>

        <!-- Main content area with information cards -->
        <div class="summary-content">
            <!-- Personal information display card -->
            <div class="info-card">
                <div class="card-header">
                    <UserIcon class="card-icon" width="24" height="24" />
                    <h3 class="card-title">Información Personal</h3>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <span class="label">Nombre completo:</span>
                        <span class="value">{{
                            loanStore.state.holderName
                        }}</span>
                    </div>
                </div>
            </div>

            <!-- Identity document information display card -->
            <div class="info-card">
                <div class="card-header">
                    <DocumentIcon class="card-icon" width="24" height="24" />
                    <h3 class="card-title">Documento de Identidad</h3>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <span class="label">Tipo de documento:</span>
                        <span class="value">{{
                            loanStore.state.documentType
                        }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Número:</span>
                        <span class="value">{{
                            loanStore.state.idNumber
                        }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Fecha de expedición:</span>
                        <span class="value">{{
                            formattedDocumentIssueDate
                        }}</span>
                    </div>
                </div>
            </div>

            <!-- Payment schedule information display card -->
            <div class="info-card">
                <div class="card-header">
                    <CreditCardIcon class="card-icon" width="24" height="24" />
                    <h3 class="card-title">Fecha de Pago</h3>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <span class="label">Fecha de pago del préstamo:</span>
                        <span class="value highlight">{{
                            loanStore.getters.formattedPaymentDate
                        }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Final confirmation action button -->
        <div class="action-buttons">
            <button
                type="button"
                class="btn btn-primary"
                @click="handleConfirm"
            >
                Confirmar y Continuar
            </button>
        </div>
    </div>
</template>

<style scoped>
.document-summary {
    max-width: 700px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 1rem;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.summary-header {
    text-align: center;
    margin-bottom: 2rem;
}

.title {
    color: #2c5282;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1.2;
}

.subtitle {
    color: #4a5568;
    font-size: 1rem;
    line-height: 1.5;
}

.summary-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.info-card {
    background: white;
    border-radius: 0.75rem;
    border: 2px solid #e2e8f0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.info-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-bottom: 1px solid #e2e8f0;
}

.card-icon {
    color: #5a67d8;
    flex-shrink: 0;
}

.card-title {
    color: #2d3748;
    font-size: 1.125rem;
    font-weight: 600;
    flex: 1;
    margin: 0;
}

.card-body {
    padding: 1.25rem;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
}

.info-item:last-child {
    border-bottom: none;
}

.label {
    color: #4a5568;
    font-size: 0.9rem;
    font-weight: 500;
    flex: 1;
}

.value {
    color: #2d3748;
    font-size: 0.95rem;
    font-weight: 600;
    text-align: right;
    flex: 1;
}

.value.highlight {
    color: #5a67d8;
    background: rgba(90, 103, 216, 0.1);
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-weight: 700;
}

.action-buttons {
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
    min-width: 200px;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.btn-primary {
    background: linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%);
    color: white;
    border-color: #5a67d8;
    box-shadow: 0 4px 15px rgba(90, 103, 216, 0.3);
}

.btn-primary:hover {
    background: linear-gradient(135deg, #4c51bf 0%, #434190 100%);
    border-color: #4c51bf;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(90, 103, 216, 0.4);
}

@media (max-width: 768px) {
    .document-summary {
        margin: 1rem;
        padding: 1.5rem;
    }

    .title {
        font-size: 1.5rem;
    }

    .subtitle {
        font-size: 0.9rem;
    }

    .card-header {
        padding: 1rem;
    }

    .card-body {
        padding: 1rem;
    }

    .info-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }

    .value {
        text-align: left;
    }

    .btn {
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 480px) {
    .document-summary {
        padding: 1rem;
    }

    .card-title {
        font-size: 1rem;
    }

    .label,
    .value {
        font-size: 0.85rem;
    }
}
</style>
