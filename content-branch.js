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

function getJiraNumber(branchName) {
  const pattern = /(IN-(\d{5}))|(SI-(\d{4}))/i
  return String(branchName.match(pattern)?.[0])
}
const addLinkToIssue = async () => {
  const branchName = $(
    "#head-ref-selector .css-truncate.css-truncate-target"
  )?.html()

  if (!branchName) return null

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
}

const addActionButton = async () => {
  const branchNameElement = $(".head-ref .css-truncate-target")[0]
  console.log("branchNameElement", branchNameElement)
  const branchName = String(branchNameElement?.innerHTML)
  const jiraNumber = getJiraNumber(branchName)

  const buttonsActionElement = await waitForElm(".gh-header-actions")
  const btnElement = document.createElement("button")
  btnElement.id = "jira-btn"
  btnElement.className = "btn btn-sm"
  btnElement.style.marginRight = "4px"
  btnElement.innerHTML = "View Issue"
  btnElement.onclick = () => {
    window.open(`http://xxxxxxxxx?id=${jiraNumber}`, "_blank")
  }

  buttonsActionElement.insertBefore(btnElement, buttonsActionElement.firstChild)
}

// get message from background.js
chrome.runtime.onMessage.addListener((request) => {
  if (request.method == "pr_page" && !document.getElementById("jira-btn")) {
    addActionButton()
  } else if (
    request.method === "add-link-to-issue" &&
    !document.getElementById("jira-link-container")
  ) {
    console.log("element", document.getElementById("jira-link-container"))
    console.log("got message")
    addLinkToIssue()
  }
})
