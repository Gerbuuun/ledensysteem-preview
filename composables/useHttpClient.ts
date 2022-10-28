import axios, {AxiosRequestConfig} from "axios";
import useAlertStore from "~/stores/useAlertStore";

const createClient = () =>
  axios.create({
    baseURL: useRuntimeConfig().PE_API_URL,
    timeout: 5000,
    responseType: 'json',
  });


export const useHttpClient = () => {
  const request = createClient();

  return {
    async apiRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const { data } = await request(url, config);
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