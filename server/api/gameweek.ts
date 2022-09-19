import { Gameweek } from "fpl-ts";
var GetRange = (arrlength: number) => {
  return Array.from({ length: arrlength }, (x, i) => i + 1);
};

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  var toReturn = null;
  const games = new Gameweek(GetRange(Number(query.range)));
  try {
    const details = await games.getDetails();
    toReturn = details;
  } catch (err) {
    console.error(err);
  }
  return toReturn;
});
