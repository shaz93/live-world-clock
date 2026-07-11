let activeCities = ["Africa/Johannesburg", "Europe/Dublin"];

      function updateClocks() {
        if (typeof moment === "undefined" || typeof moment.tz === "undefined") return;
        
        document.querySelectorAll(".city").forEach(cityDiv => {
          const tz = cityDiv.getAttribute("data-tz");
          const time = moment().tz(tz);
          
          const dateEl = cityDiv.querySelector(".date");
          const timeEl = cityDiv.querySelector(".time");
          
          const newDate = time.format("MMMM Do YYYY");
          const newTime = time.format("h:mm:ss") + " <small>" + time.format("A") + "</small>";
          
          if (dateEl.innerHTML !== newDate) dateEl.innerHTML = newDate;
          if (timeEl.innerHTML !== newTime) timeEl.innerHTML = newTime;
        });
      }

      function renderCities(tzs) {
        const citiesList = document.querySelector("#cities-list");
        citiesList.innerHTML = "";
        
        tzs.forEach(tz => {
        
          let cityName = tz.split("/")[1].replace("_", " ");
          let displayName = cityName;
          if (tz === "Africa/Johannesburg") displayName = "Johannesburg (Local)";
          
          const div = document.createElement("div");
          div.className = "city";
          div.setAttribute("data-tz", tz);
          div.innerHTML = `<div><h2>${displayName}</h2><div class="date"></div></div><div class="time"></div>`;
          citiesList.appendChild(div);
        });
        updateClocks();
      }

      document.querySelector("#city-select").addEventListener("change", function(e) {
        const tz = e.target.value;
        if (!tz) return;
        
      
        if (!activeCities.includes(tz)) {
            const newArray = [activeCities[0], activeCities[1], tz];
            renderCities(newArray);
            document.querySelector("#home-link").style.display = "block";
        }
        
        
        e.target.value = "";
      });

      document.querySelector("#home-link").addEventListener("click", function(e) {
        e.preventDefault();
        activeCities = ["Africa/Johannesburg", "Europe/Dublin"];
        renderCities(activeCities);
        document.querySelector("#home-link").style.display = "none";
      });

      
      setInterval(updateClocks, 1000);
      renderCities(activeCities);