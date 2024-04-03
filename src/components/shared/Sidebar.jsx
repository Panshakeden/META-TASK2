import React from "react";
import useGetUsers from "../../hooks/useGetUsers";

export default function Sidebar() {
  const { loading, data } = useGetUsers();

  console.log(data);


  return (
    <div className="w-full max-w-[400px] flex-1 p-4 flex flex-col gap-2">
      <h1>Registered Users</h1>
      <div className="flex flex-col gap-1 overflow-y-auto">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          data.map((user, index) => (
            <div
              key={index}
              className="flex cursor-pointer p-3 items-center gap-4 bg-secondary/20 hover:bg-secondary/50 rounded-lg"
            >
              <img src={`https://gateway.pinata.cloud/ipfs/${user.url}`} alt="" className="w-10 h-10 rounded-full" />
              {/* <div className="rounded-full w-10 h-10 bg-secondary"></div> */}
              <h1>{user.name}</h1>
              <p>{user.address}</p>
              {/* <p>{`https://gateway.pinata.cloud/ipfs/${user.Url}`}</p> */}

            </div>
          ))
        )}
      </div>
    </div>
  );
}





