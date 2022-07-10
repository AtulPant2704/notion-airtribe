import {
  addCardHandler,
  editCardHandler,
  deleteCardHandler,
  dragAndDropHandler,
  deleteListHandler,
  addListHandler,
  listColorHandler,
} from "utils";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_CARD": {
      const { id, cardName, location } = action.payload;
      return addCardHandler(state, id, cardName, location);
    }
    case "EDIT_CARD": {
      const { listId, cardId, cardData } = action.payload;
      return editCardHandler(state, listId, cardId, cardData);
    }
    case "DELETE_CARD": {
      const { listId, cardId } = action.payload;
      return deleteCardHandler(state, listId, cardId);
    }
    case "DRAG_AND_DROP": {
      const { dragItemIndex, dropItemIndex } = action.payload;
      return dragAndDropHandler(state, dragItemIndex, dropItemIndex);
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      return deleteListHandler(state, listId);
    }
    case "ADD_NEW_LIST": {
      const { listName } = action.payload;
      return addListHandler(state, listName);
    }
    case "CHANGE_LIST_COLOR": {
      const { listId, color } = action.payload;
      return listColorHandler(state, listId, color);
    }
    default:
      return state;
  }
};

export { dataReducer };
