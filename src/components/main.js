/**
 * The main script file of the application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */

// Activate drag functions for windows
dragElement(document.getElementById('window-memory-game'))
dragElement(document.getElementById('window-message-app'))
/**
 * Open the window.
 *
 * @param {*} windowId - The id of the window.
 */
function openWindow (windowId) {
  const window = document.getElementById(windowId)
  if (window.style.display === 'none' || window.style.display === '') {
    // Show the window
    window.style.display = 'block'
    dragElement(window)
  } else {
    // Hide the window
    window.style.display = 'none'
  }
}
// Add event listeners for icons
document.getElementById('memory-game-icon').addEventListener('click', function () {
  openWindow('window-memory-game')
})
document.getElementById('message-app-icon').addEventListener('click', function () {
  openWindow('window-message-app')
})
/**
 * Drag the element.
 *
 * @param {HTMLElement} element - The element to drag.
 */
function dragElement (element) {
  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0

  // If present, the header is where you move the DIV from
  if (document.getElementById(element.id + '-header')) {
    document.getElementById(element.id + '-header').onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the DIV
    element.onmousedown = dragMouseDown
  }

  /**
   * Start the drag.
   *
   * @param {Event} e - The event.
   */
  function dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    // Get the mouse cursor position at startup
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // Call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  /**
   * Drag the element.
   *
   * @param {Event} e - The event.
   */
  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // Set the element's new position
    element.style.top = element.offsetTop - pos2 + 'px'
    element.style.left = element.offsetLeft - pos1 + 'px'
  }

  /**
   * Stop the drag.
   *
   */
  function closeDragElement () {
    // Stop moving when mouse button is released
    document.onmouseup = null
    document.onmousemove = null
  }
}
