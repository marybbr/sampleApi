import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://smartparkingoffice.ir",
});

api.interceptors.request.use(
  (config) => {
    config.headers["api-key"] = "system";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(response.headers);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.alert("اکانت مورد نظر یافت نشد.");
    }
    return Promise.reject(error);
  }
);

function App() {
  const [response, setResponse] = useState<any>(null);

  const callSysAdminSignIn = async () => {
    try {
      const response = await api.post("systemAdmin/signIn", {
        phone: "09122700278",
        password: "1024",
      });
      setResponse({
        status: response.status,
        headers: response.headers,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <>
      <div className="card">
        <button onClick={callSysAdminSignIn}>
          click on this button to make api call
        </button>
      </div>
      <p className="read-the-docs">
        here you can see everything that is accessible from the response object
        :
      </p>
      <p>status : {response?.status}</p>
      <p>headers : {JSON.stringify(response?.headers)}</p>
    </>
  );
}

export default App;
