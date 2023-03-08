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
                        <div>

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
                },

                {
                    notificationID: "2",
                    content: "Joe Doe has evaluate you for project Y.",
                },

                {
                    notificationID: "3",
                    content: "Joe Doe added you to project X.",
                },
            ],

            emailSentTime: [
                {
                    date: "",
                    time: "",
                    month: "",
                    year: "",
                    fullDate: "",
                }
            ],
            
            readNotification: false,
            sentTimeStamp: null,
        };
    },

        methods: {
            currentDate() {
                // const currentDate = new Date();
                // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getYear()}`;
                // return date;
            },

        printDate(date) {
            return new date().toLocaleDateString();
        },

        printTime(time) {
            return new time().toLocaleTimeString();
        },

        printFullDateTime(fullDate) {
            return new fullDate()
        }
    }

}
    

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