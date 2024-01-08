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
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    </style>
<div>
    <textarea id="messageInput"></textarea>
    <button id="sendButton">Send</button>
    <div id="messageContainer"></div>
</div>
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
    }

    /**
     *
     */
    connectWebSocket () {
      this.#socket = new WebSocket(SERVER_URL)
      this.#socket.addEventListener('open', () => {
        this.#socket.send(JSON.stringify({
          type: 'authenticate',
          data: API_KEY
        }))
      })
    }

    /**
     *
     */
    sendMessage () {
      this.#socket.addEventListener('message', event => {
        const message = JSON.parse(event.data)
        if (message.type === 'message') {
          const messageElement = document.createElement('div')
          messageElement.textContent = message.data
          this.#messageContainer.appendChild(messageElement)
        }
      })
    }

    /**
     *
     */
    displayMessage () {
      this.#sendButton.addEventListener('click', () => {
        this.#socket.send(JSON.stringify({
          type: 'message',
          data: this.#messageInput.value
        }))
        this.#messageInput.value = ''
      })
    }
  }
)
