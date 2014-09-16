/**
 * Created by yexiaoyi on 14-9-12.
 */

this["$mine"] = this["$mine"] || {};

$mine.env = 'development';
// $mine.env = 'production';


$mine.ajax = {
    root: $mine.env === 'development' ?
        'http://192.168.199.193:3000/' : 'http://192.168.199.193:3000/',
    dataType: $mine.env === 'development' ? 'jsonp' : 'json',
    url: function(name){
        return this.root + name;
    }
};

