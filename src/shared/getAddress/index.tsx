import axios from "axios";

export const handleFetchAddress = async (latlng: any) => {
  const API_KEY = "AIzaSyDjjNiKps3y27gM7TpL6cyxR01YBnvKcOQ&libraries=places";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng?.lat},${latlng?.lng}&key=${API_KEY}`;
  let _address = "";
  await axios
    .get(url)
    .then((response) => {
      if (response.data.results.length > 0) {
        _address = response.data.results[0].formatted_address;
      } else {
        return "Address not found";
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return _address;
};
