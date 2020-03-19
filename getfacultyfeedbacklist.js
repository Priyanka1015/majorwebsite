
const fval = [];
const flabel = [];
function myval(){

    $(".cbtn").click(function(){
        var $row=$(this).closest("tr");
        var val=$row.find(".val").text();
        var secval=$row.find(".secval").text();
        const arr=val.split(".");
        //alert(arr[1]+" "+secval);
        fval.length=0;
        flabel.length=0;
        var ctx = document.getElementById('myChart').getContext('2d');
        firebase.database().ref("Feedback").child(arr[1]).child(secval).once("value", function(snapshot){
            console.log("parent key");
            console.log(snapshot.key);
            snapshot.forEach(function (childSnapshot){
                var childkey=childSnapshot.key;
                var childData=childSnapshot.val();
                console.log("child key");
                console.log(childkey);
                if(flabel.indexOf(childkey)==-1){
                    flabel.push(childkey);
                }
                console.log("childdata");
                console.log(childData['feedbackval']);
                if(fval.length<=flabel.length){
                    fval.push(childData['feedbackval']);
                }
            });
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: flabel,
                    datasets: [{
                        label: 'Feedback',
                        data: fval,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        });
})
}