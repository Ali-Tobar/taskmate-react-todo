import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    // Add a new task to the list.
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };

      return [...currentTodos, newTodo];
    }
    // Toggle the completion status of the selected task.
    case "toggled": {
      return currentTodos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo,
      );
    }
    // Remove the selected task from the list.
    case "deleted": {
      return currentTodos.filter((todo) => todo.id !== action.payload.id);
    }
    // Update the selected task's title and details.
    case "edited": {
      return currentTodos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              details: action.payload.details,
            }
          : todo,
      );
    }

    default: {
      throw Error("Unknown Action " + action.type);
    }
  }
}