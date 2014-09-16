/**
 * Created by yexiaoyi on 14-9-12.
 */
/**
 * Created by yexiaoyi on 14-9-11.
 */
var EventProxy = require('eventproxy');
var CategoryAD = require('../models').CategoryAD;


exports.getByHash = function(hash, callback){
    var query = CategoryAD.find({'category_hash': hash})
        .sort('_id','descending');
    query.exec(callback);
};



exports.importTestData = function(items, callback){
    var ep = new EventProxy();
    var importCount = items.length;
    var item;
    ep.after('items', importCount, callback);
    for (var i = 0; i < importCount; i++) {
        item = new CategoryAD();
        item.category_hash = items[i].category_hash;
        item.name = items[i].name;
        item.save(ep.group('items'));
    }
};

exports.clear = function(callback){
    CategoryAD.remove(callback);
};