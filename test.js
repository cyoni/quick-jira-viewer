import axios from "axios"

async function x() {
  const res = await fetch(
    "https://be.wizzair.com/14.2.0/Api/search/timetable",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,he;q=0.8,la;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sentry-trace": "d5414edaeb5c4d2597f8eb3f413d898b-b290103d54925bf5-0",
        "x-requestverificationtoken": "dc99d6b27ae04514b1dR910a9b953916",
      },
      referrer: "",
      referrerPolicy: "no-referrer-when-downgrade",
      body: '{"flightList":[{"departureStation":"TLV","arrivalStation":"NAP","from":"2023-01-01","to":"2023-01-10"}],"priceType":"wdc","adultCount":1,"childCount":0,"infantCount":0}',
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  )

  const abc = await res.json()
  console.log("res", JSON.stringify(abc))
}

x()
