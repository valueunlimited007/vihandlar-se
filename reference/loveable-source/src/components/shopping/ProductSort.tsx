import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SortOption } from '@/hooks/useProducts'
import { ArrowUpDown } from 'lucide-react'

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
  hasSearch?: boolean
}

export const ProductSort = ({ value, onChange, hasSearch = false }: ProductSortProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sortera" />
        </SelectTrigger>
        <SelectContent>
          {hasSearch && (
            <SelectItem value="relevance">Relevans</SelectItem>
          )}
          <SelectItem value="name">Namn A-Ö</SelectItem>
          <SelectItem value="price_asc">Pris: Lägst först</SelectItem>
          <SelectItem value="price_desc">Pris: Högst först</SelectItem>
          <SelectItem value="discount">Största rabatten</SelectItem>
          <SelectItem value="newest">Nyaste produkter</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
