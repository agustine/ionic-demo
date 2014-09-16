/**
 * Created by yexiaoyi on 14-9-15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemCommentSchema = new Schema({
    master_id: { type: ObjectId },
    item_id: { type: ObjectId, required: true },
    content: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
});

ItemCommentSchema.index({master_id: 1, create_at: -1});

mongoose.model('ItemComment', ItemCommentSchema);