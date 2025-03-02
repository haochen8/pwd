/**
 * The youtube app application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */
// Youtube API key.
const API_KEY = 'AIzaSyA_UPH3uAA5MZpvhJOdoOCeTYWB5-5dPrE'
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
        overflow: hidden;
        background-color: #f0f0f0;
    }
    #searchInput {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px 10px;
    margin-right: 8px;
    width: calc(100% - 100px);
    box-sizing: border-box;
    }
    #searchButton {
        background-color: #ff0000;
        border: none;
        border-radius: 4px;
        color: white;
        padding: 8px 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    #searchButton:hover {
        background-color: #e50000;
    }
</style>
<div id="searchContainer">
    <input id="searchInput" type="text" placeholder="Search...">
    <button id="searchButton">Search</button>
</div>
<iframe id="videoPlayer" width="560" height="315" src="https://www.youtube.com/embed/gNcMvPCyHC0" frameborder="0" allowfullscreen></iframe>
`
customElements.define('my-youtube-app',

  /**
   * Represents a youtube app web component.
   */
  class extends HTMLElement {
    /**
     * The element representing the search input.
     *
     * @type {HTMLInputElement}
     */
    #searchInput
    /**
     * The element representing the search button.
     *
     * @type {HTMLButtonElement}
     */
    #searchButton
    /**
     * The element representing the video player.
     *
     * @type {HTMLIFrameElement}
     */
    #videoPlayer
    /**
     * Creates an instance of the youtube app web component.
     */
    constructor () {
      super()
      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      // Get the search input element in the shadow root.
      this.#searchInput = this.shadowRoot.querySelector('#searchInput')
      // Get the search button element in the shadow root.
      this.#searchButton = this.shadowRoot.querySelector('#searchButton')
      // Get the video player element in the shadow root.
      this.#videoPlayer = this.shadowRoot.querySelector('#videoPlayer')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listeners.
      this.#searchButton.addEventListener('click', this.searchVideoClick.bind(this))
      this.#searchInput.addEventListener('focus', (event) => {
      })
      this.#searchInput.addEventListener('click', (event) => {
        this.#searchInput.focus()
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // Remove event listeners.
      this.#searchButton.removeEventListener('click', this.searchVideoClick.bind(this))
    }

    /**
     * The click event handler for the search button.
     *
     * @param {Event} event - The click event.
     */
    searchVideoClick (event) {
      // Prevent the default action of the event.
      event.preventDefault()
      this.searchVideo()
    }

    /**
     * Search for videos.
     */
    searchVideo () {
      // Get the search query.
      const searchQuery = this.#searchInput.value
      if (!searchQuery.trim()) {
        console.error('No search query')
        return
      }
      // The URL for the API.
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`
      // Fetch the data.
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Check if any videos were found.
          if (data.items.length > 0) {
            const firstResult = data.items[0]
            this.updateVideoPlayer(firstResult.id.videoId)
          } else {
            console.error('No videos found')
          }
        })
        .catch(error => {
          console.error('Error fetching videos', error)
        })
    }

    /**
     * Update the video player.
     *
     * @param {string} videoId - The id of the video.
     */
    updateVideoPlayer (videoId) {
      // Update the video player.
      const videoUrl = `https://www.youtube.com/embed/${videoId}`
      this.#videoPlayer.src = videoUrl
    }
  })
