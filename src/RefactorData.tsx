import React from "react";
import { RefacHasEpisodes } from "./data/refactorHasEpisodes";

const datas = RefacHasEpisodes;
const hasEpisodeFalseToTrue = () => {
  const HasEpisodeData = datas.filter((data) => data.episodes.length > 0);

  return HasEpisodeData;
};
export const RefactorData = () => {
  const [isShow, setIsShow] = React.useState(false);
  const hasEpisodeData = hasEpisodeFalseToTrue();

  return (
    <div>
      <button
        className="bg-indigo-500 px-4 py-2 text-white"
        onClick={() => setIsShow((p) => !p)}
      >
        refactorData表示
      </button>

      {isShow &&
        hasEpisodeData.map((data) => (
          <div>{`{
          title:"${data.title}",
          series_title:"${data.series_title}",
          media_type_id:${1},has_episodes:${!data.has_episodes}},`}</div>
        ))}
    </div>
  );
};
