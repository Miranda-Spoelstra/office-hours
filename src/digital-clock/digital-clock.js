import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

/**
 * @customElement
 * @polymer
 */
class DigitalClock extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #time_display {
          margin: 0;
        }
      </style>

      <p id="time_display"></p>
    `;
  }
  static get properties() {
    return {};
  }

  // function called when element is first attached to the document
  ready() {
    super.ready();
    this._currentTime();
  }

  // get the current time
  _currentTime() {
    const now = new Date();
    const hoursNow = this._formatTime(now.getHours());
    const minutesNow = this._formatTime(now.getMinutes());
    const secondsNow = this._formatTime(now.getSeconds());

    this.$.time_display.innerHTML = `${hoursNow}:${minutesNow}:${secondsNow}`;
    setTimeout(this._currentTime.bind(this), 1000);
  }

  // format number to always be at least 2 numbers
  _formatTime(n) {
    return n < 10 ? `0${n}` : n;
  }
}

window.customElements.define("digital-clock", DigitalClock);
