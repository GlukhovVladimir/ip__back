module.exports = formatDate;

function formatDate(date) {
  let min = date.getMinutes();
  if (min < 10) min = "0" + min;

  let hh = date.getHours();
  if (hh < 10) hh = "0" + hh;

  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = "0" + yy;

  return `${hh}:${min} ${dd}.${mm}.${yy}`;
}
