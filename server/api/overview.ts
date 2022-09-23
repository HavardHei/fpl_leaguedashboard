
export default defineEventHandler(async () => {     
    var data = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
    var json = await data.json();
    return json
});
