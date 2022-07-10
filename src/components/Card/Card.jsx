import { useState, useEffect, useRef } from "react";
import { useData } from "context";
import { CardModal } from "components";
import "./Card.css";

const Card = ({
  id,
  title,
  description,
  status,
  listId,
  listIndex,
  cardIndex,
  dragItemIndex,
  setDragItemIndex,
}) => {
  const { state, dispatch } = useData();
  const [displayCardModal, setDisplayCardModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef();

  const dragStartHandler = (e) => {
    dragItem.current = e.target;
    setDragItemIndex({ listIndex, cardIndex });
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const dragEndHandler = () => {
    dragItem.current = null;
    setIsDragging(false);
    setDragItemIndex(null);
  };

  const dragEnterHandler = (e) => {
    if (e.target !== dragItem.current) {
      dispatch({
        type: "DRAG_AND_DROP",
        payload: {
          dragItemIndex,
          dropItemIndex: { listIndex, cardIndex },
        },
      });
      setDragItemIndex({ listIndex, cardIndex });
    }
  };

  useEffect(() => {
    setDisplayCardModal(false);
  }, [state]);

  return (
    <>
      {displayCardModal ? (
        <CardModal
          setDisplayCardModal={setDisplayCardModal}
          id={id}
          title={title}
          description={description}
          status={status}
          listId={listId}
        />
      ) : null}
      <p
        draggable
        id={id}
        className={`card-title ${
          title === "Untitled" ? "card-title-invalid" : ""
        } ${isDragging ? "card-dragging" : ""}`}
        onClick={() => setDisplayCardModal(true)}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        onDragEnter={dragEnterHandler}
      >
        {title}
      </p>
    </>
  );
};

export { Card };
