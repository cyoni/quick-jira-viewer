import { UPDATE_CONTEXT_MENU } from "./consts.js"
import { getTicketNumber, getUrl } from "./shared.js"
const CONTEXT_MENU_ID = "jira-viewer"
function openUrl(info, tab) {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return
  }
  chrome.tabs.create({
    url: getUrl(getTicketNumber(info.selectionText)),
  })
}

function updateContextMenu(text) {
  chrome.contextMenus.update(CONTEXT_MENU_ID, {
    contexts: ["selection"],
    visible: getTicketNumber(text).length > 0,
  })
}

chrome.contextMenus.create({
  id: CONTEXT_MENU_ID,
  title: "View Jira",
  contexts: ["selection"],
})
chrome.contextMenus.onClicked.addListener(openUrl)

function openPopup(tab) {
  const { windowId, url, index } = tab
  console.log("tab", url)
  const newTab = !String(url).startsWith("chrome://")
  chrome.system.display.getInfo({ singleUnified: true }, (info) => {
    const wDimension = info[0].workArea
    const { top, left, height, width } = wDimension
    console.log(top)
    const w = 440
    const h = 260
    const l = width / 2 - w / 2 + left
    const t = height / 2 - h / 2 + top
    const newWindow = () => {
      console.log("in new window function")
    }
    chrome.windows.create(
      {
        url: `popup.html?newTab=${newTab}&id=${windowId}&index=${index}`,
        type: "popup",
        width: w,
        height: h,
        left: Math.round(l),
        top: Math.round(t),
      },
      newWindow
    )
  })
}
chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`)
  if (command === "jira_popup_shortcut") {
    let queryOptions = { active: true, lastFocusedWindow: true }
    chrome.tabs.query(queryOptions).then((tab) => {
      console.log("tab", tab)
      openPopup(tab[0])
    })
  }
})

chrome.runtime.onMessage.addListener(function (request) {
  if (request.method == UPDATE_CONTEXT_MENU) {
    const { text } = request
    updateContextMenu(text)
  }
})
