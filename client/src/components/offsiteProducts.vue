<template>
  <div id="offsite-products">
    <div v-for="(product, i) in allOffsiteProducts" :key="i" class="product">

      <span class="product-name">{{product.name}}</span>
      <img class="product-image" :src="product.imageUrl" alt="">
      <span class="product-description">{{product.description}}</span>
      <span class="product-price">{{product.unitPrice}} € / u</span>

      <label for="quantity">Quantity</label>
      <input type="number" :id="product.id" v-model="product.quantity" min="1" max="10">
      <button v-if="!productAdded(product.id)" @click="addProduct(product)">Add</button>
      <button v-if="productAdded(product.id)" @click="removeProduct(product)">Remove</button>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      addedProducts: [],
    }
  },
  computed: {
    ...mapGetters([
      'allOffsiteProducts'
    ]),
  },
  methods: {
    ...mapActions(['loadOffsiteProducts']),
    addProduct(product) {
      let productObj = {
        id: product.id,
        name: product.name,
        quantity: product.quantity
      }
      this.addedProducts.push(productObj)
    },
    removeProduct(product) {
      let productCopy = this.addedProducts.find( p => p.id == product.id);
      const idx = this.addedProducts.indexOf(productCopy);
      this.addedProducts.splice(idx, 1)
      product.quantity = null
    },
    productAdded(productId) {
      return this.addedProducts.some(product => product.id == productId)
    }
  },
  created() {
    this.loadOffsiteProducts()
  }
};
</script>

<style>
#offsite-products {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background: #d7b9ff;
    display: flex;
    padding: 10px;
    margin: 1rem 0;
    border-radius: 20px;
}

.product {
    border: 1px solid #3a0061;
    padding: 10px;
    margin: 0 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    background: white;
    border-radius: 10px;
}

.product-name {
    font-weight: bold;
    min-height: 35px;
}

.product-description {
  font-size: 13px;
  height: 40px;
}

.product-price {
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
}

.product-image {
    width: 100%;
    object-fit: cover;
    max-height: 160px;
    margin: 5px 0;
}
</style>
