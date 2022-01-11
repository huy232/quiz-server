class ContactController {
    index(req, res){
        res.render ('contact')
    }
}
module.exports = new ContactController;
