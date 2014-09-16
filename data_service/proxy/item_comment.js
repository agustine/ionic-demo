/**
 * Created by yexiaoyi on 14-9-15.
 */
var EventProxy = require('eventproxy');
var ItemComment = require('../models').ItemComment;

var pageSize = 5;

exports.pageData = function(itemId, pno, callback){
    var skip = pageSize * (pno - 1);
    var query = ItemComment.find({'item_id': itemId})
        .sort('_id','descending')
        .limit(pageSize)
        .skip(skip);
    query.exec(callback);
};

exports.pageCount = function(itemId, callback){
    ItemComment.count({ item_id: itemId }, function (err, count) {
        var pageCount;
        if (err){
            callback(err);
        }
        pageCount = Math.ceil(parseFloat(count) / pageSize);
        callback(null, pageCount);
    });
};

exports.new = function(itemId, content, callback){
    var comment = new ItemComment();
    comment.item_id = itemId;
    comment.content = content;
    comment.save(callback);
};