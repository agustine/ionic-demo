/**
 * Created by yexiaoyi on 14-9-12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategoryADSchema = new Schema({
    master_id: { type: ObjectId },
    img: { type: String, required: true, default: 'http://placehold.it/320x200' },
    url: { type: String, required: true, default: 'http://www.sina.com.cn' },
    category_hash: { type: String, required: true },
    name: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
});

CategoryADSchema.index({master_id: 1, create_at: -1});

mongoose.model('CategoryAD', CategoryADSchema);