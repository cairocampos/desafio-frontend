import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { googleSdkLoaded } from "vue3-google-login";

type Token = {
  access_token: string;
  authuser: string;
  expires_in: string;
  prompt: string;
  scope: string;
  token_type: string;
}

export const useOAuth = defineStore('oauth', () => {
  const isLoggedIn = ref(false)
  const setToken = (data: Token) => {
    localStorage.setItem('@Rocketstream:token', JSON.stringify(data))
  }

  const parsedStorageToken = () => {
    const token = localStorage.getItem('@Rocketstream:token')
    if(token) {
      return JSON.parse(token)! as Token
    }
  }

  const getAccessToken = () => {
    const token = parsedStorageToken();
    return token?.access_token;
  }

  const googleLogin = () => {
    googleSdkLoaded((google) => {
      google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/youtube',
        callback: (response) => {
          setToken(response)
          isLoggedIn.value = true;
        }
      }).requestAccessToken();
    })
  }

  onMounted(() => {
    const token = parsedStorageToken();
    isLoggedIn.value = !!token?.access_token;
  })

  const googleLogout = () => {
    localStorage.removeItem('@Rocketstream:token')
    isLoggedIn.value = false;
    googleLogout();
  }

  const refreshToken = () => {
    localStorage.removeItem('@Rocketstream:token')
    isLoggedIn.value = false;
    googleLogin();
  }

  return {
    setToken,
    getAccessToken,
    isLoggedIn,
    googleLogin,
    googleLogout,
    refreshToken
  }
});