exports.list = async (req, res) => {
    console.log(req.method);
    res.send('list');
}

exports.delete = async (req, res) => {
    console.log(req.method);
    res.send('delete');
}

exports.register = async (req, res) => {
    console.log(req.body);
    res.send('register');
}