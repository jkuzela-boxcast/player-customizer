function makeResizable(handle, cssVar, side) {
  if (!handle) return;

  // Use pointer events on the handle with pointer capture so dragging
  // doesn't rely on document-level listeners and won't interfere with
  // other UI controls like range inputs.
  handle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);

    const startX = e.clientX;
    const startY = e.clientY;
    const startVal =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(cssVar),
      ) || 250;

    function onPointerMove(ev) {
      const maxWidth = window.innerWidth / 4;
      const maxHeight = window.innerHeight / 2;
      const deltaX = ev.clientX - startX;
      const deltaY = ev.clientY - startY;
      let newVal;
      if (side === "right" || side === "left") {
        newVal = Math.max(
          100,
          startVal + (side === "right" ? -deltaX : deltaX),
        );
        if (newVal > maxWidth) newVal = maxWidth;
      } else {
        newVal = Math.max(100, startVal + (side === "up" ? -deltaY : deltaY));
        if (newVal > maxHeight) newVal = maxHeight;
      }

      document.documentElement.style.setProperty(cssVar, newVal + "px");
    }

    function onPointerUp(ev) {
      try {
        handle.releasePointerCapture(ev.pointerId);
      } catch (err) {}
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerUp);
    }

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
    handle.addEventListener("pointercancel", onPointerUp);
  });
}

makeResizable(
  document.getElementById("handle-left-sidebar"),
  "--_left-width",
  "left",
);
makeResizable(
  document.getElementById("handle-right-sidebar"),
  "--_right-width",
  "right",
);
makeResizable(
  document.getElementById("handle-left-sidebar-section"),
  "--_left-sidebar-section-height",
  "bottom",
);
makeResizable(
  document.getElementById("handle-right-sidebar-section"),
  "--_right-sidebar-section-height",
  "bottom",
);

const playerComponents = [
  {
    name: "Video Player",
    description: "The main video player container",
    features: [
      {
        name: "Window",
        description: "The video player window itself",
        props: [
          {
            group: "Border",
            label: "Style",
            cssProp: "border-style",
            selector: ".boxcast-player-container",
            input: {
              type: "select",
              options: [
                { label: "None", value: "none" },
                { label: "Solid", value: "solid" },
                { label: "Dotted", value: "dotted" },
                { label: "Dashed", value: "dashed" },
              ],
              default: "none",
            },
          },
          {
            group: "Border",
            label: "Thickness",
            cssProp: "border-width",
            selector: ".boxcast-player-container",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 20,
              step: 1,
              default: 0,
            },
          },
          {
            group: "Border",
            label: "Color",
            cssProp: "border-color",
            selector: ".boxcast-player-container",
            input: {
              type: "color",
              default: "#000000",
            },
          },
        ],
      },
      {
        name: "Play Button",
        description: "The large play button in the center of the player",
        props: [
          {
            group: "Size",
            label: "Button Width",
            cssProp: "width",
            selector: "#boxcast-big-play-button",
            unit: "px",
            input: {
              type: "range",
              min: 8,
              max: 128,
              default: 100,
              step: 8,
            },
          },
          {
            group: "Size",
            label: "Button Height",
            cssProp: "height",
            selector: "#boxcast-big-play-button",
            unit: "px",
            input: {
              type: "range",
              min: 8,
              max: 128,
              default: 100,
              step: 8,
            },
          },
          {
            group: "Size",
            label: "Icon Width",
            cssProp: "width",
            selector: "#boxcast-big-play-button > svg",
            unit: "px",
            input: {
              type: "range",
              min: 4,
              max: 64,
              default: 50,
              step: 4,
            },
          },
          {
            group: "Size",
            label: "Icon Height",
            cssProp: "height",
            selector: "#boxcast-big-play-button > svg",
            unit: "px",
            input: {
              type: "range",
              min: 4,
              max: 64,
              default: 50,
              step: 4,
            },
          },
          {
            group: "Spacing",
            label: "Button Margin",
            cssProp: "margin",
            selector: "#boxcast-big-play-button",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 128,
              default: 32,
              step: 1,
            },
          },
          {
            group: "Spacing",
            label: "Button Padding",
            cssProp: "padding",
            selector: "#boxcast-big-play-button",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 128,
              default: 32,
              step: 1,
            },
          },
          {
            group: "Color",
            label: "Background Color",
            cssProp: "background-color",
            selector: "#boxcast-big-play-button",
            input: {
              type: "color",
              default: "#000000",
            },
          },
          {
            group: "Color",
            label: "Icon Color",
            cssProp: "fill",
            selector: "#boxcast-big-play-button > svg > path",
            input: {
              type: "color",
              default: "#ffffff",
            },
          },
        ],
      },
      {
        name: "Controls",
        description: "The video player controls (play, pause, volume, etc.)",
        props: [
          {
            group: "Icons",
            label: "Color",
            cssProp: "color",
            selector: ".video-controls",
            input: {
              type: "color",
              default: "#000000",
            },
          },
        ],
      },
    ],
  },
  {
    name: "Description Box",
    description: "The box that contains the video title and description",
    features: [
      {
        name: "Container",
        description: "The main container for the description box",
        props: [
          {
            group: "Background",
            label: "Background Color",
            cssProp: "background-color",
            selector: ".description-box",
            input: {
              type: "color",
              default: "#f0f0f0",
            },
          },
          {
            group: "Border",
            label: "Thickness",
            cssProp: "border-width",
            selector: ".description-box",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 10,
              step: 1,
              default: 1,
            },
          },
          {
            group: "Border",
            label: "Color",
            cssProp: "border-color",
            selector: ".description-box",
            input: {
              type: "color",
              default: "#cccccc",
            },
          },
        ],
      },
      {
        name: "Title",
        description: "The video title text",
        props: [
          {
            group: "Typography",
            label: "Font Size",
            cssProp: "font-size",
            selector: ".description-box .title",
            unit: "px",
            input: {
              type: "range",
              min: 12,
              max: 36,
              step: 1,
              default: 18,
            },
          },
          {
            group: "Typography",
            label: "Color",
            cssProp: "color",
            selector: ".description-box .title",
            input: {
              type: "color",
              default: "#000000",
            },
          },
          {
            group: "Spacing",
            label: "Margin Bottom",
            cssProp: "margin-bottom",
            selector: ".description-box .title",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 20,
              step: 1,
              default: 8,
            },
          },
        ],
      },
      {
        name: "Description",
        description: "The video description text",
        props: [
          {
            group: "Typography",
            label: "Font Size",
            cssProp: "font-size",
            selector: ".description-box .description",
            unit: "px",
            input: {
              type: "range",
              min: 12,
              max: 24,
              step: 1,
              default: 14,
            },
          },
          {
            group: "Typography",
            label: "Color",
            cssProp: "color",
            selector: ".description-box .description",
            input: {
              type: "color",
              default: "#333333",
            },
          },
        ],
      },
      {
        name: "Date & Time",
        description: "The date and time text",
        props: [
          {
            group: "Typography",
            label: "Font Size",
            cssProp: "font-size",
            selector: ".description-box .date-time",
            unit: "px",
            input: { type: "range", min: 12, max: 24, step: 1, default: 12 },
          },
          {
            group: "Typography",
            label: "Color",
            cssProp: "color",
            selector: ".description-box .date-time",
            input: {
              type: "color",
              default: "#666666",
            },
          },
        ],
      },
      {
        name: "Donate Button",
        description: "The donate button in the description box",
        props: [
          {
            group: "Size",
            label: "Width",
            cssProp: "width",
            selector: ".description-box .donate-button",
            unit: "px",
            input: {
              type: "range",
              min: 80,
              max: 200,
              step: 1,
              default: 120,
            },
          },
          {
            group: "Size",
            label: "Height",
            cssProp: "height",
            selector: ".description-box .donate-button",
            unit: "px",
            input: {
              type: "range",
              min: 32,
              max: 64,
              step: 1,
              default: 40,
            },
          },
          {
            group: "Color",
            label: "Background Color",
            cssProp: "background-color",
            selector: ".description-box .donate-button",
            input: {
              type: "color",
              default: "#ff0000",
            },
          },
          {
            group: "Color",
            label: "Text Color",
            cssProp: "color",
            selector: ".description-box .donate-button",
            input: {
              type: "color",
              default: "#ffffff",
            },
          },
        ],
      },
      {
        name: "Ticket Button",
        description: "The ticket button in the description box",
        props: [
          {
            group: "Size",
            label: "Width",
            cssProp: "width",
            selector: ".description-box .ticket-button",
            unit: "px",
            input: {
              type: "range",
              min: 80,
              max: 200,
              step: 1,
              default: 120,
            },
          },
          {
            group: "Size",
            label: "Height",
            cssProp: "height",
            selector: ".description-box .ticket-button",
            unit: "px",
            input: {
              type: "range",
              min: 32,
              max: 64,
              step: 1,
              default: 40,
            },
          },
          {
            group: "Color",
            label: "Background Color",
            cssProp: "background-color",
            selector: ".description-box .ticket-button",
            input: {
              type: "color",
              default: "#0000ff",
            },
          },
          {
            group: "Color",
            label: "Text Color",
            cssProp: "color",
            selector: ".description-box .ticket-button",
            input: {
              type: "color",
              default: "#ffffff",
            },
          },
        ],
      },
    ],
  },
  {
    name: "Playlist",
    description: "The playlist container that holds the list of videos",
    features: [
      {
        name: "Container",
        description: "The main container for the playlist",
        props: [
          {
            group: "Background",
            label: "Background Color",
            cssProp: "background-color",
            selector: ".playlist",
            input: {
              type: "color",
              default: "#f9f9f9",
            },
          },
          {
            group: "Border",
            label: "Thickness",
            cssProp: "border-width",
            selector: ".playlist",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 10,
              step: 1,
              default: 1,
            },
          },
          {
            group: "Border",
            label: "Color",
            cssProp: "border-color",
            selector: ".playlist",
            input: {
              type: "color",
              default: "#dddddd",
            },
          },
        ],
      },
      {
        name: "Header",
        description: "The header section of the playlist",
        props: [
          {
            group: "Typography",
            label: "Font Size",
            cssProp: "font-size",
            selector: ".playlist .header",
            unit: "px",
            input: {
              type: "range",
              min: 12,
              max: 36,
              step: 1,
              default: 18,
            },
          },
          {
            group: "Typography",
            label: "Color",
            cssProp: "color",
            selector: ".playlist .header",
            input: {
              type: "color",
              default: "#000000",
            },
          },
          {
            group: "Typography",
            label: "Search Bar Font Size",
            cssProp: "font-size",
            selector: ".playlist .search-bar",
            unit: "px",
            input: {
              type: "range",
              min: 12,
              max: 24,
              step: 1,
              default: 14,
            },
          },
          {
            group: "Background",
            label: "Search Bar Background Color",
            cssProp: "background-color",
            selector: ".playlist .search-bar",
            input: {
              type: "color",
              default: "#ffffff",
            },
          },
        ],
      },
      {
        name: "Video Item",
        description: "Each individual video item in the playlist",
        props: [
          {
            group: "Background",
            label: "Background Color",
            cssProp: "background-color",
            selector: ".playlist .video-item",
            input: {
              type: "color",
              default: "#ffffff",
            },
          },
          {
            group: "Border",
            label: "Thickness",
            cssProp: "border-width",
            selector: ".playlist .video-item",
            unit: "px",
            input: {
              type: "range",
              min: 0,
              max: 5,
              step: 1,
              default: 1,
            },
          },
          {
            group: "Border",
            label: "Color",
            cssProp: "border-color",
            selector: ".playlist .video-item",
            input: {
              type: "color",
              default: "#cccccc",
            },
          },
          {
            group: "Typography",
            label: "Title Font Size",
            cssProp: "font-size",
            selector: ".playlist .video-item .title",
            unit: "px",
            input: {
              type: "range",
              min: 12,
              max: 24,
              step: 1,
              default: 14,
            },
          },
          {
            group: "Typography",
            label: "Title Color",
            cssProp: "color",
            selector: ".playlist .video-item .title",
            input: {
              type: "color",
              default: "#000000",
            },
          },
          {
            group: "Typography",
            label: "Description Font Size",
            cssProp: "font-size",
            selector: ".playlist .video-item .description",
            unit: "px",
            input: {
              type: "range",
              min: 12,
              max: 24,
              step: 1,
              default: 12,
            },
          },
          {
            group: "Typography",
            label: "Description Color",
            cssProp: "color",
            selector: ".playlist .video-item .description",
            input: {
              type: "color",
              default: "#333333",
            },
          },
          {
            group: "Typography",
            label: "Date & Time Font Size",
            cssProp: "font-size",
            selector: ".playlist .video-item .date-time",
            unit: "px",
            input: { type: "range", min: 12, max: 24, step: 1, default: 12 },
          },
          {
            group: "Typography",
            label: "Date & Time Color",
            cssProp: "color",
            selector: ".playlist .video-item .date-time",
            input: {
              type: "color",
              default: "#666666",
            },
          },
        ],
      },
    ],
  },
];

// populate option list on page load (removed unused listener)
// main app functionality
document.addEventListener("DOMContentLoaded", () => {
  const compsEl = document.getElementById("list-player-components");
  const featuresEl = document.getElementById("list-component-features");
  const propsEl = document.getElementById("list-feature-properties");
  const cssPre = document.getElementById("css-output-pre");
  const previewStyle = document.getElementById("player-preview-css");
  const resetAllBtn = document.getElementById("button-reset-all");

  if (
    !compsEl ||
    !featuresEl ||
    !propsEl ||
    !cssPre ||
    !previewStyle ||
    !resetAllBtn
  ) {
    console.error("One or more required DOM elements are missing");
    return;
  }

  compsEl.style.overflowY = "auto";

  const state = {
    overrides: {}, // key: `${cIdx}_${fIdx}` => { [propIndex]: value }
    selectedComponent: 0,
    selectedFeature: 0,
  };

  function hasFeatureChanges(cIdx, fIdx) {
    const key = `${cIdx}_${fIdx}`;
    const o = state.overrides[key];
    return o && Object.keys(o).length > 0;
  }

  function hasComponentChanges(cIdx) {
    const comp = playerComponents[cIdx];
    for (let i = 0; i < comp.features.length; i++) {
      if (hasFeatureChanges(cIdx, i)) return true;
    }
    return false;
  }

  function renderComponents() {
    compsEl.innerHTML = "";
    playerComponents.forEach((comp, cIdx) => {
      const item = document.createElement("div");
      item.className = "component-item";
      item.style.padding = "0.35rem 0.5rem";
      item.style.cursor = "pointer";
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.alignItems = "center";

      const left = document.createElement("div");
      const title = document.createElement("div");
      title.textContent = comp.name;
      title.style.fontFamily = "var(--font-code)";
      const desc = document.createElement("div");
      desc.textContent = comp.description || "";
      desc.style.fontSize = "0.8rem";
      desc.style.opacity = "0.85";
      left.appendChild(title);
      left.appendChild(desc);

      const right = document.createElement("div");
      const dot = document.createElement("span");
      dot.className = "changed-dot";
      dot.style.display = hasComponentChanges(cIdx) ? "inline-block" : "none";
      right.appendChild(dot);

      item.appendChild(left);
      item.appendChild(right);

      if (cIdx === state.selectedComponent) {
        item.style.background = "rgba(255,255,255,0.02)";
      }

      item.addEventListener("click", () => {
        state.selectedComponent = cIdx;
        state.selectedFeature = 0;
        renderComponents();
        renderFeatures();
        renderProperties();
      });

      compsEl.appendChild(item);
    });
  }

  function renderFeatures() {
    featuresEl.innerHTML = "";
    const comp = playerComponents[state.selectedComponent];
    if (!comp || !comp.features || comp.features.length === 0) {
      const msg = document.createElement("div");
      msg.textContent = "No features available for this component.";
      msg.style.opacity = "0.8";
      featuresEl.appendChild(msg);
      return;
    }
    comp.features.forEach((feat, fIdx) => {
      const item = document.createElement("div");
      item.className = "feature-item";
      item.style.padding = "0.35rem 0.5rem";
      item.style.cursor = "pointer";
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.alignItems = "center";

      const left = document.createElement("div");
      const title = document.createElement("div");
      title.textContent = feat.name;
      title.style.fontFamily = "var(--font-code)";
      const desc = document.createElement("div");
      desc.textContent = feat.description || "";
      desc.style.fontSize = "0.8rem";
      desc.style.opacity = "0.85";
      left.appendChild(title);
      left.appendChild(desc);

      const right = document.createElement("div");
      const dot = document.createElement("span");
      dot.className = "changed-dot";
      dot.style.display = hasFeatureChanges(state.selectedComponent, fIdx)
        ? "inline-block"
        : "none";
      right.appendChild(dot);

      item.appendChild(left);
      item.appendChild(right);

      if (fIdx === state.selectedFeature) {
        item.style.background = "rgba(255,255,255,0.02)";
      }

      item.addEventListener("click", () => {
        state.selectedFeature = fIdx;
        renderFeatures();
        renderProperties();
      });

      featuresEl.appendChild(item);
    });
  }

  function getPropValue(cIdx, fIdx, pIdx) {
    const key = `${cIdx}_${fIdx}`;
    const o = state.overrides[key];
    if (o && o.hasOwnProperty(pIdx)) return o[pIdx];
    const def =
      playerComponents[cIdx].features[fIdx].props[pIdx].input?.default;
    if (def !== undefined) return String(def);
    return null;
  }

  function setPropValue(cIdx, fIdx, pIdx, val) {
    const key = `${cIdx}_${fIdx}`;
    if (!state.overrides[key]) state.overrides[key] = {};
    state.overrides[key][pIdx] = val;
    // Avoid re-rendering the properties panel while the user is
    // interacting with an input (e.g. dragging a range) because
    // recreating the input element interrupts the browser drag.
    renderFeatures();
    renderComponents();
    compileAndInjectCSS();
  }

  function resetFeature(cIdx, fIdx) {
    const key = `${cIdx}_${fIdx}`;
    delete state.overrides[key];
    renderFeatures();
    renderComponents();
    renderProperties();
    compileAndInjectCSS();
  }

  function resetAll() {
    state.overrides = {};
    renderComponents();
    renderFeatures();
    renderProperties();
    compileAndInjectCSS();
  }

  resetAllBtn.addEventListener("click", resetAll);

  function renderProperties() {
    propsEl.innerHTML = "";
    const comp = playerComponents[state.selectedComponent];
    if (!comp) {
      propsEl.textContent = "No component selected.";
      return;
    }
    const feat = comp.features[state.selectedFeature];
    if (!feat) {
      propsEl.textContent = "No feature selected.";
      return;
    }

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.padding = "0.25rem 0";
    const hleft = document.createElement("div");
    hleft.textContent = `${comp.name} — ${feat.name}`;
    hleft.style.fontFamily = "var(--font-code)";
    const hright = document.createElement("div");
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Feature";
    resetBtn.addEventListener("click", () =>
      resetFeature(state.selectedComponent, state.selectedFeature),
    );
    hright.appendChild(resetBtn);
    header.appendChild(hleft);
    header.appendChild(hright);
    propsEl.appendChild(header);

    const groups = {};
    (feat.props || []).forEach((p, idx) => {
      const g = p.group || "Other";
      if (!groups[g]) groups[g] = [];
      groups[g].push({ prop: p, idx });
    });

    Object.keys(groups).forEach((gname) => {
      const groupDiv = document.createElement("div");
      groupDiv.style.padding = "0.5rem 0";
      const title = document.createElement("div");
      title.textContent = gname;
      title.style.fontWeight = "600";
      title.style.marginBottom = "0.25rem";
      groupDiv.appendChild(title);

      groups[gname].forEach(({ prop, idx }) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.style.alignItems = "center";
        row.style.gap = "0.5rem";
        row.style.marginBottom = "0.25rem";

        const label = document.createElement("label");
        label.textContent = prop.label || prop.cssProp;
        label.style.flex = "1";

        const inputWrap = document.createElement("div");
        inputWrap.style.display = "flex";
        inputWrap.style.alignItems = "center";
        inputWrap.style.gap = "0.5rem";

        const inputDef = prop.input || {};
        let inputEl = null;

        if (inputDef.type === "range") {
          inputEl = document.createElement("input");
          inputEl.type = "range";
          if (inputDef.min != null) inputEl.min = inputDef.min;
          if (inputDef.max != null) inputEl.max = inputDef.max;
          if (inputDef.step != null) inputEl.step = inputDef.step;
          const current =
            getPropValue(state.selectedComponent, state.selectedFeature, idx) ??
            inputDef.default ??
            inputDef.min ??
            "";
          inputEl.value = current;
          const valLabel = document.createElement("span");
          valLabel.textContent = current + (prop.unit || "");
          inputEl.addEventListener("input", (e) => {
            valLabel.textContent = e.target.value + (prop.unit || "");
            setPropValue(
              state.selectedComponent,
              state.selectedFeature,
              idx,
              e.target.value,
            );
          });
          inputWrap.appendChild(inputEl);
          inputWrap.appendChild(valLabel);
        } else if (inputDef.type === "color") {
          // Create a color picker plus an optional hex text input so users
          // can either pick a color or type a hex code, including 8-char
          // hex with alpha (#RRGGBBAA) or shorthand (#rgb / #rgba).
          const colorInput = document.createElement("input");
          colorInput.type = "color";

          function expandShorthand(hex) {
            if (!hex || hex[0] !== "#") return hex;
            if (hex.length === 4) {
              return "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            }
            if (hex.length === 5) {
              return (
                "#" +
                hex[1] +
                hex[1] +
                hex[2] +
                hex[2] +
                hex[3] +
                hex[3] +
                hex[4] +
                hex[4]
              );
            }
            return hex;
          }

          function normalizeForColorInput(v) {
            if (!v) return "#000000";
            v = v.trim();
            if (!v.startsWith("#")) v = `#${v}`;
            const m =
              /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.exec(
                v,
              );
            if (!m) return "#000000";
            const hex = m[0];
            if (hex.length === 7) return hex;
            if (hex.length === 9) return hex.slice(0, 7);
            const expanded = expandShorthand(hex);
            return expanded.slice(0, 7);
          }

          const rawInitial =
            getPropValue(state.selectedComponent, state.selectedFeature, idx) ??
            inputDef.default ??
            "#000000";
          const initialForPicker = normalizeForColorInput(rawInitial);
          colorInput.value = initialForPicker;

          const textInput = document.createElement("input");
          textInput.type = "text";
          textInput.maxLength = 9; // allow leading # + 8 hex chars
          textInput.style.width = "92px";
          textInput.value = rawInitial;

          colorInput.addEventListener("input", (e) => {
            const v = e.target.value; // always #RRGGBB
            textInput.value = v;
            setPropValue(
              state.selectedComponent,
              state.selectedFeature,
              idx,
              v,
            );
          });

          textInput.addEventListener("input", (e) => {
            let v = e.target.value.trim();
            if (!v) return;
            if (!v.startsWith("#")) v = `#${v}`;
            if (
              /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(
                v,
              )
            ) {
              colorInput.value = normalizeForColorInput(v);
              setPropValue(
                state.selectedComponent,
                state.selectedFeature,
                idx,
                v,
              );
            }
          });

          inputWrap.appendChild(colorInput);
          inputWrap.appendChild(textInput);
        } else if (inputDef.type === "select") {
          inputEl = document.createElement("select");
          (inputDef.options || []).forEach((opt) => {
            const oEl = document.createElement("option");
            oEl.value = opt.value;
            oEl.textContent = opt.label;
            inputEl.appendChild(oEl);
          });
          inputEl.value =
            getPropValue(state.selectedComponent, state.selectedFeature, idx) ??
            inputDef.default ??
            (inputDef.options &&
              inputDef.options[0] &&
              inputDef.options[0].value) ??
            "";
          inputEl.addEventListener("change", (e) =>
            setPropValue(
              state.selectedComponent,
              state.selectedFeature,
              idx,
              e.target.value,
            ),
          );
          inputWrap.appendChild(inputEl);
        } else {
          inputEl = document.createElement("input");
          inputEl.type = "text";
          inputEl.value =
            getPropValue(state.selectedComponent, state.selectedFeature, idx) ??
            inputDef.default ??
            "";
          inputEl.addEventListener("input", (e) =>
            setPropValue(
              state.selectedComponent,
              state.selectedFeature,
              idx,
              e.target.value,
            ),
          );
          inputWrap.appendChild(inputEl);
        }

        row.appendChild(label);
        row.appendChild(inputWrap);
        groupDiv.appendChild(row);
      });

      propsEl.appendChild(groupDiv);
    });
  }

  function compileAndInjectCSS() {
    const bySelector = {};
    Object.keys(state.overrides).forEach((key) => {
      const [cIdxStr, fIdxStr] = key.split("_");
      const cIdx = Number(cIdxStr);
      const fIdx = Number(fIdxStr);
      const overrides = state.overrides[key];
      const feat = playerComponents[cIdx].features[fIdx];
      Object.keys(overrides).forEach((pIdxStr) => {
        const pIdx = Number(pIdxStr);
        const prop = feat.props[pIdx];
        if (!prop) return;
        const selector = prop.selector || "";
        if (!bySelector[selector]) bySelector[selector] = {};
        let value = overrides[pIdxStr];
        if (value === null || value === undefined || value === "") return;
        if (prop.unit && value !== "") value = value + prop.unit;
        const trimmed = String(value).trim();
        const hasImportant = /!important\s*$/i.test(trimmed);
        bySelector[selector][prop.cssProp] = hasImportant
          ? trimmed
          : `${trimmed} !important`;
      });
    });

    let cssText = "";
    Object.keys(bySelector).forEach((sel) => {
      if (!sel) return;
      cssText += `${sel} {\n`;
      const props = bySelector[sel];
      Object.keys(props).forEach((p) => {
        cssText += `  ${p}: ${props[p]};\n`;
      });
      cssText += `}\n\n`;
    });

    if (!cssText) cssText = "/* No custom styles */";
    cssPre.textContent = cssText;
    previewStyle.textContent = cssText;
  }

  // add copy + download controls to css output area
  const cssOutputContainer = document.getElementById("css-output");
  const controlsDiv = document.createElement("div");
  controlsDiv.style.display = "flex";
  controlsDiv.style.gap = "0.5rem";
  controlsDiv.style.padding = "0.25rem 0";
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy CSS";
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(cssPre.textContent)
      .catch(() => alert("Copy failed"));
  });
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download .css";
  downloadBtn.addEventListener("click", () => {
    const blob = new Blob([cssPre.textContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "player-custom.css";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
  controlsDiv.appendChild(copyBtn);
  controlsDiv.appendChild(downloadBtn);
  cssOutputContainer.insertBefore(controlsDiv, cssOutputContainer.firstChild);

  // initial render
  renderComponents();
  renderFeatures();
  renderProperties();
  compileAndInjectCSS();
});
