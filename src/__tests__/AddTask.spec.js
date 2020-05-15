import React from "react";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { AddTask } from "../components/AddTask";
import { useSelectedProjectValue } from "../context";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: "1" })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("Never mock firebase")),
      })),
    })),
  },
}));

describe("<AddTask />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("should render the <AddTask />", () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId("add-task-comp")).toBeTruthy();
    });

    it("should render the <AddTask /> quick overlay", () => {
      const { queryByTestId } = render(
        <AddTask showAddTaskMain={false} showQuickAddTask={true} />
      );
      expect(queryByTestId("quick-add-task")).toBeTruthy();
    });

    it("renders the <AddTask /> main showable using onClick", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTask /> main showable using keyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTask /> project overlay when using onClick", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("show-project-overlay"));
      expect(queryByTestId("project-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> project overlay when using onKeyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("show-project-overlay"));
      expect(queryByTestId("project-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> task date overlay when using onClick", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> task date overlay when using onKeyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("hides the <AddTask /> main when cancel is clicked using onClick", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });

    it("hides the <AddTask /> main when cancel is clicked using onKeyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });

    it("should render the <AddTask /> quick overlay and then click cancel using onClick", () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain={false}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      expect(queryByTestId("quick-add-task")).toBeTruthy();
      fireEvent.click(queryByTestId("add-task-quick-cancel"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("should render the <AddTask /> quick overlay and then click cancel using onKeyDown", () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain={false}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      expect(queryByTestId("quick-add-task")).toBeTruthy();
      fireEvent.keyDown(queryByTestId("add-task-quick-cancel"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("should render <AddTask /> and adds a task to TODAY", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "TODAY",
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain={false}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      expect(queryByTestId("add-task-content")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "I am a new task and I am amazing!" },
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "I am a new task and I am amazing!"
      );

      fireEvent.click(queryByTestId("add-task"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("should render <AddTask /> and adds a task to NEXT_7", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "NEXT_7",
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain={false}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      expect(queryByTestId("add-task-content")).toBeTruthy();

      act(() => {
        fireEvent.change(queryByTestId("add-task-content"), {
          target: { value: "I am a new task and I am amazing!" },
        });
      });

      expect(queryByTestId("add-task-content").value).toBe(
        "I am a new task and I am amazing!"
      );
      act(() => {
        fireEvent.click(queryByTestId("add-task"));
      });

      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
  });
});
