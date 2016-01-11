(function () {
    $.ajax({
            url: 'http://localhost:3000/api/statistics'
        })
        .then(function (statistics) {

            var data = [
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
                    color: "#9966ff",
                    highlight: "#9933cc",
                    label: "Missions"
                }
            ];

            if (document.getElementById("chart-area")) {

                var ctx = document.getElementById("chart-area").getContext("2d");
                window.myPolarArea = new Chart(ctx).Pie(data, {
                    responsive: true
                });

            }
        });

    $('#chart-area').click(function (evt) {
        var activePoints = window.myPolarArea.getSegmentsAtEvent(evt);
        if (activePoints[0]) {
            if(activePoints[0].label == 'Missions'){
                window.location.href = "/missions";
            }
            if(activePoints[0].label == 'Commissioners'){
                window.location.href = "/users/commissioners";
            }
            if(activePoints[0].label == 'Agents'){
                window.location.href = "/users/agents";
            }
        }
    });

}());