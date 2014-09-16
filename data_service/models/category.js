/**
 * Created by yexiaoyi on 14-9-11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
    master_id: { type: ObjectId },
    hash: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    show: { type: Boolean, default: true },
    create_at: { type: Date, default: Date.now }
});

CategorySchema.index({master_id: 1, create_at: -1});

mongoose.model('Category', CategorySchema);
