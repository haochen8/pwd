/**
 * The youtube app application.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.0.0
 */

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
</style>
<div id="searchContainer">
    <input id="searchInput" type="text" placeholder="Search...">
    <button id="searchButton">Search</button>
</div>
<iFrame id="videoPlayer" width="560" height="315" src="https://www.youtube.com/embed/5qap5aO4i9A" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iFrame>
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
     * The element representing the api key.
     *
     * @type {string}
     */
    #apiKey
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
      this.#apiKey = 'AIzaSyA_UPH3uAA5MZpvhJOdoOCeTYWB5-5dPrE'
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#searchButton.addEventListener('click', event => {
        this.searchVideo()
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#searchButton.removeEventListener('click', event => {
        this.searchVideo()
      })
    }

    /**
     * Search for videos.
     */
    searchVideo () {
      const searchQuery = this.#searchInput.value
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&key=${this.#apiKey}`

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.items.length === 0) {
            const firstResult = data.items[0]
            this.updateVideoPlayer(firstResult.id.videoId)
          } else {
            console.log('No video found')
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  })
