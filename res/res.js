'use strict';

exports.ok = (values, res) => {
    let data = {
        'status': 200,
        'values': values
    };
    res.json(data);
    res.end();
}

exports.empytvalue = (values, res) => {
    let data = {
        'status': 500,
        'values': `${values}data parameter or req is empty`
    };
    res.json(data);
    res.end();
}
exports.wrongvalue = (values, res) => {
    let data = {
        'status': 500,
        'values': 'data parameter or req is wrong'
    };
    res.json(data);
    res.end();
}

