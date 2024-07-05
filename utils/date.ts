import dayjs from "dayjs"

export function toMilliseconds(date: string) {
  return dayjs(date).millisecond()
}
