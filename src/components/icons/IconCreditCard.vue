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
            d="M20 4H4C2.89543 4 2 4.89543 2 6V9H22V5.99878C22 4.89261 21.103 4 20 4Z"
            fill="currentColor"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 18V11H22V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H10C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13H7Z"
            fill="currentColor"
        />
    </svg>
</template>
