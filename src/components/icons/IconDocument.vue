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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C17.5234 2 22 6.47717 22 12C22 17.5228 17.5234 22 12 22C6.47656 22 2 17.5228 2 12C2 6.47717 6.47656 2 12 2ZM12 15C9.60547 15 7.61719 16.0055 6.28516 17.5996C7.73826 19.081 9.76184 20 12 20C14.2382 20 16.2617 19.081 17.7148 17.5996C16.3828 16.0055 14.3945 15 12 15ZM12 6.75C10.2045 6.75 8.75 8.20509 8.75 10C8.75 11.7949 10.2045 13.25 12 13.25C13.7955 13.25 15.25 11.7949 15.25 10C15.25 8.20509 13.7955 6.75 12 6.75Z"
            fill="currentColor"
        />
    </svg>
</template>
