var http = require('http');
var str_replace = require('str_replace');
var port = 3000;

var server = http.createServer(function(request, response) {
    switch (request.url) {
        case '/':
            response.end("Hello Sergey");
            break;

        default:
			 var str = calculate(request.url);
			response.end(str);
        	break;
    }
});

server.listen(port, function() {
    console.log("Server is listening port: " + port);
    console.log("Visit http://localhost:" + port + "to see your app");
});
// /[^0-9\.\+\-\*\/]/g

function calculate(str) {
	var str = str_replace(/[^0-9\.\+\-\*\/]/g, "", str);

	var op = str.indexOf("+");
	var om = str.indexOf("-");
	var omp = str.indexOf("*");
	var od = str.indexOf("/",1);


	if(op > 0){
		str = str.split("+");
		str[0] = str_replace(/[^0-9\.]/g, "",str[0]);
		str  = parseFloat(str[0]) + parseFloat(str[1]);
		str = str.toString();
		return str;
	}else if(om > 0){
		str = str.split("-");
		str[0] = str[0].replace(/[^0-9\.]/g, "");
		str  = parseFloat(str[0]) - parseFloat(str[1]);
		str = str.toString();
		return str;
	}else if(omp > 0){
		str = str.split("*");
		str[0] = str[0].replace(/[^0-9\.]/g, "");
		str  = parseFloat(str[0]) * parseFloat(str[1]);
		str = str.toString();
		return str;
	}else if(od > 0){
		str = str.split("/");
		str[0] = str[0].replace(/[^0-9\.]/g, "");
		str  = parseFloat(str[1]) / parseFloat(str[2]);
		str = str.toString();
		return str;
	}else{
		return "Error";
	}
}