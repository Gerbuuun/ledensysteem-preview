import useAlertStore from "~/stores/useAlertStore";
import {FetchOptions} from "ohmyfetch";


export const useHttpClient = () => {
  return {
    async apiRequest<T>(url: string, config?: FetchOptions): Promise<T> {
      try {
        const data = await $fetch<T>(url, config);
        return data as T;
      } catch (error) {
        if (error.response) {
          if (typeof error.response.data.message === 'string') {
            useAlertStore().createErrorAlert(error.response.data.message);
          } else {
            error.response.data.message.forEach(m => {
              useAlertStore().createErrorAlert(m);
            });
          }
        }
      }
    },
  }
}