const { parse } = require("csv-parse");
const fs = require("fs");
const habitablePLanet = [];
function isHabitablePLanet(planet) {
  return (
    planet["koi_disposition"] == "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
fs.createReadStream("planet_data.csv")
  // this createReadstream results in a event emitter  which emits an event .on is used to listen to that event
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePLanet(data)) {
      habitablePLanet.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      habitablePLanet.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${habitablePLanet.length} habital planets found `);
  });
