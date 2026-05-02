'use strict';

function LogFeed({ items }) {
  return {
    type: 'LogFeed',
    items,
  };
}

module.exports = {
  LogFeed,
};

