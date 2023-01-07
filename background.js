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
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, { action: command })
    //   let [tab] = await chrome.tabs.query(queryOptions);
    // })

    let queryOptions = { active: true, lastFocusedWindow: true }
    chrome.tabs.query(queryOptions).then((tab) => {
      console.log("tab", tab)
      openPopup(tab[0])
    })
  }
})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.method == "REDIRECT_JIRA_URL") {
//     // wait until tab is updated, then send the msg.

//     console.log("info. windowId:", request.windowId, "index:", request.index)
//   }

//   return true
// })
