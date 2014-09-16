/**
 * Created by yexiaoyi on 14-9-11.
 */
var EventProxy = require('eventproxy');
var Item = require('../models').Item;

var Category = require('../proxy').Category;
var pageSize = 20;

exports.pageData = function(hash, pno, callback){
    var skip = pageSize * (pno - 1);
    var query = Item.find({'category_hash': hash})
        .sort('_id','descending')
        .limit(pageSize)
        .skip(skip);
    console.log(query);
    query.exec(callback);
};

exports.pageCount = function(hash, callback){
    Item.count({ category_hash: hash }, function (err, count) {
        var pageCount;
        if (err){
            callback(err);
        }
        pageCount = Math.ceil(parseFloat(count) / pageSize);
        callback(null, pageCount);
    });
};

exports.getById = function(id, callback){
    var ep = EventProxy.create("item", function (item) {
        Category.getByHash(item.category_hash, function(err, category){
            if(err)
                return callback(err);

            callback(null, {
                item: item,
                category: category
            });
        });
    });
    ep.bind('error', function (err) {
        ep.unbind();
        callback(err);
    });
    Item.findOne({_id: id}, function(err, item){
        if(err)
            return ep.emit('error', err);
        ep.emit('item', item);
    });
};

exports.importTestData = function(items, callback){
    var ep = new EventProxy();
    var importCount = items.length;
    var item;
    ep.after('items', importCount, callback);
    for (var i = 0; i < importCount; i++) {
        item = new Item();
        item.category_hash = items[i].category_hash;
        item.name = items[i].name;
        item.price = items[i].price;
        item.save(ep.group('items'));
    }
};

exports.clear = function(callback){
    Item.remove(callback);
};