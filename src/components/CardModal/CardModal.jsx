import { useState } from "react";
import { useData } from "context";
import "./CardModal.css";

const CardModal = ({
  setDisplayCardModal,
  id,
  title,
  description,
  status,
  listId,
}) => {
  const { state, dispatch } = useData();
  const [newCard, setNewCard] = useState({
    title,
    description,
    status,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div
        className="backdrop"
        onClick={() => setDisplayCardModal(false)}
      ></div>
      <div className="card-modal">
        <div className="card-header">
          <textarea
            name="title"
            className={`card-modal-title ${
              title === "Untitled" ? "card-modal-invalid-title" : ""
            }`}
            value={newCard.title}
            onChange={inputHandler}
          ></textarea>
          <label htmlFor="card-status">Status</label>
          <select
            id="card-status"
            name="status"
            className="card-status-select"
            onChange={inputHandler}
          >
            <option value={newCard.status}>{status}</option>
            {state.map((list) => (
              <option key={list.id} value={list.name}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="card-description"
          name="description"
          rows="5"
          cols="33"
          placeholder="Enter description for card"
          value={newCard.description}
          onChange={inputHandler}
        ></textarea>
        <div className="card-footer">
          <button
            className="card-modal-btn solid-btn"
            onClick={() =>
              dispatch({
                type: "EDIT_CARD",
                payload: {
                  listId,
                  cardId: id,
                  cardData: newCard,
                },
              })
            }
          >
            Save
          </button>
          <button
            className="card-modal-btn outline-btn"
            onClick={() =>
              dispatch({
                type: "DELETE_CARD",
                payload: { listId, cardId: id },
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export { CardModal };
