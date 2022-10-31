exports.list = async (req, res) => {
    console.log(req.url);
    res.send(req.url);
}

exports.delete = async () => {
    console.log(req.url);
    res.send(req.url);
}