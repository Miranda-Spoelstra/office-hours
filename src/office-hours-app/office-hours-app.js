import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-if.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "../analog-clock/analog-clock.js";
import "../digital-clock/digital-clock.js";

/**
 * @customElement
 * @polymer
 */
class OfficeHoursApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          /* standard styles */
          --font-family: Verdana, sans-serif;
          --time-text-color: #eee;
          --page-background: #eee;
          --time-background: url("./src/images/blue_bg.jpg");

          display: block;
          background: var(--page-background);
          background-repeat: no-repeat;
          background-size: cover;
          font-family: var(--font-family);
          font-size: 3.5vw;
          height: 100vh;
        }

        /* styling of the time section */
        #time_section {
          background: var(--time-background);
          background-repeat: no-repeat;
          background-size: cover;
          color: var(--time-text-color);
          height: 35vh;
          font-size: 4vw;
        }
        #time_box {
          width: 100%;
          text-align: center;
        }
        analog-clock {
          --clock-size: 25vh;
          margin-top: 5vh;
        }
        digital-clock {
          padding-top: 14vh;
          font-size: 10vw;
        }

        /* styling of the opening hours section */
        #opening_hours {
          margin: 5%;
          text-align: center;
        }
        h1 {
          font-size: 4.5vw;
        }
        table {
          width: 80%;
          margin: 0 auto;
          text-align: left;
        }
        td {
          padding: 1% 0;
        }
        #opening_hours tr > td:last-child {
          text-align: right;
        }

        /**********************
         * Theming of the clock
         **********************/
        .clock_theme_a {
          --hour-hand-color: yellow;
          /* --minutes-hand-color: #000; */
          /* --seconds-hand-color: red; */
          /* --clock-size: 400px; */
          --clock-background: lightblue;
        }
        .clock_theme_b {
          --hour-hand-color: orange;
          --minutes-hand-color: pink;
          /* --seconds-hand-color: red; */
          /* --clock-size: 400px; */
          --clock-background: black;
        }

        /*****************************
         * Theming of the time section
         *****************************/
        .time_section_theme_a {
          --time-background: darkred;
          --time-text-color: pink;
        }

        @keyframes fadeInOpacity {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .fade-in {
          opacity: 1;
          animation-name: fadeInOpacity;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 2s;
        }
        @keyframes fadeOutOpacity {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .fade-out {
          opacity: 1;
          animation-name: fadeOutOpacity;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 2s;
        }
      </style>

      <section id="time_section" class$="{{timeSectionTheme}}">
        <div id="time_box" class="fade-in">
          <template is="dom-if" if="{{analog}}">
            <analog-clock
              id="analog_clock"
              class$="{{analogClockTheme}}"
            ></analog-clock>
          </template>
          <template is="dom-if" if="{{!analog}}">
            <digital-clock></digital-clock>
          </template>
        </div>
      </section>

      <section id="opening_hours">
        <h1>Atom Rotterdam - Openingstijden</h1>
        <p>[[status]]</p>

        <!-- note: table outside the template doesn't work, a known polymer issue -->
        <dom-repeat items="[[openingHours]]" as="day">
          <template>
            <table>
              <tr>
                <td>[[day.name]]</td>
                <td>[[day.open]] - [[day.close]]</td>
              </tr>
            </table>
          </template>
        </dom-repeat>
      </section>
    `;
  }

  static get properties() {
    return {
      timeSectionTheme: {
        type: String,
        value: "",
      },
      analog: {
        type: Boolean,
        value: true,
      },
      analogClockTheme: {
        type: String,
        value: "",
      },
      status: {
        type: String,
        value: "",
      },
      openingHours: {
        type: Array,
        computed: "_fillOpeningHours()",
      },
    };
  }

  ready() {
    super.ready();
    this._switchInterval();
    this._checkStatus();
  }
  _switchInterval() {
    setInterval(this._switchClock.bind(this), 5000);
  }
  _switchClock() {
    // TODO: finish  animation

    // this.$.time_box.classList.remove('fade-in');
    // this.$.time_box.classList.add('fade-out');

    this.analog = !this.analog;
    this.$.time_box.classList.add("fade-in");

    // this.timeSectionTheme = "time_section_theme_a";
  }
  _checkStatus() {
    const open = parseInt(this.openingHours[0].open);
    const close = parseInt(this.openingHours[0].close);
    const day = this.openingHours[0].name;
    const now = new Date().getHours();
    // const now = 16;

    if (day === "Zaterdag" || day === "Zondag") {
      this.status = "Gesloten";
    } else if (now >= open - 1 && now < open) {
      this.status = "Bijna open";
    } else if (now >= close - 1 && now < close) {
      this.status = "Sluit bijna";
    } else if (now >= open && now < close) {
      this.status = "Open";
    } else {
      this.status = "Gesloten";
    }
  }
  _fillOpeningHours() {
    // TODO: get data

    // output as array
    return [
      { name: "Donderdag", open: "9:00", close: "17:00" },
      { name: "Vrijdag", open: "9:00", close: "17:00" },
      { name: "Zaterdag", open: "Gesloten", close: "" },
      { name: "Zondag", open: "Gesloten", close: "" },
      { name: "Maandag", open: "9:00", close: "17:00" },
      { name: "Dinsdag", open: "9:00", close: "17:00" },
      { name: "Woensdag", open: "9:00", close: "17:00" },
    ];
  }
}

window.customElements.define("office-hours-app", OfficeHoursApp);
