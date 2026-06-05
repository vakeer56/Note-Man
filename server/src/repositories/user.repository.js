import User from "../models/user.model.js";

class UserRepository {

    async findByGoogleId(googleId) {
        return User.findOne( { googleId } );
    }

    async findById(id) {
        return User.findById(id);
    }

    async createUser( userData ) {
        return User.create(userData)
    }

}

export default new UserRepository;