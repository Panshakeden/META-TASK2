import { useEffect, useState } from "react";
import { getEnsContract } from "../constants/contracts";
import { getProvider, readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount,useWeb3ModalProvider } from "@web3modal/ethers/react";
import { decodeBytes32String, ethers } from "ethers";


const useGetUsers = () => {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();


const [users, setUsers] = useState({
  loading: true,
  data: [],
});
 

  useEffect(() => {
    (async function () {

      try {

  const provider = getProvider(walletProvider);
  const signer=await provider.getSigner()
  const contract = getEnsContract(signer);
    
  const result = await contract.getAllUsers();
  console.log(result,"============>>")

  const userList = result.map((user) => ({
    address: user.address,
    name:decodeBytes32String(user.name),
    url:user.image

  }))

  setUsers({
    loading: false,
    data: userList,
  });

      } catch (error) {
        console.error("error fetching proposals: ", err);
        setUsers((prev) => ({ ...prev, loading: false }))
      }
    })();
  }, [address]);

  return users;
};



export default useGetUsers;