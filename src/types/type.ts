export type WorksObject = {
  title: string;
  series_title: string | null;
  media_type_id: 1;
  has_episodes: boolean;
  series_id: string | null;
  tid: string | null;
  season_name: string | null;
  season_year: number | null;
};

export type Data = {
  id: string;
  title: string;
  noEpisodes: boolean;
  syobocalTid: string | null;
  seasonName: string | null;
  seasonYear: number | null;
  image: {
    copyright: string;
  } | null;
  seriesList: {
    nodes:
      | [
          {
            id: string;
            name: string;
          }
        ]
      | [];
  };
  episodes: {
    nodes:
      | [
          {
            id: "U2VyaWVzLTIyOTE=";
            name: "京セラ発オリジナルアニメ";
          }
        ]
      | [];
  };
};

export type TmdbData = {
  page: number;
  results: [
    {
      backdrop_path: string | null;
      first_air_date: string;
      genre_ids: number[];
      id: number;
      name: string;
      origin_country: string[];
      original_language: string;
      original_name: string;
      overview: string;
      popularity: number;
      poster_path: string | null;
      vote_average: number;
      vote_count: number;
    }
  ];
  total_pages: number;
  total_results: number;
};
