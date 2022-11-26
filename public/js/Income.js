
// Menu Toggle

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


/* function GenerateTable(){
  var s=document.getElementById("start").value; // Start date (string)
  const s_str=s.toString();
  var e=document.getElementById("end").value; // End date (string)
  // or use it separately
  const start_date = s_str.split("-");
  const s_day = start_date[2];
  const s_month = start_date[1];
  const s_year = start_date[0];

  const e_str=e.toString();
  const end_date = e_str.split("-");
  const e_day = end_date[2];
  const e_month = end_date[1];
  const e_year = end_date[0];
  // use this to get data from database
  // generate table
  // generate total income:
  document.getElementsByClassName("moneySum")[0].innerHTML="500,000đ";
} */

