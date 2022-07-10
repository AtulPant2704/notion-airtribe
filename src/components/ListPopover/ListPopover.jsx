import { useData } from "context";
import "./ListPopover.css";
import { useEffect } from "react";
import { useRef } from "react";

const colors = ["Red", "Blue", "Green"];

const ListPopover = ({ listId, setDisplayListPopover }) => {
  const { dispatch } = useData();
  const elementRef = useRef();

  const closePopover = (e) => {
    if (!elementRef.current.contains(e.target)) {
      setDisplayListPopover("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", closePopover);
    }, 0);
    return () => {
      document.removeEventListener("click", closePopover);
    };
  }, []);

  return (
    <div className="list-popover" ref={elementRef}>
      <li
        className="color-item"
        onClick={() => dispatch({ type: "DELETE_LIST", payload: { listId } })}
      >
        Delete
      </li>
      <li className="color-item">Colors</li>
      {colors.map((color) => (
        <li
          key={color}
          className="color-item"
          onClick={() =>
            dispatch({ type: "CHANGE_LIST_COLOR", payload: { listId, color } })
          }
        >
          <span className={`color-box ${color}`}></span>
          {color}
        </li>
      ))}
    </div>
  );
};

export { ListPopover };
