
function getJiraNumber(branchName) {
  const pattern = /(IN-(\d{5}))|(SI-(\d{4}))/i
  return String(branchName.match(pattern)?.[0])
}

;(async () => {
  const issueTitle = document.querySelector(".js-issue-title")
  console.log("issueTitle", issueTitle)
  //issueTitle.innerHTML = "this is a test@@@@@"

  const branchNameElement = document.querySelector(
    ".head-ref .css-truncate-target"
  )
  console.log("branchNameElement", branchNameElement)
  const branchName = String(branchNameElement?.innerHTML)
  const jiraNumber = getJiraNumber(branchName)
  console.log("jiraNumber", jiraNumber)

  const buttonsActionElement = await waitForElm(".gh-header-actions")

  const jiraBtnElementCheck = document.getElementById("jira-btn")
  if (jiraBtnElementCheck) return

  const btnElement = document.createElement("button")
  btnElement.id = "jira-btn"
  btnElement.className = "btn btn-sm"
  btnElement.style.marginRight = "4px"
  btnElement.innerHTML = "View Issue"
  btnElement.onclick = () => {
    window.open(`http://xxxxxxxxx?id=${jiraNumber}`, "_blank")
  }

  buttonsActionElement.insertBefore(btnElement, buttonsActionElement.firstChild)
})()
