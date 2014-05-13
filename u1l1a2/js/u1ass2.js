$(document).ready(function() {

    $("#plus").click(function(e) {
        var x = $("#xvalue").val();
        var y = $("#yvalue").val();
        if (isNumeric(x) && isNumeric(y)) {
            $("#operation").text("plus");
            $("#result").text(parseInt(x) + parseInt(y));
        } else {
            alert("invalid operand(s). Try again!!");
            $("#xvalue").val("");
            $("#yvalue").val("")
            $("#result").text("Z");
            return;
        }

    });

    $("#minus").click(function(e) {
        var x = $("#xvalue").val();
        var y = $("#yvalue").val();
        if (isNumeric(x) && isNumeric(y)) {
            $("#operation").text("plus");
            $("#result").text(parseInt(x) - parseInt(y));
        } else {
            alert("invalid operand(s). Try again!!");
            $("#xvalue").val("");
            $("#yvalue").val("")
            $("#result").text("Z");
            return;
        }

    });


    function isNumeric(n) {
        return !isNaN(parseInt(n)) && isFinite(n);
    }

});