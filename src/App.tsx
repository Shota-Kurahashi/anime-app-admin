/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { FC } from "react";
import { data } from "./data";

import { WorksObject } from "./types/type";

const App: FC = () => {
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
      has_episodes: !node?.noEpisodes,
      copyright:
        node?.image?.copyright !== "" && node?.image?.copyright !== undefined
          ? node?.image?.copyright.replace(/”/g, "")
          : null,
      series_id: seriesListLength
        ? node?.seriesList?.nodes[seriesListLength - 1]?.id
        : null,
    };
  });

  console.log(objects);

  return (
    <div>
      [
      {objects.map((object, index) => (
        <div key={object.series_title ?? index}>
          {`{title:"${object.title}",series_title:${
            object.series_title === null ? null : `"${object.series_title}"`
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
          }},`}
        </div>
      ))}
      ]
    </div>
  );
};

export default App;
