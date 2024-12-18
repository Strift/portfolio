import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

export function compareFromString(a: string, b: string) {
  const aDate = dayjs(a)
  const bDate = dayjs(b)
  return aDate.isBefore(bDate) ? 1 : -1
}

export function toLocaleDateString(date: string) {
  return dayjs(date).format('MMMM D, YYYY')
}

export function toDateNumber(date: string) {
  return dayjs(date).format('D')
}

export function toCalendarDateString(date: string) {
  return dayjs(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MMMM D, YYYY',
  })
}

export function getDayFromDateString(date: string) {
  return dayjs(date).format('D')
}
