/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { FC } from "react";
import { Episodes } from "./Episodes";
import { useRefactorData } from "./hooks/refactorData";
import { RefactorData } from "./RefactorData";

import { Xml } from "./Xml";

const App: FC = () => {
  const [isShow, setIsShow] = React.useState(false);
  const { refactorAnnictData } = useRefactorData();

  return (
    <div className="p-10">
      <Episodes />
      <Xml />
      <RefactorData />
      <button
        className="bg-indigo-500 px-4 py-2 text-white"
        onClick={() => setIsShow((prev) => !prev)}
      >
        表示
      </button>
      {isShow &&
        refactorAnnictData()?.map((object, index) => (
          <div key={object.series_title ?? index}>
            {`{title:"${object.title}",series_title:${
              object.series_title === null
                ? `"${object.title}"`
                : `"${object.series_title}"`
            },media_type_id:${object.media_type_id},series_id:${
              object.series_id === null ? null : `"${object.series_id}"`
            },season_name:${
              object.season_name === null ? null : `"${object.season_name}"`
            },season_year:${
              object.season_year === null ? null : `${object.season_year}`
            },tid:${object.tid === null ? null : object.tid}},`}
          </div>
        ))}
    </div>
  );
};

export default App;
