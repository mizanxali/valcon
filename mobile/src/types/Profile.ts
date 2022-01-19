export default interface Profile {
  _id: string | null;
  discoverable: boolean | null;
  user: string | null;
  riotID: string | null;
  tagline: string | null;
  clip: string | null;
  agents: string[] | null;
  favoriteMap: string | null;
  lookingToPlay: string | null;
  rank: number | null;
  server: string | null;
}
