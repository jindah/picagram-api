import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Creating a context to hold the current user data and
// custom hooks for easily accessing the current user and setting the current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

// This context is used to manage and share the current
// user's data across various components in the application.
export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory()

    // Function to fetch the user data on component mount
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        // console.log(err);
      }
    };
  
    // Effect to fetch user data on component mount
    useEffect(() => {
      handleMount();
    }, []);

    // Memoized block to set up Axios interceptors for token refreshing
    useMemo(() => {
      axiosReq.interceptors.request.use(
        async (config) => {
          if (shouldRefreshToken()){
            try {
              await axios.post("/dj-rest-auth/token/refresh/");
            } catch (err) {
              setCurrentUser((prevCurrentUser) => {
                if (prevCurrentUser) {
                  history.push("/signin");
                }
                return null;
              });
              removeTokenTimestamp();
              return config;
            }
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );
  
      axiosRes.interceptors.response.use(
        (response) => response,
        async (err) => {
          if (err.response?.status === 401) {
            try {
              await axios.post("/dj-rest-auth/token/refresh/");
            } catch (err) {
              setCurrentUser((prevCurrentUser) => {
                if (prevCurrentUser) {
                  history.push("/signin");
                }
                return null;
              });
              removeTokenTimestamp();
            }
            return axios(err.config);
          }
          return Promise.reject(err);
        }
      );
    }, [history]);

    return (
    <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
            {children}
        </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
    )
}