odoo.define('pos_barcode_order.receipt_barcode', function (require) {
"use strict";

const { Gui } = require('point_of_sale.Gui');
var models = require('point_of_sale.models');
var rpc = require('web.rpc');
var session = require('web.session');
var core = require('web.core');
var utils = require('web.utils');

var _t = core._t;
var round_di = utils.round_decimals;


var _super_order = models.Order.prototype;
models.Order = models.Order.extend({
    export_for_printing: function() {
        var result = _super_order.export_for_printing.apply(this, arguments);
        let qr_values = this.compute_order_qr_code(result.name);
        const codeWriter = new window.ZXing.BrowserQRCodeSvgWriter();
      let qr_code_svg = new XMLSerializer().serializeToString(codeWriter.write(result.name, 150, 150));
      result.pos_reference_barcode = "data:image/svg+xml;base64,"+ window.btoa(qr_code_svg);
      return result;
    },
    compute_order_qr_code(pos_reference) {
        const order_number = this._compute_qr_code_field(1, pos_reference);
        return btoa(order_number);
    },

    _compute_qr_code_field(tag, field) {
        const textEncoder = new TextEncoder();
        const name_byte_array = Array.from(textEncoder.encode(field));
        const name_tag_encoding = [tag];
        const name_length_encoding = [name_byte_array.length];
        return name_tag_encoding.concat(name_length_encoding, name_byte_array);
    },

});

});