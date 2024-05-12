import bcrypt from 'bcrypt';

// User Model
import { User } from '../models/user.js';

export async function signUp(req, res) {
    const { email, username, bio, password } = req.body;
    
    const randomId = Math.floor(Math.random() * 99999999)

    const salts = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salts);

    const newUser = new User({
        uid: randomId,
        email,
        username,
        bio,
        password: hashedPassword,
        friends: [],
        blockedFriends: []
    })

    try {
        const isUserExisted = await User.findOne({ email: email });
        const isUserNameExisted = await User.findOne({ username: username });

        if (isUserExisted) return res.status(409).json({ error: 'Email has been used', success: false });
        if (isUserNameExisted) return res.status(409).json({ error: 'Username is already taken', success: false });

        await newUser.save();

        const token = req.token;

        return res.status(200).json({ token, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
}

export async function logIn(req, res) {
    const { email, password } = req.body;

    try {
        await User.findOne({ email: email }).then(async (foundUser) => {
            if (!foundUser) return res.status(409).json({ error: 'Invalid Credentials, try register yourself!', success: false });

            const comparePass = await bcrypt.compare(password, foundUser.password);
            if (!comparePass) {
                return res.status(401).json({ error: "Invalid Credentials", success: false })
            } else {

                const token = req.token;

                return res.status(200).json({ token, success: true });
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
}

export async function getData(req, res) {
  const data = req.data;

  await User.findOne({ email: data.email }).then((foundUser) => {
    return res.status(200).json({ user: {
        uid: foundUser.uid,
        email: foundUser.email,
        username: foundUser.username,
        bio: foundUser.bio,
        joinedAt: foundUser.createdAt,
        friends: foundUser.friends,
        blockedFriends: foundUser.blockedFriends
    }, success: true });
  });
}