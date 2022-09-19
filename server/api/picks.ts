import { User } from "fpl-ts";
var GetRange = (arrlength: number) => {
  return Array.from({ length: arrlength }, (x, i) => i + 1);
};

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  var toReturn = null;
  if (query.arrlength) {
    var u = new User(Number(query.entry));
    try {
      var picks = await u.getPicks(GetRange(Number(query.arrlength)));
      //@ts-ignore
      if (Object.values(picks).some((x) => x.status == 404)) toReturn = [];
      else toReturn = Object.values(picks);
    } catch (error) {
      console.error(error);
    }
    return toReturn;
  }
  if (query.gw) {
    const user = new User(Number(query.entry));
    try {
      var team = await user.getPicks([Number(query.gw)]);
      toReturn = team;
    } catch (error) {
      console.error(error);
    }
    return toReturn;
  }
});
