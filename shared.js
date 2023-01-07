import { DEFAULT_URL } from "./consts.js"

export function getUrl(ticketNum) {
  return DEFAULT_URL.replace("%s", ticketNum)
}

export function getTicketNumber(text) {
  let result = ""
  const inputWithOnlyNumbers = text.match(/\d+/g)?.[0] || ""
  if (inputWithOnlyNumbers.length === 4) result = `SI-${inputWithOnlyNumbers}`
  else if (inputWithOnlyNumbers.length === 5)
    result = `IN-${inputWithOnlyNumbers}`
  else result = inputWithOnlyNumbers
  if (!result.startsWith("IN") && !result.startsWith("SI")) result = ""
  return result
}
