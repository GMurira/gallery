var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://geoffreymurira:Moringaip1@gmuriragallery.pscy2mh.mongodb.net/darkroom?retryWrites=true&w=majority&appName=GMuriraGallery',
    development: 'mongodb+srv://geoffreymurira:Moringaip1@gmuriragallery.pscy2mh.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=GMuriraGallery',
    test: 'mongodb+srv://geoffreymurira:Moringaip1@gmuriragallery.pscy2mh.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=GMuriraGallery',
}
module.exports = config