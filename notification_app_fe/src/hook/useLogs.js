'use strict';

function useLogs(initialValue = []) {
  return {
    logs: Array.isArray(initialValue) ? initialValue : [],
  };
}

module.exports = {
  useLogs,
};

