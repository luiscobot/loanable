<script setup>
const props = defineProps({
    width: {
        type: String,
        default: "24",
    },
    height: {
        type: String,
        default: "24",
    },
});
</script>

<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z"
            fill="currentColor"
        />
        <path
            d="M12.001 12C7.70183 12 4.55378 14.8837 3.69691 18.6964C3.40713 19.9858 4.46429 21 5.59944 21H18.4026C19.5378 21 20.5949 19.9858 20.3051 18.6964C19.4483 14.8837 16.3002 12 12.001 12Z"
            fill="currentColor"
        />
    </svg>
</template>
