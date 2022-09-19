import { ClassicLeague } from "fpl-ts";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  var toReturn = null;
  const league = new ClassicLeague(Number(query.id));
  try {
    const details = await league.getDetails();
    //@ts-ignore
    toReturn = details;
  } catch (err) {
    console.error(err);
  }
  return toReturn;
});
