import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, X } from 'lucide-react'

interface DateRangeFilterProps {
  onFilter: (from: string | null, to: string | null) => void
}

export default function DateRangeFilter({ onFilter }: DateRangeFilterProps) {
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  const handleApply = () => {
    if (fromDate || toDate) {
      onFilter(fromDate || null, toDate || null)
    }
  }

  const handleClear = () => {
    setFromDate('')
    setToDate('')
    onFilter(null, null)
  }

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="from-date" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          De
        </Label>
        <Input
          id="from-date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="to-date" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Até
        </Label>
        <Input
          id="to-date"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleApply}
          disabled={!fromDate && !toDate}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Aplicar
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="border-border hover:bg-muted"
        >
          <X className="w-4 h-4 mr-2" />
          Limpar
        </Button>
      </div>
    </div>
  )
}
