<template>
  <div class="button-wrapper">
    <button v-if="!link" class="base-button">
      <slot></slot>
    </button>
    <router-link v-else :to="to" class="base-button">
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped lang="scss">
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: $base-color;
  border: 1px solid $base-color;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: $base-secondary-color;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: $base-color;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
}
</style>