const profiles = {
  merchant: {
    title: "Área do comerciante",
    description: "Cadastre e acompanhe encomendas em um só lugar."
  },
  operator: {
    title: "Área do operador",
    description: "Gerencie entregas e consulte rotas da operação."
  },
  consumer: {
    title: "Área do consumidor",
    description: "Acompanhe sua encomenda do envio até a chegada."
  },
  authorities: {
    title: "Área de autoridades",
    description: "Consulte registros e ocorrências autorizadas."
  }
};

const homeView = document.querySelector("#home-view");
const profileView = document.querySelector("#profile-view");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const merchantDashboard = document.querySelector("#merchant-dashboard");
const operatorDashboard = document.querySelector("#operator-dashboard");
const consumerDashboard = document.querySelector("#consumer-dashboard");
const authoritiesDashboard = document.querySelector("#authorities-dashboard");
const genericProfilePanel = document.querySelector("#generic-profile-panel");
const merchantTitle = document.querySelector("#merchant-title");
const operatorTitle = document.querySelector("#operator-title");
const consumerTitle = document.querySelector("#consumer-title");
const authoritiesTitle = document.querySelector("#authorities-title");
const newOrderDialog = document.querySelector("#new-order-dialog");
const deliveryDialog = document.querySelector("#delivery-dialog");
const incidentDialog = document.querySelector("#incident-dialog");

function showHome() {
  [newOrderDialog, deliveryDialog, incidentDialog].forEach((dialog) => {
    if (dialog.open) {
      dialog.close();
    }
  });

  if (!profileView.hidden) {
    profileView.hidden = true;
    homeView.hidden = false;
    document.querySelector("[data-profile]").focus();
    return;
  }

  homeView.hidden = false;
  document.querySelector("[data-profile]").focus();
}

function showProfile(profileKey) {
  const profile = profiles[profileKey];

  if (!profile) {
    return;
  }

  [newOrderDialog, deliveryDialog, incidentDialog].forEach((dialog) => {
    if (dialog.open) {
      dialog.close();
    }
  });

  profileTitle.textContent = profile.title;
  profileDescription.textContent = profile.description;
  merchantDashboard.hidden = profileKey !== "merchant";
  operatorDashboard.hidden = profileKey !== "operator";
  consumerDashboard.hidden = profileKey !== "consumer";
  authoritiesDashboard.hidden = profileKey !== "authorities";
  genericProfilePanel.hidden = ["merchant", "operator", "consumer", "authorities"].includes(profileKey);
  homeView.hidden = true;
  profileView.hidden = false;

  if (profileKey === "merchant") {
    merchantTitle.focus();
  } else if (profileKey === "operator") {
    operatorTitle.focus();
  } else if (profileKey === "consumer") {
    consumerTitle.focus();
  } else if (profileKey === "authorities") {
    authoritiesTitle.focus();
  } else {
    profileTitle.focus();
  }
}

document.querySelectorAll("[data-profile]").forEach((card) => {
  card.addEventListener("click", () => showProfile(card.dataset.profile));
});

document.querySelectorAll("[data-back], [data-home-link]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
  });
});

document.querySelector("[data-open-order]").addEventListener("click", () => {
  newOrderDialog.showModal();
});

document.querySelectorAll("[data-close-order]").forEach((control) => {
  control.addEventListener("click", () => newOrderDialog.close());
});

newOrderDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    newOrderDialog.close();
  }
});

document.querySelectorAll("[data-delivery-details]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#detail-code").textContent = button.dataset.code;
    document.querySelector("#detail-recipient").textContent = button.dataset.recipient;
    document.querySelector("#detail-address").textContent = button.dataset.address;
    document.querySelector("#detail-priority").textContent = button.dataset.priority;
    document.querySelector("#detail-status").textContent = button.dataset.status;
    deliveryDialog.showModal();
  });
});

document.querySelectorAll("[data-close-delivery]").forEach((control) => {
  control.addEventListener("click", () => deliveryDialog.close());
});

deliveryDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    deliveryDialog.close();
  }
});

document.querySelectorAll("[data-incident-details]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#incident-detail-id").textContent = button.dataset.id;
    document.querySelector("#incident-detail-category").textContent = button.dataset.category;
    document.querySelector("#incident-detail-date").textContent = button.dataset.date;
    document.querySelector("#incident-detail-priority").textContent = button.dataset.priority;
    document.querySelector("#incident-detail-status").textContent = button.dataset.status;
    document.querySelector("#incident-detail-description").textContent = button.dataset.description;
    incidentDialog.showModal();
  });
});

document.querySelectorAll("[data-close-incident]").forEach((control) => {
  control.addEventListener("click", () => incidentDialog.close());
});

incidentDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    incidentDialog.close();
  }
});
