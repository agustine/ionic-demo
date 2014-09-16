/**
 * Created by yexiaoyi on 14-9-11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    master_id: { type: ObjectId },
    main_photo: { type: String, required: true, default: 'http://placehold.it/80x80' },
    category_hash: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, default: '' },
    like: { type: Number, required: true, default: 0 },
    hate: { type: Number, required: true, default: 0 },
    create_at: { type: Date, default: Date.now }
});

ItemSchema.index({master_id: 1, create_at: -1});

mongoose.model('Item', ItemSchema);