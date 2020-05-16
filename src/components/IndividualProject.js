import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";

export const IndividualProject = ({ project }) => {
  // const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    if (window.confirm("Are you sure you wish to delete the project?"))
      firebase
        .firestore()
        .collection("projects")
        .doc(docId)
        .delete()
        .then(() => {
          setProjects([...projects]);
          setSelectedProject("INBOX");
        });
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => deleteProject(project.docId)}
        onKeyDown={() => deleteProject(project.docId)}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
