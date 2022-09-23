import { User } from "fpl-ts";

export default defineEventHandler(async (event) => {
  console.log("TRANSFERS CALLED ---" + event);
  const query = useQuery(event);
  var toReturn = null;
  var team = new User(Number(query.entry));
  try {
    console.log("TRANSFERS -- GETTING TRANSFERS ---" + team);

    toReturn = await team.getTransfers();
  } catch (error) {
    console.error(error);
  }
  console.log("TRANSFERS RECEIVED -- " + toReturn)
  return toReturn;
});
