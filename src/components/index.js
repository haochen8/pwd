/**
 * The main script file of the application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */

document.getElementById('memory-game-icon').addEventListener('click', function () {
  console.log('Memory game icon clicked')
  createNewWindow('Memory Game', 'components/apps/images/memory-game.png')
})
document.getElementById('message-app-icon').addEventListener('click', function () {
  createNewWindow('Message App', 'components/apps/images/message-app.png')
})
/**
 * Drag the element.
 *
 * @param {HTMLElement} element - The element to drag.
 */
function dragElement (element) {
  // Set 4 positions
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
    // The final position of the window
    lastPosition.x = element.offsetLeft
    lastPosition.y = element.offsetTop
    // Stop moving when mouse button is released
    document.onmouseup = null
    document.onmousemove = null
  }
}

const defaultPosition = {
  x: 500,
  y: 150
}
const newPositionOffset = {
  x: 20,
  y: 20
}
let lastPosition = { ...defaultPosition }

let highestZIndex = 100
const openedWindows = {}
const windowWidth = 300
const windowHeight = 200
const desktopWidth = 1000
const desktopHeight = 600
/**
 * The counter for windows.
 *
 * @param {string} appTitle - The title of the app.
 * @param {string} appLogo - The logo of the app.
 */
function createNewWindow (appTitle, appLogo) {
  // Window
  const newWindow = document.createElement('div')
  newWindow.className = 'window'
  newWindow.isMaximized = false
  newWindow.defaultSize = { width: windowWidth, height: windowHeight }
  // Mark this app as open
  openedWindows[appTitle] = newWindow

  let newX = lastPosition.x + newPositionOffset.x
  let newY = lastPosition.y + newPositionOffset.y

  // Check if the new position is offscreen and reset if necessary
  if (newX + windowWidth > desktopWidth || newY + windowHeight > desktopHeight) {
    newX = defaultPosition.x
    newY = defaultPosition.y
  }

  newWindow.style.top = `${newY}px`
  newWindow.style.left = `${newX}px`

  // Update last position for next window
  lastPosition = { x: newX, y: newY }

  // Title bar
  const titleBar = document.createElement('div')
  titleBar.className = 'title-bar'

  // Window controls
  const windowControls = document.createElement('div')
  windowControls.className = 'window-controls'
  // Minimize button
  const minimizeButton = document.createElement('button')
  minimizeButton.className = 'Minimize'
  minimizeButton.textContent = '-'
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
   * Maximize the window and restore it.
   */
  maximizeButton.onclick = function () {
    // Restore the window
    if (newWindow.isMaximized) {
      newWindow.style.width = '500px'
      newWindow.style.height = '300px'
      newWindow.isMaximized = false
    } else {
      // Maximize withing the desktop
      newWindow.style.width = document.getElementById('desktop').offsetWidth + 'px'
      newWindow.style.height = document.getElementById('desktop').offsetHeight + 'px'
      newWindow.style.top = '0px'
      newWindow.style.left = '0px'
      newWindow.isMaximized = true
    }
  }

  // Close button
  const closeButton = document.createElement('button')
  closeButton.className = 'Close'
  closeButton.textContent = 'x'
  /**
   * Close the window.
   */
  closeButton.onclick = function () {
    delete openedWindows[appTitle]
    newWindow.remove()
  }

  // Append elements to window controls
  windowControls.appendChild(closeButton)
  windowControls.appendChild(minimizeButton)
  windowControls.appendChild(maximizeButton)

  // App Logo
  const logoImage = document.createElement('img')
  logoImage.src = appLogo
  logoImage.className = 'app-logo'
  logoImage.alt = appTitle

  // Append elements to title bar
  titleBar.appendChild(windowControls)
  titleBar.appendChild(logoImage)
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
