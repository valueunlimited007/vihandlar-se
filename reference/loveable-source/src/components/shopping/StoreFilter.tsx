import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStores } from '@/hooks/useProducts'
import { Skeleton } from '@/components/ui/skeleton'

interface StoreFilterProps {
  value?: string
  onChange: (value: string) => void
}

export const StoreFilter = ({ value, onChange }: StoreFilterProps) => {
  const { data: stores, isLoading } = useStores()

  if (isLoading) {
    return <Skeleton className="h-10 w-[280px]" />
  }

  if (!stores || stores.length === 0) {
    return null
  }

  return (
    <Select value={value || 'all'} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Alla butiker" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Alla butiker</SelectItem>
        {stores.map((store) => (
          <SelectItem key={store.id} value={store.slug}>
            {store.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
