/**
 * The main script file of the application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */
// Import the web components.
import './apps/memory-game/memory-game.js'
import './apps/message-app/message-app.js'
import './apps/youtube-app/youtube-app.js'

// Event listener for the icons on the desktop.
document.getElementById('memory-game-icon').addEventListener('click', function () {
  memoryGameContent()
})
document.getElementById('message-app-icon').addEventListener('click', function () {
  messageAppContent()
})
document.getElementById('youtube-app-icon').addEventListener('click', function () {
  youtubeAppContent()
})
/**
 * Youtube app content.
 */
function youtubeAppContent () {
  // Set the width and height of the youtube app
  const youtubeAppWidth = 560
  const youtubeAppHeight = 400
  // Create a new window
  const youtubeAppWindow = createNewWindow('Youtube App', '/components/apps/images/youtube-app.png', null, youtubeAppWidth, youtubeAppHeight)
  const youtubeApp = document.createElement('my-youtube-app')
  youtubeAppWindow.appendChild(youtubeApp)
  youtubeApp.style.width = '100%'
  youtubeApp.style.height = 'calc(100% - 40px)'
}
/**
 * Memory game content.
 *
 */
function memoryGameContent () {
  // Set the width and height of the memory game
  const memoryGameWidth = 280
  const memoryGameHeight = 450
  // Create a new window
  const memoryGameWindow = createNewWindow('Memory Game', '/components/apps/images/memory-game.png', null, memoryGameWidth, memoryGameHeight)
  const memoryGame = document.createElement('my-memory-game')
  memoryGameWindow.appendChild(memoryGame)
  memoryGame.style.width = '100%'
  memoryGame.style.height = 'calc(100% - 40px)'
}
/**
 * Message app content.
 */
function messageAppContent () {
  // Set the width and height of the message app
  const messageAppWidth = 400
  const messageAppHeight = 500
  // Create a new window
  const messageAppWindow = createNewWindow('Message App', 'components/apps/images/message-app.png', null, messageAppWidth, messageAppHeight)
  const messageApp = document.createElement('my-message-app')
  messageAppWindow.appendChild(messageApp)
  messageApp.style.width = '100%'
  messageApp.style.height = 'calc(100% - 40px)'
}
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
// The default position of the window
const defaultPosition = {
  x: 550,
  y: 50
}
// The offset of the new window
const newPositionOffset = {
  x: 20,
  y: 20
}
// The last position of the window
let lastPosition = { ...defaultPosition }
// The highest z-index of the window
let highestZIndex = 100
// The opened windows
const openedWindows = {}
// The width and height of the window
const windowWidth = 300
const windowHeight = 200
const desktopWidth = 1000
const desktopHeight = 600
/**
 * The counter for windows.
 *
 * @param {string} appTitle - The title of the app.
 * @param {string} appLogo - The logo of the app.
 * @param {HTMLElement} content - The content of the app.
 * @param {number} width - The width of the window.
 * @param {number} height - The height of the window.
 * @returns {HTMLElement} - The new window.
 */
function createNewWindow (appTitle, appLogo, content, width = windowWidth, height = windowHeight) {
  // New window
  const newWindow = document.createElement('div')
  newWindow.className = 'window'
  newWindow.style.width = `${width}px`
  newWindow.style.height = `${height}px`
  // Store the original size of the window
  newWindow.originalSize = { width: windowWidth, height: windowHeight }
  // Store the original position of the window
  newWindow.originalPosition = { top: '...', left: '...' }
  // Mark this app as open
  openedWindows[appTitle] = newWindow
  // Set the default position of the window
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
    // Desktop size
    const desktop = document.getElementById('desktop')
    const desktopWidth = desktop.offsetWidth
    const desktopHeight = desktop.offsetHeight

    if (!newWindow.isMaximized) {
      // Store the original size and position if not already maximized
      newWindow.originalSize = { width: newWindow.clientWidth, height: newWindow.clientHeight }
      newWindow.originalPosition = { x: newWindow.offsetLeft, y: newWindow.offsetTop }

      // Maximize the window
      newWindow.style.width = `${desktopWidth}px`
      newWindow.style.height = `${desktopHeight}px`
      newWindow.style.top = '0'
      newWindow.style.left = '0'
      newWindow.isMaximized = true
    } else {
      // Restore the window to its original size and position
      newWindow.style.width = `${newWindow.originalSize.width}px`
      newWindow.style.height = `${newWindow.originalSize.height}px`
      newWindow.style.top = `${newWindow.originalPosition.y}px`
      newWindow.style.left = `${newWindow.originalPosition.x}px`
      newWindow.isMaximized = false
    }

    // Content size
    if (content) {
      if (newWindow.isMaximized) {
        content.style.width = '100%'
        content.style.height = '100%'
      } else {
        content.style.width = `${newWindow.originalSize.width}px`
        content.style.height = `calc(${newWindow.originalSize.height}px - 40px)`
      }
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
  // Append window to desktop
  document.getElementById('desktop').appendChild(newWindow)
  // Make the window draggable
  dragElement(newWindow)
  // Bring window to front
  bringToFront(newWindow)
  // Resize handles
  const resizeHandleSE = document.createElement('div')
  resizeHandleSE.className = 'resize-handle resize-handle-se'
  const resizeHandleSW = document.createElement('div')
  resizeHandleSW.className = 'resize-handle resize-handle-sw'
  // Append resize handles to window
  newWindow.appendChild(resizeHandleSW)
  newWindow.appendChild(resizeHandleSE)
  // Initialize window resizing
  initResize(newWindow, resizeHandleSE, 'se', content)
  initResize(newWindow, resizeHandleSW, 'sw', content)

  /**
   * Resize the content area.
   *
   * @param {number} width - The width of the content area.
   * @param {number} height - The height of the content area.
   */
  if (content) {
    newWindow.appendChild(content)
  }
  return newWindow
}
/**
 * Initialize window resizing.
 *
 * @param {*} window - The window to resize.
 * @param {*} handle - The handle to resize.
 * @param {*} direction - The direction to resize.
 */
function initResize (window, handle, direction) {
  handle.addEventListener('mousedown', function (e) {
    // Prevent firing of default dragging
    e.stopPropagation()
    e.preventDefault()
    // Get the current mouse position and window size
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = window.offsetWidth
    const startHeight = window.offsetHeight
    const startLeft = window.offsetLeft

    /**
     * Resize the window.
     *
     * @param {Event} e - The event.
     */
    function resizeWindow (e) {
      if (direction === 'se') {
        // Southeast resizer
        const newWidth = Math.max(startWidth + e.clientX - startX, 200)
        const newHeight = Math.max(startHeight + e.clientY - startY, 200)
        window.style.width = newWidth + 'px'
        window.style.height = newHeight + 'px'
      } else if (direction === 'sw') {
        // Southwest resizer
        const widthChange = startX - e.clientX
        const newWidth = Math.max(startWidth + widthChange, 200)
        const heightChange = e.clientY - startY
        const newHeight = Math.max(startHeight + heightChange, 200)
        // Adjust the width
        if (newWidth > 200) {
          window.style.width = newWidth + 'px'
          window.style.left = (startLeft - widthChange) + 'px'
        }
        if (newHeight > 200) {
          window.style.height = newHeight + 'px'
        }
      }
    }
    /**
     * Stop resizing the window.
     */
    function stopResize () {
      document.removeEventListener('mousemove', resizeWindow)
      document.removeEventListener('mouseup', stopResize)
    }
    // Add event listeners
    document.addEventListener('mousemove', resizeWindow)
    document.addEventListener('mouseup', stopResize)
  })
}

/**
 * Bring window to front.
 *
 * @param {*} windowElement - The element to bring to front.
 */
function bringToFront (windowElement) {
  // Bring window to front
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
