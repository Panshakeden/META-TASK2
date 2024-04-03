import Form from "../components/shared/Form";
import Sidebar from "../components/shared/Sidebar";
import { configureWeb3Modal } from "../connection";
import useIsRegistered from "../hooks/useIsRegistered";
import { useEffect, useState } from "react";

configureWeb3Modal();

export default function App() {
  const [username, setUsername] = useState("");
  const status = useIsRegistered();
  const [isAuthenticated,setIsAuthenticated] = useState(status);

useEffect(() => {
  setIsAuthenticated(status)
},[status])

  return (
    <div className="flex-1 flex flex-col h-screen p-6">
      <div className="w-full h-full max-w-[1440px] overflow-y-auto bg-secondary/30 mx-auto rounded-md flex">
        {isAuthenticated ? (
          <>
            <Sidebar />
          </>
        ) : (
          <Form username={username}
            setUsername={setUsername}
            callback={(_value) => {
setIsAuthenticated(_value)
            }}
          />
        )}
      </div>
    </div>
  );
}
