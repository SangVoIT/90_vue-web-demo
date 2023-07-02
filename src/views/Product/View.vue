<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { ProductState } from '@/components/states/productState'
import { covertToProductState } from '@/components/entities/product'

const productStore = useProductStore()
const productList = ref([] as ProductState[])
const msg = ref() 

onMounted(() => {
  getProductData()
})

const getProductData = async () => {
  const productListResult = await productStore.getAllProduct()
  const temp = [] as ProductState[]
  for (const element of productListResult) {
    temp.push(covertToProductState(element))
  }
  productList.value = temp
} 

const deleteProduct = async (productId: number) => {
  try {
    console.log("deleteProduct: " + productId)
    const result = await productStore.deleteProduct(productId)
    msg.value = "Delete product successfully!"

    // reload data
    await getProductData()
  } catch (error) {
    msg.value = error.message
  }
} 
const formatUTCtoLocalDatetime = (input: Date) => {
  return new Date(input).toLocaleString()
}

</script>
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Products 
          <RouterLink class="btn btn-primary float-end" to="/product/create"> Add Product</RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Price</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="productList.length > 0">
            <!-- <tr v-for="item in productList" :key="`{{item.id}}`"> -->
            <tr v-for="(item, index) in productList" :key="item.id">
              <td>{{ index+1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>ID: {{ item.id }}, description: {{ item.description }}</td>
              <td>{{ item.price }}</td>
              <td>{{ formatUTCtoLocalDatetime(item.createDate) }}</td>
              <td>
                <RouterLink class="btn btn-primary me-2" 
                  :to="{name: 'EditProductView', params: { id: item.id}}"> Edit</RouterLink>
                  <button type="button" class="btn btn-danger" v-on:click="deleteProduct(item.id)">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
              <tr>
                <td colspan="7">Loading...</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
