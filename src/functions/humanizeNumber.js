module.exports = (x) => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
