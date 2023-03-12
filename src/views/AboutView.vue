<!--no need do this-->
<template>
  <div>
    <p>JSessionID: {{ computedJSessionID }}</p>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();

    const computedJSessionID = computed(() => {
      return authStore.jsessionID ? authStore.jsessionID : "Loading...";
    });

    return {
      computedJSessionID,
    };
  },
};
</script>