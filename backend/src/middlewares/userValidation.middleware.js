// middleware de validation des données user

export const validationUserData = (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: "Missing required user data" });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    next();
};

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
