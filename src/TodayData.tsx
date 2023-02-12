import axios from "axios";
import React from "react";

export const TodayData = () => {
  const onClickHandler = async () => {
    try {
      const URL = import.meta.env.VITE_TODAY_DATA_URL;

      const response = await axios.get(URL, {
        responseType: "document",
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button
        onClick={onClickHandler}
        className="bg-red-500 px-4 py-2 text-white"
      >
        fetchTodayData
      </button>
    </div>
  );
};
