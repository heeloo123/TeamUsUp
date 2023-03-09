<template>
    <div style="margin: inherit; text-align: -webkit-center">
        <div class="background">
            <div style="font-size: 40px; padding: 20px">Notification page</div>
                <div class="container">
                    <div class="messageTable">
                        <div class="cell">message 1</div> 
                        <div class="cell">message 2</div>
                        <div class="cell">message 3</div>
                        <div class="cell">message 4</div>
                        <div class="cell">message 5</div>
                        <div class="cell">message 6</div>
                        <div class="cell">message 7</div>
                        <div class="cell">message 8</div>
                        <div class="cell">message 9</div>
                        <div class="cell">message 10</div>
                    </div>
                        <div class="emailTimeStamp">
                            {{ formatDate(currentTimeStamp()) }}
                        </div>
                </div>
        </div>
    </div>
    
    
</template>


<script>
export default {
  name: "notificationView",
  component: {},

    data() {
        return {
            message: [
                {
                    notificationID: "1",
                    content: "You have deactivated your account.",
                    currentTimeStamp: "",
                },

                {
                    notificationID: "2",
                    content: "Joe Doe has evaluate you for project Y.",
                    currentTimeStamp: "",
                },

                {
                    notificationID: "3",
                    content: "Joe Doe added you to project X.",
                    currentTimeStamp: "",
                },
            ],

            emailSentTime: [
                {
                    date: "",
                    time: "",
                    month: "",
                    year: "",
                }
            ],
            
            readNotification: false,
        };
    },

        methods: {
            currentTimeStamp() {
                const current = new Date();
                new Date() === `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}}`;
                console.log (current);
                return current;
            },

            formatDate(date) {
               const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
               return new Date(date).toLocaleDateString('en-gb', options);
            },


        getDate() {
            return new Date().toLocaleDateString();
        },

        getMonth() {
            return new Date().getMonth();
        },

        getTime() {
            return new Date().toLocaleTimeString();
        },

        getYear() {
            return new Date().getFullYear();
        },
    },

    mounted() {
       this.date === this.getDate();
       this.time() === this.getTime();
       this.year() === this.getYear();
       this.month() === this.getMonth();
    },

};
    

</script>

<style scoped>


.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: auto;
  margin: 50px;
  text-align: left;
  padding: 20px;
  margin-top: -10px;
}




.cell {
  flex: 1;
  border: 1px solid #000000;
  justify-content: space-between;
  margin: 1px;
  padding: 10px;
  flex-direction: row;
}



</style>