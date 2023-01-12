function getUrl(ticketNum) {
  return "https://xxxxxxx.atlassian.net/browse/%s".replace("%s", ticketNum)
}

function waitForElm(selector) {
  console.log("waiting for:", selector)
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        console.log("found:", selector)

        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

function getTicketNumber(text) {
  let result = ""
  const inputWithOnlyNumbers = text.match(/\d+/g)?.[0] || ""
  if (inputWithOnlyNumbers.length === 4) result = `SI-${inputWithOnlyNumbers}`
  else if (inputWithOnlyNumbers.length === 5)
    result = `IN-${inputWithOnlyNumbers}`
  else result = inputWithOnlyNumbers
  if (!result.startsWith("IN") && !result.startsWith("SI")) result = ""
  return result
}
