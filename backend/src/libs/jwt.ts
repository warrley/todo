import jwt from "jsonwebtoken";

export const createJWT = (id: number, name: string) => {
    const token = jwt.sign(
        { id: id, name: name },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
    );

    return token
};

export const readJWT = (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);

    return decoded;
}