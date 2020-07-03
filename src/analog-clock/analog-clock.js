import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

/**
 * @customElement
 * @polymer
 */
class AnalogClock extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          /* variables to customize the clock */
          --hour-hand-color: #000;
          --minutes-hand-color: #000;
          --seconds-hand-color: red;
          --clock-background: url("./src/images/clock1.png");
          --clock-size: 400px;

          display: inline-block;
          border-radius: 50%;
          background: var(--clock-background);
          background-size: cover;
          height: var(--clock-size);
          width: var(--clock-size);
          position: relative;
        }

        #hours_box,
        #minutes_box,
        #seconds_box {
          /* Stacks all containers on top of the clock and each other */
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        /* initial position at 12 o'clock */
        #hours {
          background: var(--hour-hand-color);
          height: 20%;
          width: 2.5%;
          position: absolute;
          left: 48.75%;
          top: 30%;
          transform-origin: 50% 100%;
        }
        #minutes {
          background: var(--minutes-hand-color);
          height: 40%;
          width: 2%;
          position: absolute;
          left: 49%;
          top: 10%;
          transform-origin: 50% 100%;
        }
        #seconds {
          background: var(--seconds-hand-color);
          height: 45%;
          width: 1%;
          position: absolute;
          left: 49.5%;
          top: 14%;
          transform-origin: 50% 80%;
        }

        /* The animation to make the hands turn */
        @keyframes rotate {
          100% {
            transform: rotateZ(360deg);
          }
        }
        #hours_box {
          animation: rotate 43200s infinite linear;
        }
        #minutes_box {
          animation: rotate 3600s infinite steps(60);
        }
        #seconds_box {
          animation: rotate 60s infinite steps(60);
        }
      </style>

      <div id="hours_box">
        <div id="hours"></div>
      </div>
      <div id="minutes_box">
        <div id="minutes"></div>
      </div>
      <div id="seconds_box">
        <div id="seconds"></div>
      </div>
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
    const hoursNow = now.getHours();
    const minutesNow = now.getMinutes();
    const secondsNow = now.getSeconds();

    this.$.hours.style.transform = "rotateZ(" + hoursNow * 30 + "deg)";
    this.$.minutes.style.transform = "rotateZ(" + minutesNow * 6 + "deg)";
    this.$.seconds.style.transform = "rotateZ(" + secondsNow * 6 + "deg)";
  }
}

window.customElements.define("analog-clock", AnalogClock);
