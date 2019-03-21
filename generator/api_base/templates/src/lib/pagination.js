
// Default pagination options
function getPaginationParams (req) {
  let page = Number(req.query.page) || 0;
  let per_page = Number(req.query.per_page) || 300;
  let offset = per_page * page;
  return { page, per_page, offset }
}

module.exports = {
  getPaginationParams
}
