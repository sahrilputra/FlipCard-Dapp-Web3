import axios from "axios";
import FormData from "form-data";

const API_KEY = "c5628ed6292b241ed13e";
const API_SECRET = "bb3d47909d6f9c3bc12decce33f8d2fcb82e104da8a68ae0a0b2c36f5f44ab5f";

export default async function uploadImage(fileLocation, fileName) {
  const response = await axios.get(fileLocation, {
    responseType: "blob",
  });
  return await uploadToPinata(response.data, fileName);
}

async function uploadToPinata(image, name) {
  // put file into form data
  const formData = new FormData();
  formData.append("file", image, name);

  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const response = await axios.post(url, formData, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET,
    },
  });
  return { imageHash: response.data.IpfsHash };
}
