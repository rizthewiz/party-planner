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
const ADD_GUEST = document.createElement("button");
const DIALOG_VIEW = document.querySelector("dialog");

const events = [];
// 2nd thing i did was create guests array to track the guest objs
const guests = [];
// holds on to guest info
let user = {};

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
  ADD_GUEST.textContent = "ADD GUEST";
  for (const guest of guests) {
    const guestCard = document.createElement("div");
    const guestName = document.createElement("p");
    guestName.textContent = `Name: ${guest.name}`;
    const guestEmail = document.createElement("p");
    guestEmail.textContent = `E-mail: ${guest.email}`;
    const guestNumber = document.createElement("p");
    guestNumber.textContent = `Number: ${guest.phone}`;
    const removeGuest = document.createElement("button");
    removeGuest.textContent = "Remove";
    guestCard.replaceChildren(guestName, guestEmail, guestNumber, removeGuest);
    console.log(guestCard);
    GUEST_LIST.append(guestCard, ADD_GUEST);
    // would like to try remove button that gives are you sure can't be undone option prior to deletion
    // upon user selecting yes delete, if no go back to normal page view
    // will place delete (guests) here
    removeGuest.addEventListener("click", () => {
      DIALOG_VIEW.showModal();
      const warning = document.querySelector("#warning");
      const cancel = document.querySelector("#cancel");
      const remove = document.querySelector("#delete");
      const uninvited = guest.name;
      warning.textContent = `Clicking "Delete" will remove ${uninvited} from guest list. This cannot be undone. Are you sure that's what you want to do?`;
      // DIALOG_VIEW.close() to close
      cancel.addEventListener("click", () => {
        DIALOG_VIEW.close();
      });
      remove.addEventListener("click", async () => {
        await deleteGuest(guest.id);
        warning.textContent = `${uninvited} successfully deleted from guest list.`;
        setTimeout(() => {
          DIALOG_VIEW.close();
        }, 3000);
        fetchGuests();
      });
    });
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
async function fetchGuests() {
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

// will place event listeners here
// add button will create form to fill out

ADD_GUEST.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  console.log(modal);
  modal.style.display = "flex";
  const guestForm = document.querySelector("#guestForm");
  guestForm.addEventListener("submit", async (e) => {
    // onsubmit change display back to none
    e.preventDefault();
    const formData = new FormData(guestForm);
    const newGuest = Object.fromEntries(formData.entries());
    await addGuest(newGuest);
    modal.style.display = "none";
    fetchGuests();
  });
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

// will place add(guests) here
async function addGuest(guest) {
  try {
    const response = await fetch(GUESTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guest),
    });
    if (!response.ok) {
      console.log("Add Guest API error", response);
      return;
    }
  } catch (err) {
    console.eror(err);
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

async function deleteGuest(id) {
  try {
    const response = await fetch(`${GUESTS_ENDPOINT}/${id}`, {
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
// renderGuests(guests);
fetchGuests();
