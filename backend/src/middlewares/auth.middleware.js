
export default (req, res, next) => {
    if (!req.session.user || !req.session.user.idAdmin) {
        res.status(403).json({ message: "Not allowed to do this action !" });
        return;
    }
    if (req.session.isAdmin) {
        next();
    }
};
