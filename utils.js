export function makeResizable(handle, cssVar, side) {
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

export function getElId(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`$: No element found with id "${id}"`);
  return el;
}

/// @func newElement(tag, className)
/// @desc Creates a new DOM element with the specified tag and optional class name.
/// @param {string} tag - The tag name of the element to create (e.g., 'div', 'span').
/// @param {string} [className] - An optional class name to assign to the element.
/// @returns {HTMLElement} The newly created DOM element.
export function newElement(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}