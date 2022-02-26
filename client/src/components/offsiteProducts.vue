<template>
  <div id="offsite-products">

    <h2 class="offsite-header">Fancy some extra entertainment?</h2>

    <div class="offsite-products-catalogue">
      <div v-for="product in allOffsiteProducts" :key="product.id" class="product">
        <div class="product-info">
          <span class="product-name">{{product.name}}</span>
          <img class="product-image" :src="product.imageUrl" alt="">
          <span class="product-description">{{product.description}}</span>
          <span class="product-price">{{product.unitPrice}} € / u</span>
        </div>

        <div class="qty-selector">
          <label for="quantity">Quantity</label>
          <input type="number" :id="product.id" v-model="product.quantity" min="1" max="10" @change="updateProduct(product)">
          <button class="add-btn" v-if="!productAdded(product.id)" @click="addProduct(product)">Add</button>
          <button class="remove-btn" v-if="productAdded(product.id)" @click="removeProduct(product)">Remove</button>
        </div>
      </div>

      <div class="offsite-summary-wrapper" v-if="addedProducts.length">
        <div class="offsite-summary" >
          <div class="product-summary-details" v-for="(product, i) in addedProducts" :key="i">
            <span>{{product.quantity}}</span> x <span>{{product.name}}</span> = {{product.quantity * product.unitPrice}} €
          </div>
          <div class="product-summary-total">
            <span class="total-label">Total: </span><span class="total-price">{{totalPrice()}} €</span>
          </div>
        </div>
      </div>  
    
    </div>

    <div v-if="maxQuantityMsg">
      <p class="errorMsg">{{maxQuantityMsg}}</p>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      addedProducts: [],
      qty: null,
      maxQuantityMsg: null
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
        quantity: product.quantity,
        unitPrice: product.unitPrice
      }
      if (product.quantity <= 0 || product.quantity > 10) {
        this.maxQuantityMsg = "Please select a maximum of 10 products"
      }
      else if (product.quantity > 0) {
        this.addedProducts.push(productObj)
        this.maxQuantityMsg = null
      }
      this.$emit("save-offsite-products", this.addedProducts);

      var buttonsInDOM = setInterval(function() {
      var ATCbuttons = document.getElementById("atc-buttons");
      if (ATCbuttons) {
          ATCbuttons.scrollIntoView({behavior : 'smooth'});
          clearInterval(buttonsInDOM);
        }
      }, 100);
    },
    removeProduct(product) {
      let productCopy = this.addedProducts.find( p => p.id == product.id);
      const idx = this.addedProducts.indexOf(productCopy);
      this.addedProducts.splice(idx, 1)
      this.$emit("save-offsite-products", this.addedProducts);
      product.quantity = null
    },
    productAdded(productId) {
      return this.addedProducts.some(product => product.id == productId)
    },
    totalPrice() {
      let totalSum = []
      this.addedProducts.forEach( product => {
        let partialSum = product.quantity * product.unitPrice
        totalSum.push(partialSum)
      })
      let price = totalSum.reduce( (a, b) => a + b )
      return price
    },
    updateProduct(product) {
      let updatedProduct = this.addedProducts.find( p => p.id == product.id)
      if (updatedProduct) updatedProduct.quantity = product.quantity
      let offsiteValidator = (product.quantity > 0 && product.quantity < 11) ? true : false
      this.$emit("offsite-validator", offsiteValidator)
    }
  },
  async created() {
    await this.loadOffsiteProducts()
    this.$emit("products-loaded")
  }
};
</script>

<style lang="scss">
#offsite-products {
  font-family: $base-font-family;
  background: #d7b9ff;
  padding: 10px;
  margin: 1rem 0;
  border-radius: 20px;
}

.offsite-products-catalogue {
  display: flex;
  flex-wrap: wrap;
}

.product {
  border: 1px solid $base-color;
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
  min-height: 40px;
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

.qty-selector input {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.qty-selector button {
  color: white;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px 8px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  font-family: $base-font-family;
}

.qty-selector .add-btn {
  background: $base-color;
  border: 1px solid $base-color;
}

.qty-selector .remove-btn {
  background: $base-secondary-color;
  border: 1px solid $base-secondary-color;
}

.offsite-summary-wrapper {
    flex-basis: 100%;
}
.offsite-summary {
    padding: 1rem;
    border: 1px solid $base-color;
    margin: 1rem;
    margin-bottom: 0
}

.product-summary-details {
    text-align: center;
    font-size: 14px;
}

.product-summary-total {
    text-align: center;
    margin-top: 5px;
}

.product-summary-total .total-label {
  font-weight: bold
}

.offsite-header {
  text-align: center;
  font-style: italic;
  color: $base-color;
  margin: 10px 0 20px;
}

.product-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.qty-selector label {
    font-size: 11px;
}

.errorMsg {
    font-size: 14px;
    margin: 0;
    margin-top: 10px;
    color: red;
    text-align: center;
}
</style>
