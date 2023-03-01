<template>
    <ul>
        <li>
            <button>Previous</button>
        </li>
        <li>
            <button>Next</button>
        </li>
    </ul>

        <li v-for="page in pages" :key="page.name">
            <button :disabled="page.isDisables">
                {{ page.name }}
            </button>
        </li>
</template>

<script>
    export default{
        props: {
        maxButtons: {
            type: Number,
            required: false,
            default: 3,
        },

        currentPage: {
            type: Number,
            required: true,
        }
    }
};

</script>

<style>

</style>