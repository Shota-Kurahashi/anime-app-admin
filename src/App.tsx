/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { FC } from "react";
import { useRefactorData } from "./hooks/refactorData";

const App: FC = () => {
  const [isShow, setIsShow] = React.useState(false);
  const { refactorAnnictData } = useRefactorData();

  return (
    <div className="p-10">
      <button onClick={() => setIsShow((prev) => !prev)}>表示</button>[
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
      ]
    </div>
  );
};

export default App;
