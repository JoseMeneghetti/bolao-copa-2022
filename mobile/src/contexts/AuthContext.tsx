import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithCredential,
  signOut as signOutFirebase,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";

import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

export interface AuthContextDataProps {
  user: UserT;
  signIn: () => Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as UserT);

  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    // responseType: "id_token",
    iosClientId: process.env.IOS_ID,
    androidClientId: process.env.ANDROID_ID,
    clientId: process.env.CLIEND_ID,
  });

  const signIn = async () => {
    try {
      setIsLoading(true);
      promptAsync();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (access_token: string) => {
    try {
      setIsLoading(true);

      const response = await api.post("/users", {
        access_token,
      });

      console.log(response);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      const userInfoResponse = await api.get("/me");

      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  // const signOut = async () => {
  //   try {
  //     setIsLoading(true);
  //     await signOutFirebase(auth);
  //   } catch (error) {
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      // console.log(response.params);
      signInWithGoogle(access_token);
    }
  }, [response]);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user: User) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       //redirect
  //       console.log("else");
  //     }
  //   });

  //   return () => unsub();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
