import useAlertStore from "~/stores/useAlertStore";
import {FetchOptions} from "ohmyfetch";
import {useRuntimeConfig} from "#app";

export const useHttpClient = () => {
  return {
    async apiRequest<T>(url: string, config?: FetchOptions): Promise<T> {
      try {
        const data = await $fetch<T>(useRuntimeConfig().public.PE_API_URL + url, config);
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