import { useEffect, useState } from "react";
import { getEnsContract } from "../constants/contracts";
import { getProvider, readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

const useIsRegistered = () => {
  const [reg, setReg] = useState(false);
  const { address, } = useWeb3ModalAccount();
  const {walletProvider} = useWeb3ModalProvider();

  useEffect(() => {
    (async function () {
      try {
        if(!address)return;
        const provider = getProvider(walletProvider);
        const signer=await provider.getSigner()
        const contract = getEnsContract(signer);

        const result = await contract.getIsRgisteredAddress();
        // console.log(result)
        setReg(result);
      } catch (error) {
        console.error(error);
        setReg(false);
      }
    })();
  }, [address]);

  return reg;
};

export default useIsRegistered;
