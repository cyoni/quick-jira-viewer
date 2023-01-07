document.addEventListener(
  "mousedown",
  function (event) {
    if (event.button !== 2) {
      return false
    }
    const textSelected = window.getSelection().toString()
    if (event.button == 2) {
      chrome.runtime.sendMessage({
        method: "UPDATE_CONTEXT_MENU",
        text: textSelected,
        selection: textSelected !== "",
      })
    }
  },
  true
)
