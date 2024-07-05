import dayjs from "dayjs"

export function compareFromString(a: string, b: string) {
  const aDate = dayjs(a)
  const bDate = dayjs(b)
  return aDate.isBefore(bDate) ? 1 : -1
}
