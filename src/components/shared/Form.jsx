import { Camera } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { encodeBytes32String } from "ethers";
import axios from 'axios';
import useRegistar from "../../hooks/useRegistar";


export default function Form({ username, setUsername,callback }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false)

  const registar = useRegistar()

  const handleSelectImage = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedFile, username);

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        }
      );
      // `https://gateway.pinata.cloud/ipfs/${img}`
      const fileUrl = response.data.IpfsHash;
      const tx = {
        username: encodeBytes32String(username),
        image: fileUrl,
      };


      console.log(tx);
      registar(tx.username, tx.image,callback);

    } catch (error) {
      callback(false)
      console.log("Pinata API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="justify-end flex p-4">
        <w3m-button />
      </div>
      <div className="flex justify-center items-center w-full lg:mt-10">
        <div className="w-full max-w-sm justify-center flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            hidden
            className="hidden"
            id="selectFile"
            onChange={handleSelectImage}
          />
          <label
            htmlFor="selectFile"
            className="rounded-full w-32 h-32 bg-primary flex items-center justify-center cursor-pointer">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Camera className="w-16 h-16 text-muted-foreground" />
            )}
          </label>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col my-4 w-full gap-4">
            <div className="space-y-2">
              <label className="text-sm">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {
              isLoading ?
                <Button>Loading</Button>
                :
                <Button>Create</Button>
            }

          </form>
        </div>
      </div>
    </div>
  );
}
