
/**
 * Created by evio on 16/7/20.
 */
'use strict';
const Production = require('./compile/production');
const Publish = require('./compile/publish');
let result;

switch (process.env.NODE_ENV) {
    case "production":
        result = Production;
        break;
    case "publish":
        result = Publish;
        break;
}

module.exports = result;