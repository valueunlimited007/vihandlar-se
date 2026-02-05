import { Helmet } from 'react-helmet-async'
import { createProductSchema, createProductBreadcrumbSchema } from '@/utils/productSchemaMarkup'
import type { ProductWithStore } from '@/hooks/useProducts'

interface ProductSchemaProps {
  product: ProductWithStore
}

export const ProductSchema = ({ product }: ProductSchemaProps) => {
  const productSchema = createProductSchema(product, product.stores)
  const breadcrumbSchema = createProductBreadcrumbSchema(product, product.stores)

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  )
}
