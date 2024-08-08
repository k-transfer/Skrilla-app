import User, { findOne } from '../models/user';

// Register a new user
export async function register(req, res) {
    try {
        const { name, email. password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Login in user logic
export async function login(req, res){ return ; }
try {
    const { email, password } = req.body;
    const user = await findOne({ email, password });
    if (!user) {
        return res.status(400).json({ error: err.message });
    }
}

// Transfer Money
exports.transfer = async (req, res) => {
    try {
      const { fromEmail, toEmail, amount } = req.body;
      const fromUser = await User.findOne({ email: fromEmail });
      const toUser = await User.findOne({ email: toEmail });
  
      if (!fromUser || !toUser) {
        return res.status(404).json({ error: 'User not found' });
}

if (fromUser.balance < amount) {
  return res.status(400).json({ error: 'Insufficient funds' });
}

fromUser.balance -= amount;
toUser.balance += amount;

await fromUser.save();
await toUser.save();

res.status(200).json({ message: 'Transfer successful' });
} catch (err) {
res.status(500).json({ error: err.message });
}
};