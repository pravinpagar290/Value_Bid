export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  const cookieDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 7;
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user: userObj,
      token,
    });
};
