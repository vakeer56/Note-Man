import userRepository from "../repositories/user.repository.js";

class AuthService {

    async loginWithGoogle(profile) {

        let user = await userRepository.findByGoogleId(profile.id);

        if (user) {
            return user;
        }

        user = await userRepository.createUser( {

            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.given_name || profile.displayName,
            lastName: profile.name.family_name || "",
            provider: "google"
        });

        return user;
    }

    async getUserById(id) {

        return userRepository.findById(id);
    }
}

export default new AuthService();