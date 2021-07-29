const ProfilesRepository = require("./repositories/ProfilesRepository");
const UsersRepository = require("./repositories/UsersRepository");
const Profile = require("./entities/Profile");
const User = require("./entities/User");

const profilesRepository = new ProfilesRepository();
const usersRepository = new UsersRepository();

module.exports = {
  profilesRepository,
  usersRepository,

  Profile,
  User,
};
