import {defineStore} from "pinia";

interface Alert {
  text: string;
  type: AlertType;
}

const enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

interface AlertState {
  entities: Alert[];
}

export default defineStore('alerts', {
  state: (): AlertState => ({
    entities: [],
  }),

  getters: {
    all: (state): Alert[] => state.entities,
  },

  actions: {
    createSuccessAlert(message: string) {
      this.entities.push({ text: message, type: AlertType.success });
      setTimeout(() => this.entities.shift(),10000);
    },

    createInfoAlert(message: string) {
      this.entities.push({ text: message, type: AlertType.info });
      setTimeout(() => this.entities.shift(),10000);
    },

    createWarningAlert(message: string) {
      this.entities.push({ text: message, type: AlertType.warning });
      setTimeout(() => this.entities.shift(),10000);
    },

    createErrorAlert(message: string) {
      this.entities.push({ text: message, type: AlertType.error });
      setTimeout(() => this.entities.shift(),10000);
    },
  },
})