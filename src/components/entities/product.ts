import { ProductState } from '@/components/states/productState'

type Product = {
    id: number,
    name: string,
    type: string,
    description: string,
    price: number,
    modifyBy: string,
    createDate: Date,
    updateDate: Date
  }
const covertToProductState = (src:Product) => {
  return {
    id: src.id,
    name: src.name,
    type: src.type,
    description: src.description,
    price: src.price,
    modifyBy: src.modifyBy,
    createDate: src.createDate,
    updateDate: src.updateDate
  } as ProductState
}
  
export { Product, covertToProductState }