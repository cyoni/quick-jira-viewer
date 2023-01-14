importScripts("./shared.js")

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
  const newTab = !String(url).startsWith("chrome://")
  chrome.system.display.getInfo({ singleUnified: true }, (info) => {
    const wDimension = info[0].workArea
    const { top, left, height, width } = wDimension
    const w = 440
    const h = 260
    const l = width / 2 - w / 2 + left
    const t = height / 2 - h / 2 + top
    const newWindow = () => {}
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
  if (command === "jira_popup_shortcut") {
    let queryOptions = { active: true, lastFocusedWindow: true }
    chrome.tabs.query(queryOptions).then((tab) => {
      openPopup(tab[0])
    })
  }
})

chrome.runtime.onMessage.addListener(function (request) {
  if (request.method == "UPDATE_CONTEXT_MENU") {
    const { text } = request
    updateContextMenu(text)
  }
})

function injectScript(script, tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: [script, "shared.js"],
    },
    () => {
      console.log("script injected on", tabId)
    }
  )
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const prPagePattern = /https:\/\/github.com\/.+\/.+\/pull\/\d+/g
  const newPrPattern = /https:\/\/github.com\/.+\/.+\/compare\/.+/g
  if (changeInfo?.status !== "complete" || !tab.url) return
  if (tab.url.match(prPagePattern)) {
    injectScript("script.js", tabId)
  } else if (tab.url.match(newPrPattern)) {
    injectScript("linkScript.js", tabId)
  }
})
