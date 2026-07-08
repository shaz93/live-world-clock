function updateTime() {
  // South Africa
  let losAngelesElement = document.querySelector("#los-angeles");
  if (SouthAfricaElement) {
    let SouthAfricaDateElement = losAngelesElement.querySelector(".date");
    let SouthAfricaTimeElement = losAngelesElement.querySelector(".time");
    let SouthAfricaTime = moment().tz("Africa/Johannesburg");

    SouthAfricaDateElement.innerHTML = SouthAfricaTime.format("MMMM	Do YYYY");
    SouthAfricaTimeElement.innerHTML = SouthAfricaTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Ireland
  let dublinElement = document.querySelector("#dublin");
  if (dublinElement) {
    let dublinDateElement = dublinElement.querySelector(".date");
    let dublinTimeElement = dublinElement.querySelector(".time");
    let dublinTime = moment().tz("Europe/Dublin");

    dublinDateElement.innerHTML = dublinTime.format("MMMM	Do YYYY");
    dublinTimeElement.innerHTML = dublinTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM	Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  `;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);