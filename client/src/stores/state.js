import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Alert } from "react-bootstrap";
const State = createSlice({
  name: "Card",
  initialState: {
    Token: localStorage.getItem("token") || null,
    fakecard: { name: "ALL", fake: false },
    card: [
      {
        Title: "Finish report",
        Date: "2025-08-01",
        Description: "Submit financial report to manager.",
        directory: "Work",
        completed: true,
        important: true,
        initialSstatus: "completed",
        id: 1,
      },
      {
        Title: "Buy groceries",
        Date: "2025-07-20",
        Description: "Milk, bread, eggs, and fruits.",
        directory: "Personal",
        completed: false,
        important: false,
        initialSstatus: "",
        id: 2,
      },
      {
        Title: "Doctor Appointment",
        Date: "2025-07-22",
        Description: "Annual physical check-up.",
        directory: "Health",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 3,
      },
      {
        Title: "Team meeting",
        Date: "2025-07-19",
        Description: "Project planning with dev team.",
        directory: "Work",
        completed: true,
        important: false,
        initialSstatus: "completed",
        id: 4,
      },
      {
        Title: "Pay utility bills",
        Date: "2025-07-21",
        Description: "Electricity and water bills.",
        directory: "Finance",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 5,
      },
      {
        Title: "Call mom",
        Date: "2025-07-20",
        Description: "Check in with mom.",
        directory: "Personal",
        completed: true,
        important: false,
        initialSstatus: "completed",
        id: 6,
      },
      {
        Title: "Car service",
        Date: "2025-07-25",
        Description: "Oil change and brake check.",
        directory: "Maintenance",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 7,
      },
      {
        Title: "Study React",
        Date: "2025-07-28",
        Description: "Hooks and Redux basics.",
        directory: "Learning",
        completed: false,
        important: false,
        initialSstatus: "",
        id: 8,
      },
      {
        Title: "Renew passport",
        Date: "2025-08-10",
        Description: "Apply online and submit documents.",
        directory: "Personal",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 9,
      },
      {
        Title: "Team review",
        Date: "2025-07-30",
        Description: "Quarterly team performance review.",
        directory: "Work",
        completed: true,
        important: true,
        initialSstatus: "completed",
        id: 10,
      },
      {
        Title: "Dentist appointment",
        Date: "2025-08-03",
        Description: "Teeth cleaning.",
        directory: "Health",
        completed: false,
        important: false,
        initialSstatus: "",
        id: 11,
      },
      {
        Title: "Plan vacation",
        Date: "2025-07-26",
        Description: "Decide on destination and book tickets.",
        directory: "Personal",
        completed: true,
        important: false,
        initialSstatus: "completed",
        id: 12,
      },
      {
        Title: "Backup laptop",
        Date: "2025-07-23",
        Description: "Backup important files to drive.",
        directory: "Maintenance",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 13,
      },
      {
        Title: "Grocery shopping",
        Date: "2025-07-20",
        Description: "Restock weekly supplies.",
        directory: "Home",
        completed: true,
        important: false,
        initialSstatus: "completed",
        id: 14,
      },
      {
        Title: "Prepare slides",
        Date: "2025-07-29",
        Description: "Slides for marketing presentation.",
        directory: "Work",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 15,
      },
      {
        Title: "Clean garage",
        Date: "2025-07-24",
        Description: "Organize tools and clear clutter.",
        directory: "Home",
        completed: false,
        important: false,
        initialSstatus: "",
        id: 16,
      },
      {
        Title: "Study JavaScript",
        Date: "2025-08-05",
        Description: "Focus on ES6+ and async/await.",
        directory: "Learning",
        completed: false,
        important: true,
        initialSstatus: "important",
        id: 17,
      },
      {
        Title: "Submit tax documents",
        Date: "2025-07-27",
        Description: "Send to accountant.",
        directory: "Finance",
        completed: true,
        important: true,
        initialSstatus: "completed",
        id: 18,
      },
      {
        Title: "Feed the cat",
        Date: "2025-07-18",
        Description: "Don't forget the cat food!",
        directory: "Home",
        completed: true,
        important: false,
        initialSstatus: "completed",
        id: 19,
      },
      {
        Title: "Fix bike tire",
        Date: "2025-07-31",
        Description: "Patch or replace rear tire.",
        directory: "Maintenance",
        completed: false,
        important: false,
        initialSstatus: "",
        id: 20,
      },
    ],
    menudrop: [],
  },
  reducers: {
    Addcard: (state, action) => {
      const { card } = state;
      const cardid = card[card.length - 1];
      const { Title, Date, Description, directory, status } = action.payload;
      card.push({
        initialSstatus: status,
        Title,
        Date,
        Description,
        directory,
        id: cardid.id + 1,
        completed: status == "completed",
        important: status == "important",
      });
    },
    Chengcard: (state, action) => {
      const { id, name } = action.payload;
      const item = state.card.find((item) => item.id === id);
      const { completed, important } = item;
      item.initialSstatus = name;
      name == "completed"
        ? (item.completed = !completed)
        : (item.important = !important);
    },
    DeleteCard: (state, action) => {
      const { id } = action.payload;
      const newCard = state.card.filter((item) => item.id != id);
      state.card = newCard;
    },
    EditeCard: (state, action) => {
      const { Title, Date, Description, directory, status, id } =
        action.payload;

      const item = state.card.findIndex((item) => item.id === id);
      state.card[item] = {
        initialSstatus: status,
        Title,
        Date,
        Description,
        directory,
        id: id,
      };
      if (status == "completed") {
        state.card[item].completed = true;
        state.card[item].important = false;
      } else if (status == "important") {
        state.card[item].completed = false;
        state.card[item].important = true;
      } else {
        state.card[item].completed = false;
        state.card[item].important = false;
      }
      // console.log(status);

      // console.log(state.card[item]);
    },
    Addmenu: (state, action) => {
      const { name } = action.payload;
      const bool =
        name.toUpperCase() === "MAIN" ||
        state.menudrop.some(
          (item) => item.toUpperCase() === name.toUpperCase()
        );

      !bool && state.menudrop.push(name);
      bool && alert("The name is repeated");
    },
    Editemenu: (state, action) => {
      const { name, newname } = action.payload;
      const index = state.menudrop.findIndex(
        (item) => item.toUpperCase() === name.toUpperCase()
      );
      state.menudrop[index] = newname;
    },
    Deletemenu: (state, action) => {
      const { name } = action.payload;
      const newdata = state.menudrop.filter(
        (item) => item.toUpperCase() != name.toUpperCase()
      );
      const newcard = state.card.filter((item) => item.directory != name);
      state.menudrop = newdata;
      state.card = newcard;
    },
    chengeFilter: (state, action) => {
      const { name, fake } = action.payload;
      state.fakecard = { name, fake };
    },
    Addtoken: (state, action) => {
      const { token } = action.payload;
      state.Token = token;
    },
  },
});
export const {
  Addcard,
  Chengcard,
  DeleteCard,
  EditeCard,
  Addmenu,
  Editemenu,
  Deletemenu,
  chengeFilter,
  Addtoken,
} = State.actions;
export default State.reducer;
