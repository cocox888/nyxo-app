import { getNightDuration } from '@helpers/sleep/sleep'
import { HealthKitSleepResponse, Night, Value } from '@typings/Sleepdata'
import { differenceInMinutes, parse, parseISO } from 'date-fns'

export const formatHealthKitResponse = (
  hkSample: HealthKitSleepResponse
): Night => {
  console.log(hkSample)
  const startDate = parseISO(hkSample.startDate)
  const endDate = parseISO(hkSample.endDate)
  let minutes = differenceInMinutes(endDate, startDate)
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  const isoStartDate = startDate.toISOString()
  const isoEndDate = endDate.toISOString()

  const totalDuration = getNightDuration(isoStartDate, isoEndDate)

  return {
    id: hkSample.uuid,
    sourceId: hkSample.sourceId,
    sourceName: hkSample.sourceName,
    value: healthKitSampleToValue(hkSample.value),
    startDate: isoStartDate,
    endDate: isoEndDate,
    totalDuration
  }
}

export const healthKitSampleToValue = (healthKitSample: string): Value => {
  switch (healthKitSample) {
    case 'INBED':
      return Value.InBed
    case 'ASLEEP':
      return Value.Asleep
    case 'AWAKE':
      return Value.Awake
    default:
      return Value.InBed
  }
}
