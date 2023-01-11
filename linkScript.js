function getJiraNumber(branchName) {
  const pattern = /(IN-(\d{5}))|(SI-(\d{4}))/i
  const name = branchName.match(pattern)?.[0]
  console.log("got branch name",name)
  return name ? String(name) : null
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
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

console.log("hello from linkScript.js")
;(async () => {
  const branchName = document.querySelector(
    "#head-ref-selector .css-truncate.css-truncate-target"
  ).innerHTML

  if (!branchName) return null
  const linkElem = document.getElementById("jira-link-container")
  if (linkElem) return

  const branchInputElement = await waitForElm("#pull_request_title")
  const branchInputValue = String(branchInputElement.value)
  const jiraNumber = getJiraNumber(branchName)

  if (jiraNumber && !branchInputValue.startsWith(jiraNumber)) {
    const newPrTitle = `${jiraNumber} - ${branchInputValue}`
    branchInputElement.value = newPrTitle
  }

  const discussionElement = await waitForElm(".discussion-topic-header")
  const divElement = document.createElement("div")
  divElement.id = "jira-link-container"
  const linkElement = document.createElement("a")
  linkElement.href = `http://ynet.co.il?id=${jiraNumber}`
  linkElement.target = "_blank"
  linkElement.innerHTML = "View Issue >"
  divElement.appendChild(linkElement)
  divElement.style.textAlign = "right"
  discussionElement.appendChild(divElement)
})()
