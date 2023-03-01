<template>
    <ul>
        <li>
            <button @click="ClickPreviousPage" :disabled="firstPage">Previous</button>
        </li>
        <li>
            <button @click="ClickNextPage" :disabled="lastPage">Next</button>
        </li>
    </ul>

        <li @click="ClickPage (page.number)" v-for="page in pages" :key="page.number">
            <button :disabled="page.isDisables">
                {{ page.number }}
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
        
    pages() {
        const range = [];
        for (
            let x = this.startPage;
            x <= Math.min (this.startPage + this.maxButtons -1, this.totalPages);
            x++
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

    startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

        // if the page selected is in between the visible buttons 
            return this.currentPage -1;
        },

    firstPage() {
        return this.currentPage === 1;
    },

    lastPage() {
        return this.currentPage === this.totalPages;
    },

    methods: {
        ClickPreviousPage()
        {
            this.$emit ('switchPage', -1);
        },

        ClickNextPage()
        {
            this.$emit ('switchPage', this.current+1)
        },

        ClickPage(page) {
            this.$emit ('switchPage', page);
        }
    }

  }
        
};

</script>

<style>

</style>