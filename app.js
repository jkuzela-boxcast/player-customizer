import playerComponents from "./player-components.js";
import { makeResizable, getElId, newElement } from "./utils.js";

makeResizable(getElId("handle-left-sidebar"), "--left-sidebar-width", "left");
makeResizable(getElId("handle-right-sidebar"), "--right-sidebar-width", "right");
makeResizable(getElId("handle-component-section"), "--component-section-height", "bottom");
makeResizable(getElId("handle-property-section"), "--property-section-height", "bottom");

document.addEventListener("DOMContentLoaded", () => {
  const compsEl = getElId("list-player-components");
  const featuresEl = getElId("list-component-features");
  const propsEl = getElId("list-feature-properties");
  const cssPre = getElId("css-output-pre");
  const previewStyle = getElId("player-preview-css");
  const resetAllBtn = getElId("button-reset-all");

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
      
      const item = newElement("div", "component-item");
      const left = newElement("div", "component-item-left");
      const text = newElement("div", "component-text");
      const right = newElement("div");
      const title = newElement("p");
      const desc = newElement("p");
      const dot = newElement("span", "changed-dot");

      title.textContent = comp.name;
      desc.textContent = comp.description || "";

      if (comp.icon) {
        const icon = document.createElement("span");
        icon.className = `material-symbols-${comp.icon.class}`;
        icon.textContent = comp.icon.name;
        left.appendChild(icon);
      }
      text.appendChild(title);
      text.appendChild(desc);

      dot.style.display = hasComponentChanges(cIdx) ? "block" : "none";

      left.appendChild(text);
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
