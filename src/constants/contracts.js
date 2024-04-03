import { ethers } from "ethers";
import ensAbi from "./ensAbi";



export const getEnsContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_ENS_ADDRESS,
        ensAbi,
        providerOrSigner
    );