import { useState } from "react";
import { useData } from "context";
import { Card } from "components";
import "./List.css";
import { ListPopover } from "components/ListPopover/ListPopover";
import { useEffect } from "react";

const List = ({
  id,
  name,
  cards,
  listIndex,
  dragItemIndex,
  setDragItemIndex,
}) => {
  const { state, dispatch } = useData();
  const [displayCardInput, setDisplayCardInput] = useState(false);
  const [cardName, setCardName] = useState("");
  const [displayListPopover, setDisplayListPopover] = useState(false);

  const addNewCard = () => {
    dispatch({ type: "ADD_NEW_CARD", payload: { id, cardName } });
    setDisplayCardInput(false);
    setCardName("");
  };

  const cardInputHandler = (e) => {
    if (e.key === "Enter") {
      addNewCard();
    }
  };

  useEffect(() => {
    setDisplayListPopover(false);
  }, [state]);

  return (
    <>
      <div
        className="list"
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
        <div className="list-heading">
          <div className="list-intro">
            <p className="list-name">{name}</p>
            <p className="list-card-count">{cards.length}</p>
          </div>
          <button
            className="list-btn"
            onClick={() => setDisplayListPopover(!displayListPopover)}
          >
            ...
          </button>
          {displayListPopover ? <ListPopover listId={id} /> : null}
        </div>
        <div className="list-body">
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
          {displayCardInput ? (
            <input
              className="card-input"
              placeholder="Type a name..."
              autoFocus
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              onKeyDown={cardInputHandler}
              onBlur={addNewCard}
            />
          ) : null}
          <button
            className="list-new-card-btn"
            onClick={() => setDisplayCardInput(true)}
          >
            + New
          </button>
        </div>
      </div>
    </>
  );
};

export { List };
