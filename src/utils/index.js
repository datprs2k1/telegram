const { Op } = require('sequelize');

function response(res, status, errors, message, data) {
  return process.env.ENCRYPT_API_ENABLE === 'true'
    ? res.json({
        content: encode(JSON.stringify({ status, errors, message, data })),
      })
    : res.json({ status, errors, message, data });
}

function handleFilters(query, attrs, whereKeywords = {}, orders = [['createdAt', 'DESC']], include, subQuery) {
  const perPage = parseInt(query.per_page) || 10;
  const page = parseInt(query.page) || 1;
  const keyword = query.keyword;

  let whereKey = { name: { [Op.like]: `%${keyword}%` } };
  if (whereKeywords !== {}) {
    whereKey = whereKeywords;
  }
  const whereCons = {};
  if (query.filters) {
    for (let i = 0; i < query.filters.length; i++) {
      const filter = query.filters[i];
      if (((isArray(filter.data) || isObject(filter.data)) && !isEmpty(filter.data)) || filter.data) {
        whereCons[filter.key] = filter.data;
      }
    }
  }
  options = {
    attributes: attrs,
    page: page,
    paginate: perPage,
    order: orders,
    // logging: true,
    ...(subQuery === false && {
      subQuery: subQuery,
    }),
    where: { ...whereCons, ...whereKey },
  };
  if (include) {
    options.include = include;
  }

  if (subQuery) {
    options.subQuery = subQuery;
  }
  return options;
}

module.exports = {
  response,

  handleFilters,
};
