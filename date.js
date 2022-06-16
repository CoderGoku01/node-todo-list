
function getDate() {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let today = new Date().toLocaleDateString("en-US", options)

  return today
}

function getDay() {
  let options = { weekday: 'long', };
  let today = new Date().toLocaleDateString("en-US", options)

  return today
}



module.exports = {
  getDate: getDate,
  getDay: getDay
}