import { useSelector } from "react-redux";

export default function Filter({ name, fake }, search) {
  const cards = useSelector((state) => state.Card.card);

  let result = [];

  if (name === "ALL") {
    if (fake === "completed") {
      result = [...cards].sort((a, b) => {
        if (a.completed === b.completed) {
          return a.id - b.id;
        }
        return b.completed - a.completed;
      });
    } else if (fake === "uncompleted") {
      result = [...cards].sort((a, b) => {
        if (a.completed === b.completed) {
          return a.id - b.id;
        }
        return a.completed - b.completed;
      });
    } else if (fake === "last-first") {
      result = [...cards].sort(
        (a, b) =>
          Number(b.Date.replaceAll("-", "")) -
          Number(a.Date.replaceAll("-", ""))
      );
    } else if (fake === "earlier-first") {
      result = [...cards].sort(
        (a, b) =>
          Number(a.Date.replaceAll("-", "")) -
          Number(b.Date.replaceAll("-", ""))
      );
    } else {
      result = cards;
    }
  } else {
    result = cards.filter((item) => item[name] === fake);
  }

  if (search && search.trim() !== "") {
    result = result
      .filter((item) => item.Title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.Title.localeCompare(b.Title));
  }

  return result;
}
