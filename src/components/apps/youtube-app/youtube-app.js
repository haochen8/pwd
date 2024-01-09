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
     * Creates an instance of the youtube app web component.
     */
    constructor () {
      super()
      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      // Get the search input element in the shadow root.
      this.$searchInput = this.shadowRoot.querySelector('#searchInput')
      // Get the search button element in the shadow root.
      this.$searchButton = this.shadowRoot.querySelector('#searchButton')
      // Get the video player element in the shadow root.
      this.$videoPlayer = this.shadowRoot.querySelector('#videoPlayer')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.$searchButton.addEventListener('click', this._search.bind(this))
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.$searchButton.removeEventListener('click', this._search.bind(this))
    }
  })
