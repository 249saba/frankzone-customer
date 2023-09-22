import { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import CustomButton from "../customButton";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import Input from "../input";

function AutoLocation({
  suburbSelect,
  label,
  selectedValue,
  error,
  isError,
  placeholder = "Find a Location",
  isRequired,
  searchIcon,
  searchbtn,
  name,
}: any) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (e: any) => {
    setValue(e.target.value);
    suburbSelect(e.target.value);
  };

  const handleSelect = (val: any) => {
    setValue(val, false);
    clearSuggestions();
    getGeocode({ address: val }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      suburbSelect({
        val,
        lat,
        lng,
      });
      console.log("📍 Coordinates: ", { lat, lng, val });
    });
  };
  return (
    <div className="flex flex-col items-start w-full relative">
      {label && (
        <label className="block mb-2 text-sm text-black-100">{label}</label>
      )}

      {/* <input
        value={selectedValue}
        onChange={handleInput}
        // disabled={!ready}
        className=" text-black-100 pl-2 w-full h-12"
        placeholder={placeholder}
        /> */}
      <Input
        name={name ? name : "location"}
        value={selectedValue}
        onChange={handleInput}
        // disabled={!ready}
        className=" text-black-100 pl-2 break-words !rounded-medium "
        inputClassName="lg:!h-16 "
        placeholder={placeholder}
        leftIcon={searchIcon ? <SearchIcon className="!left-8" /> : ""}
        rightIcon={
          searchbtn ? (
            <CustomButton
              label={"Search"}
              type={"submit"}
              isLoading={false}
              variant={"outlined"}
              styleClass={"btn-black"}
              // handleButtonClick={() => handleInput}
            />
          ) : (
            ""
          )
        }
      />
      {/* {searchIcon&&<CustomButton
              label={"Search"}
              type={"submit"}
              isLoading={false}
              variant={"outlined"}
              styleClass={"btn-black z-"}
              // handleButtonClick={() => handleInput}
            />} */}

      {status === "OK" && (
        <ul className="shadow w-full z-10 absolute top-[5.5rem] bg-white text-black-100">
          {data.map(({ place_id, description }) => (
            <li
              className="hover:bg-gray-light py-1 pl-4 text-left cursor-pointer text-black-100"
              key={place_id}
              onClick={() => handleSelect(description)}
            >
              <small className="text-black-100">{description}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoLocation;
