export const passwordPatterns = {
  middleStrength: new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$'
  ),
};
