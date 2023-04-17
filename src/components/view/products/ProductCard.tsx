import React from 'react'
import { ProductInterface } from '../../../interfaces'


// right now we're only passing product, but we might also be passing more things along the road
// like we're using typescript it's better to define a type for this prop here
function ProductCard(props: Props) { // right here we have to write the product will be getting props
  return (
    <div>
        {props.product.name}
    </div>
  )
}


export default ProductCard


// so I'll define a local interface here called Props
interface Props {
    product: ProductInterface;
}