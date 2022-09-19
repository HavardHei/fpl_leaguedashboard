import { User } from "fpl-ts";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  var toReturn = null;
  var team = new User(Number(query.entry));
  try {
    toReturn = await team.getTransfers();
  } catch (error) {
    console.error(error);
  }
  return toReturn;
});
