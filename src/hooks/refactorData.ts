/* eslint-disable camelcase */
import { data } from "../data/data";
import { WorksObject } from "../types/type";

export const useRefactorData = () => {
  const refactorAnnictData = () => {
    const objects: WorksObject[] = data.map((node) => {
      const seriesList = node?.seriesList?.nodes;
      const seriesListLength = seriesList?.length;
      const title = seriesListLength
        ? seriesList?.[seriesListLength ? seriesListLength - 1 : 0]?.name
            .replace(/"/g, "")
            .replace(/”/g, "")
        : node?.title.replace(/"/g, "").replace(/”/g, "");

      const series_title = seriesListLength
        ? node?.title.replace(/"/g, "").replace(/”/g, "")
        : null;

      return {
        title,
        tid: node?.syobocalTid,
        series_title,
        media_type_id: 1,
        has_episodes: node.episodes?.nodes.length > 0,
        series_id: seriesListLength
          ? node?.seriesList?.nodes[seriesListLength - 1]?.id
          : null,
        season_name: node.seasonName ?? null,
        season_year: node.seasonYear ?? null,
      };
    });

    return objects;
  };

  return { refactorAnnictData };
};
