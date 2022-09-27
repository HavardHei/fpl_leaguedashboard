import { Player } from "fpl-ts";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  var toReturn = body;
  var pi = new Player(body.ids);
  try {
    toReturn = await pi.getDetails(true, false);
  } catch (error) {
    console.error(error);
  }
  return toReturn;
});
