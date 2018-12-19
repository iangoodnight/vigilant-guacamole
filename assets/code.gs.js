function retrieveData() {
  var url,
      response,
      data,
      formatted;
  
  url = "https://vigilant-guacamole.firebaseio.com/.json";
  response = UrlFetchApp.fetch(url);
  data = JSON.parse(response);
  formatted = fieldBuilder(data);
  
  Logger.log(response);
  Logger.log(formatted);
  return formatted;
  
};

function fieldBuilder(data) {
  var smallArr,
      finalArr,
      row;
  
  finalArr = [];
  row = 3
  
  for (i in data) {
    smallArr = [];
    smallArr.push(data[i].employee_number);
    smallArr.push("=IFERROR(INDEX(Roster!B:B,MATCH(A" + row + ",Roster!A:A,0)), \"Not Found\")");
    smallArr.push("=IFERROR(INDEX(Roster!E:E,MATCH(A" + row + ",Roster!A:A,0)), \"Not Found\")");
    smallArr.push(data[i].quantity_processed);
    smallArr.push(data[i].time_spent);
    smallArr.push(stringToDuration(data[i].time_spent));
    smallArr.push(Utilities.formatDate(new Date(data[i].date_added), "America/New_York","MMM d,yyyy 'at' h:mm a").toString());
    
    finalArr.push(smallArr);
    row++;
  }
  
  return finalArr;
};

function updateSheet() {
  var ss,
      sheet,
      numRows,
      numRows0,
      numColumns,
      range,
      range0,
      values;
  
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getSheetByName("Results");
  values = retrieveData();
  numRows = values.length;
  numRows0 = sheet.getLastRow() - 2;
  numColumns = sheet.getLastColumn();
  range = sheet.getRange(3, 1, numRows, numColumns);
  range0 = sheet.getRange(3, 1, numRows0, numColumns);
  range0.clearContent();
  range.setValues(values);
};

function test() {
  Logger.log(stringToDuration("00:09"));
  
};  

function stringToDuration(str) {
  var arr,
      minutesAsSeconds,
      secondsArr,
      seconds,
      debug;
  
  arr = str.split(':');
  minutesAsSeconds = parseInt(arr[0]) * 60;
  
  if (arr[1].charAt(0) === "0") {
    seconds = minutesAsSeconds + parseInt(arr[1].charAt(1));
  } else {
    seconds = minutesAsSeconds + parseInt(arr[1]);
    
  };

  return seconds;
  
};