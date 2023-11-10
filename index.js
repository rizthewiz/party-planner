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
  PARTY_LIST.innerHTML = "";
  for (let event of events) {
    const eventListItem = document.createElement("li");
    eventListItem.textContent = `Name: ${event.name} Description: ${event.description} Date: ${event.date} Location: ${event.location}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await deleteEvent(event.id);
      fetchEvents();
    });
    PARTY_LIST.append(eventListItem, deleteButton);
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

PARTY_FORM.addEventListener("submit", async function (event) {
  event.preventDefault();
  const newParty = {
    name: PARTY_NAME.value,
    description: PARTY_DESCRIPTION.value,
    date: new Date(`${PARTY_DATE.value}T${PARTY_TIME.value}`).toISOString(),
    location: PARTY_LOCATION.value,
  };
  console.log(newParty);
  await createEvent(newParty);
  fetchEvents();
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
  } catch (err) {
    console.error(err);
  }
}
async function deleteEvent(id) {
  // console.log("deleted");
  try {
    const response = await fetch(`${EVENTS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.log("API error", response);
      return;
    }
  } catch (err) {
    console.error(err);
  }
}

fetchEvents();
