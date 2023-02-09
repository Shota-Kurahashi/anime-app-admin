/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import axios from "axios";
import React, { FC } from "react";
import { data } from "./data/data";
import { titles } from "./data/titles";

import { TmdbData, WorksObject } from "./types/type";

const allTitle = titles;

const App: FC = () => {
  const [result, setResult] = React.useState<
    {
      title: string;
      series_title: string | null;
      media_type_id: number;
      poster_path: string | null;
    }[]
  >([]);
  const [isShow, setIsShow] = React.useState(false);
  const objects: WorksObject[] = data.map((node) => {
    const seriesList = node?.seriesList?.nodes;
    const seriesListLength = seriesList?.length;
    const title = seriesListLength
      ? seriesList?.[seriesListLength ? seriesListLength - 1 : 0]?.name.replace(
          /"/g,
          ""
        )
      : node?.title.replace(/"/g, "");

    const series_title = seriesListLength
      ? node?.title.replace(/"/g, "")
      : null;

    return {
      title,
      series_title,
      sub_title: null,
      media_type_id: 1,
      official_site_url:
        node?.officialSiteUrl !== "" && node?.officialSiteUrl !== undefined
          ? node?.officialSiteUrl.replace(/"/g, "")
          : null,
      official_twitter_name:
        node?.twitterUsername !== "" &&
        node?.twitterUsername !== undefined &&
        node?.twitterUsername !== null
          ? node?.twitterUsername
          : null,
      twitter_hash_tag: null,
      has_episodes: node.episodes?.nodes.length > 0,
      copyright:
        node?.image?.copyright !== "" && node?.image?.copyright !== undefined
          ? node?.image?.copyright.replace(/”/g, "")
          : null,
      series_id: seriesListLength
        ? node?.seriesList?.nodes[seriesListLength - 1]?.id
        : null,
      season_name: node.seasonName ?? null,
      season_year: node.seasonYear ?? null,
    };
  });

  const onClickHandler = async () => {
    const result = allTitle.map(async (d) => {
      const datas = await axios
        .get<TmdbData>(
          `https://api.themoviedb.org/3/search/tv?api_key=0&query=${d.title}&language=ja&page=1`
        )
        .then((res) => res.data);

      return {
        title: d.title,
        series_title: d.series_title ?? null,
        media_type_id: 1,
        poster_path: datas?.results?.[0]?.poster_path ?? null,
      };
    });

    const results = await Promise.all(result);

    setResult(results);
  };

  return (
    <div className="p-10">
      <button onClick={() => setIsShow((prev) => !prev)}>表示</button>[
      {isShow &&
        objects?.map((object, index) => (
          <div key={object.series_title ?? index}>
            {`{title:"${object.title}",series_title:${
              object.series_title === null ? `""` : `"${object.series_title}"`
            },sub_title:${object.sub_title},media_type_id:${
              object.media_type_id
            },official_site:${
              object.official_site_url === null
                ? null
                : `"${object.official_site_url}"`
            },official_twitter_name:${
              object.official_twitter_name === null
                ? null
                : `"${object.official_twitter_name}"`
            },twitter_hash_tag:${object.twitter_hash_tag},has_episodes:${
              object.has_episodes
            },copyright:${
              object.copyright === null ? null : `"${object.copyright}"`
            },series_id:${
              object.series_id === null ? null : `"${object.series_id}"`
            },season_name:${
              object.season_name === null ? null : `"${object.season_name}"`
            },season_year:${
              object.season_year === null ? null : `${object.season_year}`
            }},`}
          </div>
        ))}
      ]<button onClick={onClickHandler}>fetch</button>
      {result?.map((d, index) => (
        <div key={index}>
          {`
          {title:"${d.title}",image:${
            d.poster_path === null ? null : `"${d.poster_path}"`
          },series_title:${
            d.series_title === null ? null : `"${d.series_title}"`
          },media_type_id:${d.media_type_id}},`}
        </div>
      ))}
    </div>
  );
};

export default App;
