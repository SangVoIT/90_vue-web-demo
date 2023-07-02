<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { Product } from '@/components/entities/product'
import router from '@/router';
import CurrencyInput from '../../components/CurrencyInput.vue'

const product = ref({
  name: '',
  type: '',
  description: '',
  price: 0,
  } as unknown as Product)
const options = ref([
  { value: 'Laptop', name: 'Laptop' },
  { value: 'PC', name: 'PC' },
  { value: 'Keyboard', name: 'Keyboard' },
  { value: 'Mouse', name: 'Mouse' },
])
const result = ref({
  code: -1,
  errorList: []})
const productStore = useProductStore()

const createProduct = async () => {
  try {
    const lstError = checkValue()
    if (!lstError) {
      // Send request for create new product
      await productStore.storeProduct(product.value)
      result.value = {
        code: 1, 
        errorList: ["Add product successfully!"]
      }

      // Clear screen 
      product.value = {
        name: '',
        type: '',
        description: '',
        price: 0
      } as Product
    } else {
      result.value = {
        code: 0, 
        errorList: lstError
      }
    }
  } catch (error) {
    result.value = {
      code: 0, 
      errorList: ["Add product failed. Please try again..."]
    }
  }
}

const backToList = () => {
  return router.push({ name: 'ProductList' })
}

// Validation function
const checkValue = (() => {
  let result = []
  if (product.value.name.length == 0) {
    result.push("Please enter product name.")
  }
  if (product.value.type == "") {
    result.push("Please enter product type.")
  }
  if (product.value.price < 100) {
    result.push("Please enter a price greater than 100￥.")
  }
  if (result.length==0) return null
  return result
})
</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4> Add Product </h4>
      </div>
      <div class="card-body">
        <ul class="alert alert-warning" v-if="result.code == 0" >
          <li class="mb0 ms-3" v-for="error in result.errorList"> {{ error }}</li>
        </ul>
        <ul class="alert alert-success" v-if="result.code == 1" >
          <li class="mb0 ms-3" v-for="error in result.errorList"> {{ error }}</li>
        </ul>
        <div class="mb-3">
          <label for="">Name</label>
          <input type="text" class="form-control" required v-model='product.name'>
        </div>
        <div class="mb-3">
          <label for="">Type</label>
          <select class="form-select form-select-sm mb-3" required v-model="product.type">
            <option value="" selected>--------- Select your product type ---------</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="">Description</label>
          <input type="text" class="form-control" required v-model='product.description'>
        </div>
        <div class="mb-3">
          <label for="">Price</label>
          <CurrencyInput class="form-control" v-model="product.price" :value="product.price" :options="{ currency: 'JPY' }"  />
        </div>
        <div class="mb-3  float-end">
          <button type="button" class="btn btn-secondary me-3" style="width: 100px;" v-on:click="backToList()">Cancel</button>
          <button type="button" class="btn btn-primary" style="width: 100px;" v-on:click="createProduct()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
