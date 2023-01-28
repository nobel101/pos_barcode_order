{
    'name': 'POS Barcode Order Number',
    'version': '0.1',
    'summary': 'adding the point of sale oder number as a barcode to the receipt',
    'description': 'adding the point of sale oder number as a barcode to the receipt',
    'category': 'Uncategorized',
    'depends': ['point_of_sale'],
    'data': [],
    'assets': {
        'point_of_sale.assets': [
            'web/static/lib/zxing-library/zxing-library.js',
            'pos_barcode_order/static/src/js/pos_receipt_barcode.js',
        ],
        'web.assets_qweb': [
            'pos_barcode_order/static/src/xml/receipt_order_number.xml',
        ],
    },
    'external_dependencies': {
        'python': ['barcode'],
    },
}
