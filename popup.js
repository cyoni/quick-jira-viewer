import { getTicketNumber, getUrl } from "./shared.js"

function setText(txt) {
  $("#number").focus()
  $("#number").val("")
  $("#number").val(txt)
}

function getParam(name) {
  let searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(name)
}

$(() => {
  setText("")
  $("#newTab").val(getParam("newTab"))
  $("#tabId").val(getParam("id"))
  $("#index").val(getParam("index"))
  $("input").keyup((key) => {
    if (key.which == 27) window.close()
    const currentText = $("#number").val()
    const ticketNum = getTicketNumber(currentText)
    if (ticketNum) setText(ticketNum)
  })
})

let jiraNum = getParam("number")
if (jiraNum) {
  let pattern = /(IN|SI)-\d+/i
  jiraNum = jiraNum.match(pattern)?.[0]
  if (jiraNum) {
    window.open(getUrl(jiraNum))
    window.close()
  }
}
