const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b";
const EVENTS_ENDPOINT = `${BASE_URL}/events`;
// const RSVP_ENDPOINT = `${BASE_URL}/rsvps`;
// attempting to do guests on my own. No data to pull from rsvps 1st thing I did
const GUESTS_ENDPOINT = `${BASE_URL}/guests`;

const PARTY_LIST = document.getElementById("partyList");
const PARTY_FORM = document.getElementById("partyForm");
const PARTY_NAME = document.getElementById("partyName");
const PARTY_DATE = document.getElementById("partyDate");
const PARTY_DESCRIPTION = document.getElementById("partyDescription");
const PARTY_LOCATION = document.getElementById("partyLocation");
const PARTY_TIME = document.getElementById("partyTime");
const GUEST_LIST = document.getElementById("guestList");

const events = [];
// 2nd thing i did was create guests array to track the guest objs
const guests = [];

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
// will place render(guests) here
function renderGuests(guests) {
  GUEST_LIST.textContent = "Guest List";
  for (const guest of guests) {
    const guestCard = document.createElement("div");
    const guestName = document.createElement("p");
    guestName.textContent = `Name: ${guest.name}`;
    const guestEmail = document.createElement("p");
    guestEmail.textContent = `E-mail: ${guest.email}`;
    const guestNumber = document.createElement("p");
    guestNumber.textContent = `Number: ${guest.phone}`;
    guestCard.replaceChildren(guestName, guestEmail, guestNumber);
    console.log(guestCard);
    GUEST_LIST.append(guestCard);
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

// will place fetch(guests) here
async function getGuests() {
  try {
    const response = await fetch(GUESTS_ENDPOINT);
    if (!response.ok) {
      console.log("Guest API Error", response.status);
      return;
    }
    const jsonResponse = await response.json();
    const guests = jsonResponse.data;
    renderGuests(guests);
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

// will place event listener
// would like to try right click
// then are you sure can't be undone option prior to deletion
// upon user selecting yes delete, if no go back to normal page view

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

// will place add(guests) here

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

// will place delete (guests) here

fetchEvents();
// renderGuests(guests);
getGuests();
