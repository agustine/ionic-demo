/**
 * Created by yexiaoyi on 14-9-11.
 */
/**
 * Created by yexiaoyi on 14-9-11.
 */
var Category = require('../proxy').Category;
var CategoryAD = require('../proxy').CategoryAD;
var Item = require('../proxy').Item;
var EventProxy = require('eventproxy');


var categoriesData = [
    {
        name: '优惠',
        hash: 'sales'
    },
    {
        name: '海淘',
        hash: 'seawashes'
    },
    {
        name: '最新',
        hash: 'new'
    }
];

var getRandomPrice = function (){
    return (Math.random() * 10000).toFixed(2) + '元包邮';
};

var getRandomHash = function (){
    var rand = Math.floor(Math.random() * categoriesData.length);
    return categoriesData[rand].hash;
};

var getItemsData = function (){
    var itemCount = 1000;
    var items = [];
    for(var i = 0; i < itemCount; i++){
        items.push({
            name: '商品' + i.toString(),
            price: getRandomPrice(),
            category_hash: getRandomHash()
        });
    }
    return items;
};

var getAdsData = function(){
    var itemCount = 25;
    var items = [];
    for(var i = 0; i < itemCount; i++){
        items.push({
            name: '广告' + i.toString(),
            category_hash: getRandomHash()
        });
    }
    return items;
};

exports.init = function(req, res, next){
    var ep = EventProxy.create("categories", "items", "ads", function (categories, items, ads) {
        res.send('init success');
    });
    ep.bind('error', function (err) {
        ep.unbind();
        res.send(err);
    });


    Category.clear(function(err){
        if(err){
            return ep.emit('error', err);
        }
        Category.importTestData(categoriesData, function(err){
            if(err){
                return ep.emit('error', err);
            }
            ep.emit('categories', '');
        });
    });

    CategoryAD.clear(function(err){
        if(err){
            return ep.emit('error', err);
        }
        CategoryAD.importTestData(getAdsData(), function(err){
            if(err){
                return ep.emit('error', err);
            }
            ep.emit('ads', '');
        });
    });

    Item.clear(function(err){
        if(err){
            return ep.emit('error', err);
        }
        Item.importTestData(getItemsData(), function(err){
            if(err){
                return ep.emit('error', err);
            }
            ep.emit('items', '');
        });
    });

};