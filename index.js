const eventsApi =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events";

const PARTY_LIST = document.getElementById("partyList");

const events = [
  {
    id: 1199,
    name: "Steve Party",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dui ipsum, hendrerit ut eleifend sit amet, dictum nec tortor. Ut et nunc condimentum, aliquam leo id, maximus quam. Nunc euismod venenatis dolor, sed interdum justo. Quisque in fermentum nulla. ",
    date: "2023-12-20T10:00:00.000Z",
    location: "20392 Cherry Street",
    cohortId: 13,
  },
  {
    id: 1199,
    name: "Park Party ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dui ipsum, hendrerit ut eleifend sit amet, dictum nec tortor. Ut et nunc condimentum, aliquam leo id, maximus quam. Nunc euismod venenatis dolor, sed interdum justo. Quisque in fermentum nulla. ",
    date: "2023-12-20T10:00:00.000Z",
    location: "20392 Cherry Street",
    cohortId: 13,
  },
  {
    id: 1199,
    name: "Griffin Party",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dui ipsum, hendrerit ut eleifend sit amet, dictum nec tortor. Ut et nunc condimentum, aliquam leo id, maximus quam. Nunc euismod venenatis dolor, sed interdum justo. Quisque in fermentum nulla. ",
    date: "2023-12-20T10:00:00.000Z",
    location: "20392 Cherry Street",
    cohortId: 13,
  },
];

function renderEvents() {
  for (let event of events) {
    const eventListItem = document.createElement("li");
    eventListItem.textContent = `Name: ${event.name} Description: ${event.description} Date: ${event.date} Location: ${event.location}`;
    PARTY_LIST.append(eventListItem);
  }
}

renderEvents();
