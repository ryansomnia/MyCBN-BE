'use strict';

exports.ok = (values, res) => {
    let data = {
        'status': 200,
        'message' :'success',
        'values': values
    };
    res.json(data);
    res.end();
}

exports.checknumber = (data) => {
    let reg = new RegExp('^[0-9]+$')
    if (!reg.test(data)) {
        return true
    } else {
        return false
    }
}



exports.empytvalue = (values, res) => {
    let data = {
        'status': 422,
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

