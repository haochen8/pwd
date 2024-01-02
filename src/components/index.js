/**
 * The main script file of the application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */

document.getElementById('memory-game-icon').addEventListener('click', function () {
  console.log('Memory game icon clicked')
  createNewWindow('Memory Game')
})
document.getElementById('message-app-icon').addEventListener('click', function () {
  createNewWindow('Message App')
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

let windowCounter = 0
let highestZIndex = 100

/**
 * The counter for windows.
 *
 * @param {string} appContent - The content of the app.
 */
function createNewWindow (appContent) {
  windowCounter++
  const newWindow = document.createElement('div')
  newWindow.id = `window-${windowCounter}`
  newWindow.className = 'window'
  newWindow.style.zIndex = highestZIndex++
  newWindow.style.display = 'block'

  // Set size and position
  newWindow.style.top = `${windowCounter * 30}px`
  newWindow.style.left = `${windowCounter * 30}px`

  // Title bar
  const titleBar = document.createElement('div')
  titleBar.className = 'title-bar'
  titleBar.textContent = `App ${windowCounter}`

  // Minimize button
  const minimizeButton = document.createElement('button')
  minimizeButton.className = 'Minimize'
  minimizeButton.textContent = '_'
  /**
   * Minimize the window.
   */
  minimizeButton.onclick = function () {
    newWindow.style.display = 'none'
  }

  // Maximize button
  const maximizeButton = document.createElement('button')
  maximizeButton.className = 'Maximize'
  maximizeButton.textContent = '□'
  /**
   * Maximize the window.
   */
  maximizeButton.onclick = function () {
    if (newWindow.style.width === '100%') {
      newWindow.style.width = '50%'
      newWindow.style.height = '50%'
      newWindow.style.top = '25%'
      newWindow.style.left = '25%'
    } else {
      newWindow.style.width = '100%'
      newWindow.style.height = '100%'
      newWindow.style.top = '0'
      newWindow.style.left = '0'
    }
  }

  // Close button
  const closeButton = document.createElement('button')
  closeButton.className = 'Close'
  /**
   * Close the window.
   */
  closeButton.onclick = function () {
    newWindow.remove()
  }

  titleBar.appendChild(closeButton)
  titleBar.appendChild(minimizeButton)
  titleBar.appendChild(maximizeButton)

  newWindow.appendChild(titleBar)

  document.getElementById('desktop').appendChild(newWindow)
  // Make the window draggable
  dragElement(newWindow)
  // Bring window to front
  bringToFront(newWindow)
}

/**
 * Bring window to front.
 *
 * @param {*} windowElement - The element to bring to front.
 */
function bringToFront (windowElement) {
  highestZIndex++
  windowElement.style.zIndex = highestZIndex
}

// Call bringToFront when a window is clicked to focus it
document.addEventListener('click', function (event) {
  if (event.target.closest('.window')) {
    bringToFront(event.target.closest('.window'))
  }
})

/**
 * Update window focus.
 *
 * @param {HTMLElement} windowElement - The element to make draggable.
 */
function updateFocus (windowElement) {
  highestZIndex++
  // Raise z-index for focused window
  windowElement.style.zIndex = highestZIndex
}
// Add event listener to manage window focus
document.addEventListener('click', function (event) {
  const windowElement = event.target.closest('.window')
  if (windowElement) {
    updateFocus(windowElement)
  }
})
