import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getEnsContract } from "../constants/contracts";
import { toast } from "react-toastify";


const useRegistar = ( name, img,callback) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    return useCallback(async (name, img,callback) => {
        if (!isSupportedChain(chainId)) return toast.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getEnsContract(signer);

        try {
            const transaction = await contract.registarUser(name, img);
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                callback(true)
                return toast.success("Registered successfull!");
            }
            callback(false)

            toast.error("registeration failed!");
        } catch (error) {
            callback(false)

            // console.log(error);
            let errorText;
            if (error.reason === "username already exist") {
                errorText = "Username already exist!";
            }

            toast.error(`Error: ${errorText}`);
        }
    }, [chainId, walletProvider]);
}

export default useRegistar