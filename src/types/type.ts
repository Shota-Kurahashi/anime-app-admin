export type WorksObject = {
  title: string;
  series_title: string | null;
  sub_title: string | null;
  media_type_id: 1;
  official_site_url: string | null;
  official_twitter_name: string | null;
  twitter_hash_tag: string | null;
  has_episodes: boolean;
  copyright: string | null;
  series_id: string | null;
};

export type Data = {
  id: string;
  title: string;
  twitterUsername: string;
  officialSiteUrl: string;
  noEpisodes: boolean;
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
};
