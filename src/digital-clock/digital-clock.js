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
        #time_digital {
          margin: 0;
        }
      </style>

      <p id="time_digital"></p>
    `;
  }
  static get properties() {
    return {};
  }

  ready() {
    super.ready();
    this._currentTime();
  }

  _currentTime() {
    const now = new Date();
    const hoursNow = this._formatTime(now.getHours());
    const minutesNow = this._formatTime(now.getMinutes());
    const secondsNow = this._formatTime(now.getSeconds());

    this.$.time_digital.innerHTML = `${hoursNow}:${minutesNow}:${secondsNow}`;
    setTimeout(this._currentTime.bind(this), 1000);
  }

  // add a 0 before the number if less than 10
  _formatTime(n) {
    return (n < 10) ? `0${n}` : n;
  }
}

window.customElements.define("digital-clock", DigitalClock);
