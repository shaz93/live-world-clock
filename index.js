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

      document.querySelector("#city-select").addEventListener("change", function(e) {
        const tz = e.target.value;
        if (!tz) return;

        const cityName = tz.split("/")[1].replace("_", " ");
        const citiesList = document.querySelector("#cities-list");
        
        // Don't add if already exists
        if (document.querySelector(`.city[data-tz="${tz}"]`)) return;

        const div = document.createElement("div");
        div.className = "city";
        div.setAttribute("data-tz", tz);
        div.innerHTML = `<div><h2>${cityName}</h2><div class="date"></div></div><div class="time"></div>`;
        
        citiesList.prepend(div);
        
        // Limit to 4 visible clocks for a clean interface
        if (citiesList.children.length > 4) {
          citiesList.removeChild(citiesList.lastElementChild);
        }
        
        updateClocks();
      });

      setInterval(updateClocks, 1000);
      updateClocks();