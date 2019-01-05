/***********************************
 * Start of Javascript 
 ***********************************/
 // set all the global variables
 //from data.js
var tableData = data;
//use D3 to select the table and search button
var table = d3.select("table");
var filter = d3.select("#filter-btn");

/***********************************
 * Function:  Update and Display the table
 ************************************/
function renderTable(tableValues){
 // Use D3 to select the table body
var tbody = d3.select("tbody");
d3.select("tbody").html("") ;
// Loop though all the values of the row and display the table
for (var i =0; i < tableValues.length; i++){
    tr = tbody.append("tr");
    tr.append("td").text(tableValues[i].datetime);
    var cityValue = capitalizeFirstLetter(tableValues[i].city)
    tr.append("td").text(cityValue);
    tr.append("td").text(tableValues[i].state.toUpperCase());
    tr.append("td").text(tableValues[i].country.toUpperCase());
    tr.append("td").text(tableValues[i].shape);
    tr.append("td").text(tableValues[i].durationMinutes);
    tr.append("td").text(tableValues[i].comments);
};
};
// Display the full table before filter option
renderTable(tableData);
/***********************************
 * Function:  capitalization of city name
 ************************************/
function capitalizeFirstLetter(string) {
    return string
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
};

/***********************************
 * Filter the data and display the filtered table
 ************************************/

filter.on("click",function(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    var filterData =tableData;
    // Select the input element and get the raw HTML node and value property of the input element
    var selectDate = d3.select("#datetime").property("value");
    var selectCity = d3.select("#city").property("value");
    var selectState = d3.select("#state").property("value");
    var selectCountry= d3.select("#country").property("value");
    var selectShape = d3.select("#shape").property("value");
    
    if (selectDate){
        filterData= tableData.filter(data => data.datetime === selectDate);
    };
    if (selectCity){
        filterData = filterData.filter(data => data.city=== selectCity.toString().toLowerCase());
    };
    if (selectState){
        filterData = filterData.filter(data => data.state=== selectState.toString().toLowerCase());
    };
    if (selectCountry){
       filterData = filterData.filter(data => data.country=== selectCountry.toString().toLowerCase());
    };
    if (selectShape){
        filterData = filterData.filter(data => data.shape === selectShape.toString().toLowerCase());
    };
    // update the table filter and display the new filtered table
    renderTable(filterData);
});


