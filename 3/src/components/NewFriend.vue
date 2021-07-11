<template>
  <form @submit.prevent="submitData" class="input">
    <div>
      <label>Name</label>
      <input type="text" v-model="this.inputName" />
    </div>
    <div>
      <label>Phone</label>
      <input type="tel" v-model="this.inputPhone" />
    </div>
    <div>
      <label>email</label>
      <input type="email" v-model="this.inputEmail" />
    </div>

    <button class="btn" @click="fillName">submit</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      inputName: "amy",
      inputPhone: "09084840389",
      inputEmail: "efwfwa@gmail.com",
    };
  },
  emits: {
    "add-new-friend": function(n, p, e) {
      console.log(n, p, e);
      if (n.trim() == "" || p.trim() == "" || e.trim() == "") {
        alert("fill something");
      } else {
        return true;
      }
    },
  },
  props: {},
  methods: {
    submitData() {
      this.$emit(
        "add-new-friend",
        this.inputName,
        this.inputPhone,
        this.inputEmail
      );
    },
  },
};
</script>
<style lang="css">
#app input {
  font: inherit;
  padding: 0.15rem;
}
#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}
#app form div {
  margin: 1rem 0;
}
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  widows: 300px;
}
form button {
  width: 200px;
}
</style>
