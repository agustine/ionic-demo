/**
 * Created by yexiaoyi on 14-9-11.
 */
var EventProxy = require('eventproxy');
var Category = require('../models').Category;
var util = require('util');

exports.list = function(callback){
    var ep = EventProxy.create("categories", function (categories) {
        callback(null, categories);
    });
    ep.bind('error', function (err) {
        ep.unbind();
        callback(err);
    });
    Category.find(function (err, docs) {
        if(err)
            return ep.emit('error', err);
        ep.emit('categories', docs);
    });
};


exports.getByHash = function(hash, callback){
    var ep = EventProxy.create("category", function (category) {
        callback(null, category);
    });
    ep.bind('error', function (err) {
        ep.unbind();
        callback(err);
    });
    Category.findOne({ hash: hash }, function (err, doc) {
        if(err)
            return ep.emit('error', err);
        ep.emit('category', doc);
    });
};

exports.clear = function(callback){
    Category.remove(callback);
};

exports.importTestData = function(categories, callback){
    var ep = new EventProxy();
    var importCount = categories.length;
    var category;
    ep.after('categories', importCount, function () {
        callback();
    });
    for (var i = 0; i < importCount; i++) {
        category = categories[i];
        this.new(category.name, category.hash, ep.group('categories'));
    }
};

exports.new = function(name, hash, callback){
    var category = new Category();
    category.name = name;
    category.hash = hash;
    category.save(function(err){
        if(err){
            console.log(typeof err);
            callback(err);
            return;
        }
        callback();
    });
};