import { Product } from '@/components/entities/product'
import { HTTP } from './anxios'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('Product', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    double: (state) => {
      return state.count * 2
    },
  },
  actions: {
    async getAllProduct():Promise<Product[]> {
      try {
        const api_url = import.meta.env.VITE_API_ENDPOINT + "products/"
        console.log("getAllProduct, api_url: "+ api_url)
        const data = await HTTP.get(api_url).then(response => {
          return response.data.content as Product[]
        })
        return data
      } catch (error) {
        throw error
      }
    },
    async getProduct(productId: number):Promise<Product>  {
      try {
        const api_url = import.meta.env.VITE_API_ENDPOINT + "products/" + productId
        console.log("getProduct, api_url: "+ api_url)
        return HTTP.get(api_url).then(response => {
          return response.data.content
        })
      } catch (error) {
        throw error
      }
    },
    async storeProduct(product: Product) {
      try {
        const api_url = import.meta.env.VITE_API_ENDPOINT + "products"
        console.log("storeProduct, api_url: "+ api_url)
        const data = await HTTP.post(api_url, product).then(response => {
          return response.data
        })
        return data
      } catch (error) {
        throw error
      }
    },
    async updateProduct(product: Product) {
      try {
        const api_url = import.meta.env.VITE_API_ENDPOINT + "products/"+product.id
        console.log("updateProduct, api_url: "+ api_url)
        const data = await HTTP.post(api_url, product).then(response => {
          return response.data
        })
        return data
      } catch (error) {
        throw error
      }
    },
    async deleteProduct(productId: number) {
      const api_url = import.meta.env.VITE_API_ENDPOINT + "products"
      console.log("deleteProduct, api_url: "+ api_url)
      try {
        const data = await HTTP.delete(api_url, { data: { productId: productId}, headers: { "Authorization": "***" } }).then(response => {
          console.log(response.data)
          return response.data
        })
        return data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
})