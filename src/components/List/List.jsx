import { useState } from "react";
import { useData } from "context";
import { Card, ListPopover } from "components";
import "./List.css";

const List = ({
  id,
  name,
  color,
  cards,
  listIndex,
  dragItemIndex,
  setDragItemIndex,
  displayListPopover,
  setDisplayListPopover,
}) => {
  const { dispatch } = useData();
  const [bottomCardInput, setBottomCardInput] = useState(false);
  const [topCardInput, setTopCardInput] = useState(false);
  const [cardName, setCardName] = useState("");

  const addNewCard = (location) => {
    dispatch({ type: "ADD_NEW_CARD", payload: { id, cardName, location } });
    setBottomCardInput(false);
    setTopCardInput(false);
    setCardName("");
  };

  const cardInputHandler = (e, location) => {
    if (e.key === "Enter") {
      addNewCard(location);
    }
  };

  return (
    <>
      <div className="list">
        <div
          className="list-heading"
          onDragEnter={() =>
            !cards.length
              ? dispatch({
                  type: "DRAG_AND_DROP",
                  payload: {
                    dragItemIndex,
                    dropItemIndex: { listIndex, cardIndex: 0 },
                  },
                })
              : null
          }
        >
          <div className="list-intro">
            <p className={`list-name ${color}`}>{name}</p>
            <p className="list-card-count">{cards.length}</p>
          </div>
          <div className="list-action-btns">
            <button
              className="list-btn"
              onClick={() =>
                displayListPopover === id
                  ? setDisplayListPopover("")
                  : setDisplayListPopover(id)
              }
            >
              ...
            </button>
            <button className="list-btn" onClick={() => setTopCardInput(true)}>
              +
            </button>
          </div>
          {displayListPopover === id ? (
            <ListPopover
              listId={id}
              setDisplayListPopover={setDisplayListPopover}
            />
          ) : null}
        </div>
        <div className="list-body">
          {topCardInput ? (
            <input
              className="card-input"
              placeholder="Type a name..."
              autoFocus
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              onKeyDown={(e) => cardInputHandler(e, "top")}
              onBlur={() => addNewCard("top")}
            />
          ) : null}
          {cards?.map((card, index) => (
            <Card
              id={card.id}
              {...card}
              listId={id}
              listIndex={listIndex}
              cardIndex={index}
              dragItemIndex={dragItemIndex}
              setDragItemIndex={setDragItemIndex}
            />
          ))}
        </div>
        <div className="list-footer">
          {bottomCardInput ? (
            <input
              className="card-input"
              placeholder="Type a name..."
              autoFocus
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              onKeyDown={(e) => cardInputHandler(e, "bottom")}
              onBlur={() => addNewCard("bottom")}
            />
          ) : null}
          <button
            className="list-new-card-btn"
            onClick={() => setBottomCardInput(true)}
          >
            + New
          </button>
        </div>
      </div>
    </>
  );
};

export { List };
