function setText(txt) {
  $("#number").focus();
  $("#number").val("");
  $("#number").val(txt);
}

function getParam(name) {
  let searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name);
}

$(() => {
  setText("");

  $("#newTab").val(getParam("newTab"));
  $("#tabId").val(getParam("id"));
  $("#index").val(getParam("index"));
  $("input").keyup(function (key) {
    if (key.which == 27) window.close();

    const currentText = $("#number").val();
    const inputWithOnlyNumbers = currentText.match(/\d+/g)?.[0] || "";

    if (inputWithOnlyNumbers.length === 4)
      setText(`SI-${inputWithOnlyNumbers}`);
    else if (inputWithOnlyNumbers.length === 5)
      setText(`IN-${inputWithOnlyNumbers}`);
    else setText(inputWithOnlyNumbers);
  });
});

let searchParams = new URLSearchParams(window.location.search);
let jiraNum = getParam("number");
const isNewTab = getParam("newTab") === "true";
const windowId = getParam("tabId");
const index = getParam("index");
if (jiraNum) {
  // chrome.runtime.sendMessage(
  //   {
  //     method: "REDIRECT_JIRA_URL",
  //     windowId,
  //     index,
  //   },
  //   function (res) {
  //     console.log("res from service worker", res)
  //   }
  // )

  let pattern = /(IN|SI)-\d+/i;
  jiraNum = jiraNum.match(pattern)?.[0];
  if (jiraNum) {
    window.open(`https://xxxxxxx.atlassian.net/browse/${jiraNum}`);
    window.close();
  }
}
