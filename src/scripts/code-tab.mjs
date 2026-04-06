class NordCodeGroup extends HTMLElement {
  constructor() {
    super();

    this._init = this._init.bind(this);
  }

  connectedCallback() {
    if (this.children.length) {
      this._init();
    }
  }

  _init() {
    this.tablist = this.querySelectorAll("[role='tablist']");
    this.buttons = this.querySelectorAll("[role='tab']");
    this.panels = this.querySelectorAll("[role='tabpanel']");

    this.initButtons();

    this.initPanels();
  }

  initButtons() {
    let count = 0;
    let hasASelectedButton = false;

    if (!hasASelectedButton) {
      hasASelectedButton =
        Array.from(this.buttons).filter(
          (btn) => btn.getAttribute("aria-selected") === "true",
        ).length > 0;
    }

    for (let button of this.buttons) {
      let isSelected = button.getAttribute("aria-selected") === "true";
      if (!hasASelectedButton && count === 0) {
        isSelected = true;
      }

      if (!button.hasAttribute("aria-selected")) {
        button.setAttribute("aria-selected", isSelected);
      }
      button.setAttribute("tabindex", isSelected ? "0" : "-1");

      button.addEventListener("click", this.clickEvenetListner.bind(this));

      button.index = count++;
    }
  }

  initPanels() {
    let selectedPanelId = this.querySelector(
      "[role='tab'][aria-selected='true']",
    ).getAttribute("aria-controls");

    for (let panel of this.panels) {
      if (panel.getAttribute("id") !== selectedPanelId) {
        panel.setAttribute("hidden", "true");
      }

      panel.setAttribute("tabindex", "0");
    }
  }

  clickEvenetListner(event) {
    let button = event.target;
    event.preventDefault();

    this.activateTab(button);
  }

  activateTab(tab) {
    if (!tab.getAttribute("role") !== "tab") {
      tab = tab.closest("[role='tab']");
    }

    this.deactiveTabs();

    tab.removeAttribute("tabindex");
    tab.setAttribute("aria-selected", "true");

    const controls = tab.getAttribute("aria-controls");
    const panel = document.getElementById(controls);
    if (panel) {
      panel.removeAttribute("hidden");
    }
  }

  deactiveTabs() {
    for (let button of this.buttons) {
      button.setAttribute("aria-selected", "false");
      button.setAttribute("tabindex", "-1");
    }

    for (let panel of this.panels) {
      panel.setAttribute("hidden", "true");
    }
  }
}

customElements.define("nord-code-group", NordCodeGroup);
