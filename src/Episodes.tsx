import React from "react";
import { AllTitleDataShobo } from "./data/AllshoboTitle";
import { HasTidData } from "./data/hasTidData";

const allShoboData = AllTitleDataShobo;

const hasTidDatas = HasTidData;

const sliceByNumber = (array: string[]) => {
  const length = Math.ceil(array.length / 2);

  return new Array(length)
    .fill(null)
    .map((_, i) => array.slice(i * 2, (i + 1) * 2));
};

const careateEpisode = () => {
  const hasEpisodes = allShoboData.filter((item) => item.SubTitles !== "");

  const spilitData = hasEpisodes
    .map((item) => {
      const splitdata = item.SubTitles.trim().split("*").slice(1);

      const tidData = hasTidDatas.find((data) => data.tid === +item.TID);

      // TODO nullのやつはworkに入ってない
      if (tidData === undefined) return null;

      return {
        work_id: tidData?.id,
        tid: tidData?.tid,
        splitdata,
      };
    })
    .filter((item) => item !== null);

  const sliceData = spilitData
    .map((item) => {
      if (item === null) return null;

      return {
        work_id: item.work_id,
        tid: item.tid,
        splitdata: sliceByNumber(item.splitdata),
      };
    })
    .filter((item) => item !== null);

  return sliceData;
};

const filterEpisodes = () => {
  const targetEpisodes = careateEpisode() as {
    work_id: number;
    tid: number;
    splitdata: string[][];
  }[];

  const episodes = targetEpisodes.map((item) =>
    item.splitdata
      .map((data, index) => {
        if (data[1].trim() === "") return null;

        return {
          work_id: item.work_id,
          tid: item.tid,
          number: +data[0],
          title: data[1].replace(/“/g, "").trim(),
          has_next_episode: index !== item.splitdata.length - 1,
          has_prev_episode: index !== 0,
          start_time: "2023-01-29T00:00:00.000Z",
          end_time: "2023-01-29T00:00:00.000Z",
        };
      })
      .filter((i) => i !== null)
  );

  return episodes;
};

export const Episodes = () => {
  const episodes = filterEpisodes();

  return (
    <div>
      {episodes.map((episode) => {
        const els = episode.map((item) => (
          <div>{`{
          work_id: ${item?.work_id},
          title:"${item?.title}",
          number:${item?.number},
          has_next_episode:${item?.has_next_episode},
          has_prev_episode:${item?.has_prev_episode},
          start_time:"${item?.start_time}",
          end_time:"${item?.end_time}",
          },`}</div>
        ));

        return <div>{els}</div>;
      })}
    </div>
  );
};
