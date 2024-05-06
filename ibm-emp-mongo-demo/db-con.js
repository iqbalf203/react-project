import mongoose, { mongo } from 'mongoose';

const connectionString = 'mongodb://localhost:27017';
const databaseName = 'ibm';

mongoose.connect(`${connectionString}/${databaseName}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String
});

const adminSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    phone : Number,
    role: String,
    avatar: String


})

const Employee = mongoose.model('Employee', employeeSchema);
const Admin = mongoose.model('Admin',adminSchema)

export { Employee,Admin };