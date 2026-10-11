'use client'

import { CalendarIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
// Components
import Button from '~/components/ui/button'
import Calendar from '~/components/ui/calendar'
import Popover from '~/components/ui/popover'
import withFormField from '../withFormField'
// Utils
import type { DateRange } from 'react-day-picker'
import { cn } from '~/shared/lib/cn'
import useMessages from '~/i18n/useMessages'
import { safeInitialDate, formatSingleDate, formatRangeDate } from './utils'
import type { RangeValue } from './types'

type Props = Omit<React.ComponentProps<'button'>, 'defaultValue'> & {
  defaultValue?: string | Date | RangeValue
  mode?: 'single' | 'range'
  name?: string
  disableFuture?: boolean
}

const DatePicker = ({
  className,
  name,
  defaultValue,
  mode = 'single',
  disableFuture = false,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | RangeValue | undefined>(() => {
    if (mode === 'single') {
      return safeInitialDate(defaultValue as string | Date)
    }
    return defaultValue as RangeValue
  })
  const t = useMessages('global')
  const futureDisabled = disableFuture ? { after: new Date() } : undefined

  const formattedDate = useMemo(() => {
    if (mode === 'range') {
      return formatRangeDate(date as RangeValue)
    }
    return formatSingleDate(date as Date)
  }, [date, mode])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant='outline'
          className={cn(
            'h-auto w-full min-w-0 justify-between bg-white hover:bg-white',
            !date && 'text-muted-foreground',
            className
          )}
          {...props}
        >
          <span className='mr-auto min-w-0 truncate'>
            {formattedDate || t('pick-a-date')}
          </span>
          <CalendarIcon />
          {mode === 'single' ? (
            <input
              type='hidden'
              name={name}
              value={(date as Date)?.toISOString() || ''}
            />
          ) : (
            <>
              <input
                type='hidden'
                name={`${name}_from`}
                value={(date as RangeValue)?.start?.toISOString() || ''}
              />
              <input
                type='hidden'
                name={`${name}_to`}
                value={(date as RangeValue)?.end?.toISOString() || ''}
              />
            </>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className='w-auto p-0' align='start'>
        {mode === 'single' ? (
          <Calendar
            mode='single'
            captionLayout='dropdown'
            selected={date as Date}
            defaultMonth={date as Date}
            disabled={futureDisabled}
            onSelect={(selected) => {
              setDate(selected)
              if (selected) setOpen(false)
            }}
          />
        ) : (
          <Calendar
            mode='range'
            captionLayout='dropdown'
            selected={
              {
                from: (date as RangeValue)?.start,
                to: (date as RangeValue)?.end
              } as DateRange
            }
            defaultMonth={(date as RangeValue)?.start}
            disabled={futureDisabled}
            onSelect={(range: DateRange | undefined) => {
              if (!range) return
              setDate({ start: range.from, end: range.to })
            }}
          />
        )}
      </Popover.Content>
    </Popover>
  )
}

export default withFormField(DatePicker)
