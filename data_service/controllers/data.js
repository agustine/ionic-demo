/**
 * Created by yexiaoyi on 14-9-11.
 */
var Category = require('../proxy').Category;
var Item = require('../proxy').Item;
var CategoryAD = require('../proxy').CategoryAD;
var ItemComment = require('../proxy').ItemComment;
var EventProxy = require('eventproxy');

var getRes = function(data){
    return {
        success: true,
        message: '',
        data: data
    };
};

var getErrorRes = function(err){
    return {
        success: false,
        message: err.toString()
    };
};

exports.categories = function(req, res, next){
    Category.list(function(err, categories){
        if(err){
            return res.status(500).jsonp(getErrorRes(err));
        }
        res.jsonp(getRes(categories));
    });
};

exports.category = function(req, res, next){
    var ep = EventProxy.create("category", "ads", function (category, ads) {
        res.jsonp(getRes({
            category: category,
            ads: ads
        }));
    });
    ep.bind('error', function (err) {
        ep.unbind();
        return res.status(500).jsonp(getErrorRes(err));
    });
    Category.getByHash(req.query.hash, function(err, category){
        if(err){
            return ep.emit('error', err);
        }
        ep.emit('category', category);
    });
    CategoryAD.getByHash(req.query.hash, function(err, ads){
        if(err){
            return ep.emit('error', err);
        }
        ep.emit('ads', ads);
    });
};

exports.items = function(req, res, next){
    var pno = parseInt(req.query.pno);
    var ep = EventProxy.create("data", "count", function (data, pcount) {
        res.jsonp(getRes({
            pno: pno,
            data: data,
            pageCount: pcount
        }));
    });
    ep.bind('error', function (err) {
        ep.unbind();
        return res.status(500).jsonp(getErrorRes(err));
    });
    Item.pageData(req.query.hash, pno, function(err, items){
        if(err){
            return ep.emit('error', err);
        }
        ep.emit('data', items);
    });
    Item.pageCount(req.query.hash, function(err, count){
        if(err){
            return ep.emit('error', err);
        }
        ep.emit('count', count);
    });
};

exports.item = function(req, res, next){
    Item.getById(req.query.id, function(err, item){
        if(err)
            return res.status(500).jsonp(getErrorRes(err));
        res.jsonp(getRes(item));
    });
};

exports.comments = function(req, res, next){
    var pno = parseInt(req.query.pno);
    var ep = EventProxy.create("data", "count", function (data, pcount) {
        res.jsonp(getRes({
            pno: pno,
            data: data,
            pageCount: pcount
        }));
    });
    ep.bind('error', function (err) {
        ep.unbind();
        return res.status(500).jsonp(getErrorRes(err));
    });
    ItemComment.pageData(req.query.id, pno, function(err, comments){
        if(err){
            return ep.emit('error', err);
        }
        ep.emit('data', comments);
    });
    ItemComment.pageCount(req.query.id, function(err, count){
        if(err){
            return ep.emit('error', err);
        }
        ep.emit('count', count);
    });
};

exports.comment = function(req, res, next){
    var id = req.param('id');
    var content = req.param('content');
    ItemComment.new(id, content, function(err, comment){
        if(err){
            console.log(err);
            return res.status(500).jsonp(getErrorRes(err));
        }
        res.jsonp(getRes(comment));
    });
};
