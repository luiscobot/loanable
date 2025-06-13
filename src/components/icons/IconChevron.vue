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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 12.5859L15.2929 9.29301C15.6834 8.90248 16.3166 8.90248 16.7071 9.29301C17.0976 9.68353 17.0976 10.3167 16.7071 10.7072L13.2374 14.1769C12.554 14.8603 11.446 14.8603 10.7626 14.1769L7.29289 10.7072C6.90237 10.3167 6.90237 9.68353 7.29289 9.29301C7.68342 8.90248 8.31658 8.90248 8.70711 9.29301L12 12.5859Z"
            fill="currentColor"
        />
    </svg>
</template>
