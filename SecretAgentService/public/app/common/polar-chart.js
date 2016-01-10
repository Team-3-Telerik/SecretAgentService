(function () {
    $.ajax({
            url: 'http://localhost:3000/api/statistics'
        })
        .then(function (statistics) {
            console.log(statistics);

            var polarData = [
                {
                    value: statistics.commissioners,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Commissioners"
                },
                {
                    value: statistics.agents,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Agents"
                },
                {
                    value: statistics.missions,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Missions"
                }
            ];

            if (document.getElementById("chart-area")) {

                var ctx = document.getElementById("chart-area").getContext("2d");
                window.myPolarArea = new Chart(ctx).PolarArea(polarData, {
                    responsive: true
                });

            }
        });


}());