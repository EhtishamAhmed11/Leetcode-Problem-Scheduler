const createTokenUser = (user) => {
  return { username: user.username, userId: user._id, email: user.email };
};

export default createTokenUser;
