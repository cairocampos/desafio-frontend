import { DateTime } from "luxon";

type DurationUnits = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

export default function useDatetime() {
  const timeDiff = (ISODate: string) => {
    const start = DateTime.fromISO(ISODate);
    const end = DateTime.fromISO(DateTime.now().toISO());
    
    const diff = end.diff(start, ['years', 'month', 'day', 'hours', 'minutes', 'seconds']);
    const diffObject = diff.toObject()
    const durationUnits = {
      years: (amount: number) => `${amount} ${amount > 1 ? 'anos' : 'ano'} atrás`,
      months: (amount: number) => `${amount} ${amount > 1 ? 'meses' : 'mês'} atrás`,
      days: (amount: number) => `${amount} ${amount > 1 ? 'dias' : 'dia'} atrás`,
      hours: (amount: number) => `${amount} ${amount > 1 ? 'horas' : 'hora'} atrás`,
      minutes: (amount: number) => `${amount} ${amount > 1 ? 'minutos' : 'minuto'} atrás`,
      seconds: (amount: number) => `${amount} ${amount > 1 ? 'segundos' : 'segundo'} atrás`
    }
    const duration = Object.entries(diffObject).find(([key, value]) => !!value)
    if(duration?.length) {
      const unit = duration[0] as DurationUnits
      const value = duration[1]
      if(Object.keys(durationUnits).includes(unit)) {
        return durationUnits[unit](value);
      }
    }
    
    return DateTime.fromISO(ISODate).toFormat('yyyy LLL dd');
  }

  return {
    timeDiff
  }
}