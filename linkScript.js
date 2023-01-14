function getJiraNumber(branchName) {
  const pattern = /(IN-(\d{5}))|(SI-(\d{4}))/i
  const name = branchName.match(pattern)?.[0]
  return name ? String(name) : null
}

;(async () => {
  try {
    const branchName = document.querySelector(
      "#head-ref-selector .css-truncate.css-truncate-target"
    ).innerHTML

    const linkElm = document.getElementById("jira-link-container")
    if (!branchName || linkElm) return null

    const branchInputElement = document.getElementById("pull_request_title")
    const branchInputValue = String(branchInputElement.value)
    const jiraNumber = getJiraNumber(branchName)

    if (jiraNumber && !branchInputValue.startsWith(jiraNumber)) {
      const newPrTitle = `${jiraNumber} - ${branchInputValue}`
      branchInputElement.value = newPrTitle
    }

    const discussionElement = document.querySelector(".discussion-topic-header")
    const divElement = document.createElement("div")
    divElement.id = "jira-link-container"
    const newLinkElement = document.createElement("a")
    newLinkElement.href = `http://example.com?id=${jiraNumber}`
    newLinkElement.target = "_blank"
    newLinkElement.innerHTML = "View Issue >"
    divElement.appendChild(newLinkElement)
    divElement.style.textAlign = "right"
    discussionElement.appendChild(divElement)
  } catch (e) {
    console.log("error", e.message)
  }
})()
