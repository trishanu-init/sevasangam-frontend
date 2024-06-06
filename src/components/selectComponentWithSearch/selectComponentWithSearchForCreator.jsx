// selectComponentWithSearch.jsx

import { useEffect, useRef, useState } from "react";

import axios from "axios";
import propTypes from "prop-types";

SelectComponentWithSearchForCreator.propTypes = {
  templeName: propTypes.string,
};

export default function SelectComponentWithSearchForCreator({
  templeName = "",
}) {
  const [selectData, setSelectData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [templeNameState, setTempleNameState] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const inputChange = (e) => {
    const searchValue = e.target.value;

    setSelectData([]);
    // if (searchValue.length < 3) return;

    setSearchData(searchValue);
  };

  const inputFocus = () => {
    setTempleNameState(templeName);
  };

  useEffect(() => {
    if (searchData === "" && templeNameState === false) {
      return ;
    }
    console.log("................");
    console.log(searchData, templeNameState);
    setErrorMessage("");
    const fetchTemples = async () => {
      setLoading(true);
      console.log("fetching data")
      const api = import.meta.env.VITE_API_URL;

      try {
        const fetchData = await axios.get(`${api}/temple/get-temple-creators`, {
          params: {
            templeNameSearchString: templeNameState,
            creatorSearchString: searchData,
          },
        });

        console.log(fetchData.data.data);
        setSelectData(fetchData.data.data);

        // setSelectData(fetchData.data.data.temples);
      } catch (err) {
        if (err.response?.data?.message) {
          return setErrorMessage(err.response.data.message);
        }
        setErrorMessage("Error in fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, [searchData, templeNameState]);

  return (
    <div>
      <input
        type="text"
        placeholder="Created By"
        onChange={inputChange}
        onFocus={inputFocus}
        ref={inputRef}
        className="form-control position-relative"
        name="templeCreatedBy"
      />

      {(loading || errorMessage || (selectData && selectData.length > 0)) && (
        <ul
          className="position-absolute bg-white border border-1 border-dark mt-1"
          style={{
            width: "fitContent",
          }}
        >
          {loading && <li className="spinner-border" role="status"></li>}
          {errorMessage && <li>{errorMessage}</li>}
          {selectData.map((data,i) => (
            <li
              key={i}
              onClick={() => {
                inputRef.current.value = data.name;
                setSelectData([]);
              }}
              className="cursor-pointer mt-1 p-1 border-bottom border-1 border-dark"
              role="button"
            >
              {data.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
