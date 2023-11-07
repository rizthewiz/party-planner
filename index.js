const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b";
const EVENTS_ENDPOINT = `${BASE_URL}/events`;

const PARTY_LIST = document.getElementById("partyList");

const events = [];

function renderEvents(events) {
  for (let event of events) {
    const eventListItem = document.createElement("li");
    eventListItem.textContent = `Name: ${event.name} Description: ${event.description} Date: ${event.date} Location: ${event.location}`;
    PARTY_LIST.append(eventListItem);
  }
}

async function fetchEvents() {
  try {
    const response = await fetch(EVENTS_ENDPOINT);
    if (!response.ok) {
      console.log("API error", response.status);
      return;
    }
    const jsonResponse = await response.json();
    const events = jsonResponse.data;
    renderEvents(events);
  } catch (err) {
    console.error(err);
  }
}

fetchEvents();
