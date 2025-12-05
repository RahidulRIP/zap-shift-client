import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:9000",
});

const useAxiosSecure = () => {
  const { user, signUserOut } = useAuth();
  // console.log(user);
  useEffect(() => {
    // request
    const reqInterceptor = instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `bearer ${user?.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // response
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log(error?.response?.status);
        const errorStatus = error?.response?.status;
        if (errorStatus === 401 || errorStatus === 403) {
          signUserOut()
            .then(() => {
              // user logout success
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, signUserOut]);

  return instance;
};

export default useAxiosSecure;
