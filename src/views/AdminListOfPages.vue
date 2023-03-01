<template>
    <ul>
        <li>
            <button type="button">Previous</button>
        </li>
        <li>
            <button type="button">Next</button>
        </li>
    </ul>
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