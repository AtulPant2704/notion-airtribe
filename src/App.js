import { useState, useEffect } from "react";
import { useData } from "context";
import { List, NewListModal } from "components";
import "./App.css";

function App() {
  const { state } = useData();
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [displayListModal, setDisplayListModal] = useState(false);
  const [displayListPopover, setDisplayListPopover] = useState(false);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    setDisplayListPopover("");
  }, [state]);

  return (
    <div className="App">
      {state.map((item, index) => (
        <List
          id={item.id}
          {...item}
          listIndex={index}
          dragItemIndex={dragItemIndex}
          setDragItemIndex={setDragItemIndex}
          displayListPopover={displayListPopover}
          setDisplayListPopover={setDisplayListPopover}
        />
      ))}

      {displayListModal ? (
        <NewListModal setDisplayListModal={setDisplayListModal} />
      ) : (
        <button
          className="new-list-btn"
          onClick={() => setDisplayListModal(true)}
        >
          +
        </button>
      )}
    </div>
  );
}

export default App;
