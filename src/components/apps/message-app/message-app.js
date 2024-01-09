/**
 * The message app application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */

const SERVER_URL = 'wss://courselab.lnu.se/message-app/socket'
const API_KEY = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        background-color: #f0f0f0;
    }
    #messageContainer {
        flex-grow: 1;
        overflow-y: auto;
        padding: 10px;
        background-color: white;
        border-bottom: 1px solid #ccc;
    }
    #messageContainer div {
        margin-bottom: 5px;
        padding: 8px;
        background-color: #e7e7e7;
        border-radius: 5px;
    }
    #sendContainer {
        display: flex;
        padding: 10px;
    }
    #messageInput {
        flex-grow: 1;
        padding: 8px;
        margin-right: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    #sendButton {
        padding: 10px 15px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    #sendButton:hover {
        background-color: #45a049;
    }
    </style>
<div id="messageContainer"></div>
<form id="sendContainer">
    <input id="messageInput" type="text" placeholder="Type your message here..." />
    <button id="sendButton" type="submit">Send</button>
</form>
`
customElements.define('my-message-app',
/**
 *
 */
  class extends HTMLElement {
    /**
     * The message input element.
     *
     * @type {HTMLDivElement}
     */
    #messageInput
    /**
     * The message input element.
     *
     * @type {HTMLButtonElement}
     */
    #sendButton
    /**
     * The message container element.
     *
     * @type {HTMLDivElement}
     */
    #messageContainer
    /**
     * The socket element.
     *
     * @type {WebSocket}
     */
    #socket
    /**
     * The username.
     *
     * @type {string}
     */
    #username
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      // Get the message input element in the shadow root.
      this.#messageInput = this.shadowRoot.querySelector('#messageInput')
      // Get the send button element in the shadow root.
      this.#sendButton = this.shadowRoot.querySelector('#sendButton')
      // Get the message container element in the shadow root.
      this.#messageContainer = this.shadowRoot.querySelector('#messageContainer')
      // Get the socket element in the shadow root.
      this.#socket = null
      this.connectWebSocket()
      // Get the username.
      this.#username = this.getUsername()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#sendButton.addEventListener('click', event => {
        event.preventDefault()
        this.sendMessage(this.#messageInput.value)
        this.#messageInput.value = ''
      })
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
    }

    /**
     * Gets the username.
     *
     * @returns {string} The username.
     */
    getUsername () {
      let username = localStorage.getItem('username')
      if (!username) {
        username = prompt('Please enter your username')
        localStorage.setItem('username', username)
      }
      return username
    }

    /**
     * Connection to the server.
     */
    connectWebSocket () {
      this.#socket = new WebSocket(SERVER_URL)

      /**
       * The connection is opened and ready to communicate.
       *
       * @param {Event} event - The event.
       */
      this.#socket.onmessage = event => {
        const messageData = JSON.parse(event.data)

        if (messageData.type && messageData.data && messageData.username) {
          this.displayMessage(messageData)
        }
      }
      /**
       * Error handling.
       *
       * @param {Event} event - The event.
       */
      this.#socket.onerror = event => {
        console.error(event)
      }
      /**
       * The connection is closed.
       *
       * @param {Event} event - The event.
       */
      this.#socket.onclose = event => {
        console.log('The connection is closed')
      }
    }

    /**
     * Send the message.
     *
     * @param {string} message - The message.
     */
    sendMessage (message) {
      if (this.#socket.readyState !== WebSocket.OPEN) {
        const payLoad = {
          type: 'message',
          data: message,
          username: this.#username,
          channel: 'my, not so secret, channel',
          key: API_KEY
        }
        this.#socket.send(JSON.stringify(payLoad))
      } else {
        console.error('The connection is not open.')
      }
    }

    /**
     * Display the message.
     */
    displayMessage () {
      const messageElement = document.createElement('div')
      messageElement.textContent = `${this.messageData.username}: ${this.messageData.data}`
      this.#messageContainer.appendChild(messageElement)

      // Keep only the lastest 20 messages.
      while (this.#messageContainer.children.length > 20) {
        this.#messageContainer.removeChild(this.#messageContainer.firstChild)
      }
    }
  }
)
