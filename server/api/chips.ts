import { User } from "fpl-ts";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  var toReturn = null;
  var u = new User(Number(query.entry));
  try {
    toReturn = await u.getChipsHistory();
  } catch (error) {
    console.error(error);
  }
  return toReturn;
});
