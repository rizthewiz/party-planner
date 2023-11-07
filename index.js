const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b";
const EVENTS_ENDPOINT = `${BASE_URL}/events`;
// const RSVP_ENDPOINT = `${BASE_URL}/rsvps`;
// const GUESTS_ENDPOINT = `${BASE_URL}/guests`;

const PARTY_LIST = document.getElementById("partyList");
const PARTY_FORM = document.getElementById("partyForm");
const PARTY_NAME = document.getElementById("partyName");
const PARTY_DATE = document.getElementById("partyDate");
const PARTY_DESCRIPTION = document.getElementById("partyDescription");
const PARTY_LOCATION = document.getElementById("partyLocation");
const PARTY_TIME = document.getElementById("partyTime");

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

PARTY_FORM.addEventListener("submit", function (event) {
  event.preventDefault();
  const newParty = {
    name: PARTY_NAME.value,
    description: PARTY_DESCRIPTION.value,
    date: `${PARTY_DATE.value}T${PARTY_TIME.value}:00Z`,
    location: PARTY_LOCATION.value,
  };
  console.log(newParty);
  createEvent(newParty);
});

async function createEvent(event) {
  try {
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      console.log("API error", response);
      return;
    }
    const jsonResponse = await response.json();
    const events = jsonResponse.data;
    console.log(events);
  } catch (err) {
    console.error(err);
  }
}

fetchEvents();
