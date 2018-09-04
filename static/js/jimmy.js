d3.json("/topProducts", function(error, response) {
    var div = document.getElementById("topproducts");
    var table = document.createElement("TABLE");
    table.setAttribute("id", "tbl");
    table.setAttribute("class", "table table-bordered");
    table.setAttribute("data-live-search","true");

    var row = document.createElement("TR");
    var cell = document.createElement("TH");
    cell.setAttribute("style","background-color: #ADD8E6!important;");
    var text = document.createTextNode("Top Products");
    cell.appendChild(text);
    row.appendChild(cell);

    var cell2 = document.createElement("TH");
    cell2.setAttribute("style","background-color: #ADD8E6!important;");
    var text2 = document.createTextNode("Total Revenue");
    cell2.appendChild(text2);
    row.appendChild(cell2);

    table.appendChild(row);

    for (var i = 0; i < response.index.length; i++){
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        cell.setAttribute("class","table table-bordered td");
        cell.setAttribute("style","background-color: #ADD8E6!important;");
        var text = document.createTextNode(response.index[i]);
        cell.appendChild(text);
        row.appendChild(cell);
        var cell2 = document.createElement("TD");
        cell2.setAttribute("class","table table-bordered td");
        cell2.setAttribute("style","background-color: #ADD8E6!important;");
        var text2 = document.createTextNode(parseFloat(response.data[i][0]).toFixed(2));
        cell2.appendChild(text2);
        row.appendChild(cell2);
        table.appendChild(row);
    }

    div.appendChild(table);

});

d3.json("/topStates", function(error, response) {
    var div = document.getElementById("topstates");
    var table = document.createElement("TABLE");
    table.setAttribute("id", "tbl");

    var row = document.createElement("TR");
    var cell = document.createElement("TH");
    cell.setAttribute("class","table table-bordered td");
    cell.setAttribute("style","background-color: #ADD8E6!important;");
    var text = document.createTextNode("Top States");
    cell.appendChild(text);
    row.appendChild(cell);
    
    var cell2 = document.createElement("TH");
    cell2.setAttribute("class","table table-bordered td");
    cell2.setAttribute("style","background-color: #ADD8E6!important;");
    var text2 = document.createTextNode("Total Revenue");
    cell2.appendChild(text2);
    row.appendChild(cell2);

    table.appendChild(row);

    for (var i = 0; i < response.index.length; i++){
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        cell.setAttribute("class","table table-bordered td");
        cell.setAttribute("style","background-color: #ADD8E6!important;");
        var text = document.createTextNode(response.index[i]);
        cell.appendChild(text);
        row.appendChild(cell);
        var cell2 = document.createElement("TD");
        cell2.setAttribute("class","table table-bordered td");
        cell2.setAttribute("style","background-color: #ADD8E6!important;");
        var text2 = document.createTextNode(parseFloat(response.data[i][0]).toFixed(2));
        cell2.appendChild(text2);
        row.appendChild(cell2);
        table.appendChild(row);
    }
    div.appendChild(table);

});

d3.json("/topZips", function(error, response) {
    var div = document.getElementById("topzips");
    var table = document.createElement("TABLE");
    table.setAttribute("id", "tbl");

    var row = document.createElement("TR");
    var cell = document.createElement("TH");
    cell.setAttribute("class","table table-bordered td");
    cell.setAttribute("style","background-color: #ADD8E6!important;");
    var text = document.createTextNode("Top Zip Codes");
    cell.appendChild(text);
    row.appendChild(cell);
    
    var cell2 = document.createElement("TH");
    cell2.setAttribute("class","table table-bordered td");
    cell2.setAttribute("style","background-color: #ADD8E6!important;");
    var text2 = document.createTextNode("Total Revenue");
    cell2.appendChild(text2);
    row.appendChild(cell2);

    table.appendChild(row);

    for (var i = 0; i < response.index.length; i++){
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        cell.setAttribute("class","table table-bordered td");
        cell.setAttribute("style","background-color: #ADD8E6!important;");
        var text = document.createTextNode(response.index[i]);
        cell.appendChild(text);
        row.appendChild(cell);
        var cell2 = document.createElement("TD");
        cell2.setAttribute("class","table table-bordered td");
        cell2.setAttribute("style","background-color: #ADD8E6!important;");
        var text2 = document.createTextNode(parseFloat(response.data[i][0]).toFixed(2));
        cell2.appendChild(text2);
        row.appendChild(cell2);
        table.appendChild(row);
    }
    div.appendChild(table);

});

d3.json("/bottomProducts", function(error, response) {
    var div = document.getElementById("bottomproducts");
    var table = document.createElement("TABLE");
    table.setAttribute("id", "tbl");

    var row = document.createElement("TR");
    var cell = document.createElement("TH");
    cell.setAttribute("class","table table-bordered td");
    cell.setAttribute("style","background-color: #ADD8E6!important;");
    var text = document.createTextNode("Bottom Products");
    cell.appendChild(text);
    row.appendChild(cell);
    
    var cell2 = document.createElement("TH");
    cell2.setAttribute("class","table table-bordered td");
    cell2.setAttribute("style","background-color: #ADD8E6!important;");
    var text2 = document.createTextNode("Total Revenue");
    cell2.appendChild(text2);
    row.appendChild(cell2);

    table.appendChild(row);

    for (var i = 0; i < response.index.length; i++){
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        var text = document.createTextNode(response.index[i]);
        cell.appendChild(text);
        cell.setAttribute("class","table table-bordered td");
        cell.setAttribute("style","background-color: #ADD8E6!important;");
        row.appendChild(cell);
        var cell2 = document.createElement("TD");
        var text2 = document.createTextNode(parseFloat(response.data[i][0]).toFixed(2));
        cell2.appendChild(text2);
        cell2.setAttribute("class","table table-bordered td");
        cell2.setAttribute("style","background-color: #ADD8E6!important;");
        row.appendChild(cell2);
        table.appendChild(row);
    }
    div.appendChild(table);

});

d3.json("/bottomStates", function(error, response) {
    var div = document.getElementById("bottomstates");
    var table = document.createElement("TABLE");
    table.setAttribute("id", "tbl");

    var row = document.createElement("TR");
    var cell = document.createElement("TH");
    cell.setAttribute("class","table table-bordered td");
    cell.setAttribute("style","background-color: #ADD8E6!important;");
    var text = document.createTextNode("Bottom States");
    cell.appendChild(text);
    row.appendChild(cell);
    
    var cell2 = document.createElement("TH");
    var text2 = document.createTextNode("Total Revenue");
    cell2.appendChild(text2);
    cell2.setAttribute("class","table table-bordered td");
    cell2.setAttribute("style","background-color: #ADD8E6!important;");
    row.appendChild(cell2);

    table.appendChild(row);

    for (var i = 0; i < response.index.length; i++){
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        cell.setAttribute("class","table table-bordered td");
        cell.setAttribute("style","background-color: #ADD8E6!important;");
        var text = document.createTextNode(response.index[i]);
        cell.appendChild(text);
        row.appendChild(cell);
        var cell2 = document.createElement("TD");
        cell2.setAttribute("class","table table-bordered td");
        cell2.setAttribute("style","background-color: #ADD8E6!important;");
        var text2 = document.createTextNode(parseFloat(response.data[i][0]).toFixed(2));
        cell2.appendChild(text2);
        row.appendChild(cell2);
        table.appendChild(row);
    }
    div.appendChild(table);

});

d3.json("/bottomZips", function(error, response) {
    var div = document.getElementById("bottomzips");
    var table = document.createElement("TABLE");
    table.setAttribute("id", "tbl");

    var row = document.createElement("TR");
    var cell = document.createElement("TH");
    cell.setAttribute("class","table table-bordered td");
    cell.setAttribute("style","background-color: #ADD8E6!important;");
    var text = document.createTextNode("Bottom Zip Codes");
    cell.appendChild(text);
    row.appendChild(cell);
    
    var cell2 = document.createElement("TH");
    cell2.setAttribute("class","table table-bordered td");
    cell2.setAttribute("style","background-color: #ADD8E6!important;");
    var text2 = document.createTextNode("Total Revenue");
    cell2.appendChild(text2);
    row.appendChild(cell2);

    table.appendChild(row);

    for (var i = 0; i < response.index.length; i++){
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        cell.setAttribute("class","table table-bordered td");
        cell.setAttribute("style","background-color: #ADD8E6!important;");
        var text = document.createTextNode(response.index[i]);
        cell.appendChild(text);
        row.appendChild(cell);
        var cell2 = document.createElement("TD");
        cell2.setAttribute("class","table table-bordered td");
        cell2.setAttribute("style","background-color: #ADD8E6!important;");
        var text2 = document.createTextNode(parseFloat(response.data[i][0]).toFixed(2));    
        cell2.appendChild(text2);
        row.appendChild(cell2);
        table.appendChild(row);
    }
    div.appendChild(table);

});