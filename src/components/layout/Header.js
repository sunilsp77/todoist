import React, { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import PropTypes from "prop-types";
import { AddTask } from "../AddTask";
import { Sidebar } from "./Sidebar";

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <header className="header" data-testid="header">
        <nav>
          <div className="logo" onClick={() => setShowSidebar(!showSidebar)}>
            <img src="/images/logo.png" alt="Todoist" />
          </div>
          <div className="settings">
            <ul>
              <li className="settings__add">
                <button
                  data-testid="quick-add-task-action"
                  aria-label="Quick add task"
                  type="button"
                  onClick={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                  onKeyDown={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                >
                  +
                </button>
              </li>
              <li className="settings__darkmode">
                <button
                  data-testid="dark-mode-action"
                  aria-label="Darkmode on/off"
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  onKeyDown={() => setDarkMode(!darkMode)}
                >
                  <FaPizzaSlice />
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <AddTask
          showAddTaskMain={false}
          shouldShowMain={shouldShowMain}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      </header>
      {showSidebar && (
        <div className="content">
          <Sidebar />
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
