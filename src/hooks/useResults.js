import yelp from "../api/yelp";
import { useState, useEffect } from "react";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get("search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
    } catch (error) {
      setErrorMessage("Someting went worng");
    }
  };

  useEffect(() => {
    searchApi("restaurants");
  }, []);

  return [searchApi, results, errorMessage];
};
