/**
 * Created by yexiaoyi on 14-9-11.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./category');
require('./item');
require('./category_ad');
require('./item_comment');

exports.Category = mongoose.model('Category');
exports.CategoryAD = mongoose.model('CategoryAD');
exports.Item = mongoose.model('Item');
exports.ItemComment = mongoose.model('ItemComment');