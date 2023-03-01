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
        },

        totalPages: {
            type: Number,
            required: true,
        },
    },

    computed: {
        startPage() {
        if (this.currentPage === 1) {
            return 1;
        }

        return this.currentPage -1;
    },
    pages() {
        const range = [];
        for (
            let x = this.startPage;
            x <= Math.min (this.startPage + this.maxButtons -1, this.totalPages);
            x ++
        )
            {
                range.push(
                    {
                        name: x,
                        isDisabled: x === this.currentPage
                    }
                )
            }
        return range;
    },
  }
        
};

</script>

<style>

</style>