<template>
  <li>
    <h2>{{ name }}{{ isFavorite === true ? "favorite" : "no" }}</h2>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? "Hide" : "Show" }} Details
    </button>
    <button @click="toggleFavorite">
      mark favorite
    </button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ friend.email }}
      </li>
    </ul>
    <button @click="$emit('delete', id)">delete</button>
  </li>
</template>

<script>
export default {
  emits: {
    "toggle-favorite": function(id) {
      if (id) {
        return true;
      } else {
        return false;
      }
    },
    delete: "delete",
  },
  props: {
    // "id", "name", "phone", "isFavorite"
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      detailsAreVisible: false,

      // friendIsFavorite: this.isFavorate,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavorite() {
      this.$emit("toggle-favorite", this.id);
    },
  },
};
</script>
