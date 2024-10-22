export const createModalEnvironment = () => {
  const modalPortalTarget = document.createElement("div");
  modalPortalTarget.setAttribute("id", "modals");
  document.body.appendChild(modalPortalTarget);
};
