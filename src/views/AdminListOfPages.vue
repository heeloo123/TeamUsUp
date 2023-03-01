<template>
    <ul class="page">
        <li class="p-item">
            <button @click="ClickPreviousPage" :disabled="firstPage">Previous</button>
        </li>
        <li class="p-item">
            <button @click="ClickNextPage" :disabled="lastPage">Next</button>
        </li>
    </ul>
        <li class="p-item" v-for="page in pages" :key="page.number">
            <button
                :class="activePage (page.number)"
                @click="ClickPage (page.number)"
                :disabled="page.isDisables">
                {{ page.number }}
            </button>
        </li>
</template>

<script>
    export default{
        props: {
        displayButtons: {
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
        
    

    // if the page selected is the start page, which is also the first page
    startPage() {
        if (this.currentPage === 1) {
            return 1;
        }

    // if the page is the last page
        if (this.currentPage === this.totalPages) {
            return this.totalPages - this.displayButtons+1;
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
            this.$emit ('switchPage', this.currentPage-1)
        },

        ClickNextPage()
        {
            this.$emit ('switchPage', this.currentPage+1)
        },

        ClickPage(page) {
            this.$emit ('switchPage', page)
        },

        activePage(page) {
            return this.currentPage === page
        }
    },

    pages() {
            const range = [];
            for (
                let x = this.startPage;
                x <= Math.min (this.startPage + this.displayButtons -1, this.totalPages);
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

  }
        
};

</script>

<style scoped>
.p-item{
    display: inline-block;
}



</style>