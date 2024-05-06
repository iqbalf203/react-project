import express from 'express';
import multer from 'multer';
import { authenticateJWT, generateToken } from './auth.js';
import { Employee, Admin } from './db-con.js';
import { sendEmail } from './send-email.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

export {app}

const upload = multer({ dest: 'uploads/' }); // 

app.use(cors())
app.use(express.json());
app.use(authenticateJWT);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/employees', (req, res) => {

    Employee.find().sort({ [req.query.sortBy] :'asc'}).skip(req.query.page).limit(req.query.limit)
        .then(employees => {
            res.json(employees);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
        });

});

app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    Employee.findById(employeeId)
        .then(employee => {
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to fetch employee', error: err.message });
        });
});

app.get('/adminProfile/:id',(req,res)=>{
    const id = req.params.id
    Admin.findById(id).then((resp)=>{
        if(resp){
        res.json(resp)
        }
        else{
            res.status(500).json({ message: 'Admin not found' })
        }
}).catch(err => {
    res.status(500).json({ message: 'Failed to fetch admin', error: err.message });
});
})

app.put('/adminProfile/:id', (req, res) => {
    const id = req.params.id;
    const updatedAdmin = req.body;
    Admin.findByIdAndUpdate(id, updatedAdmin, { new: true })
        .then(admin => {
            if (admin) {
                res.json({ message: 'Admin updated successfully', admin});
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update admin', error: err.message });
        });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
   

    Admin.findOne({username:username}).then((resp)=>{
        if(resp){
       const user = resp.username;
       const pass = resp.password;
       const id   = resp.id;
    
    if (username === user && password === pass) {
        const token = generateToken({ username });
        res.json({ message: 'Login successful', token, id:id });
    }
    else{
        res.status(401).json({ message: 'Invalid credentials' });
    }
}else {
    res.status(401).json({ message: 'Invalid credentials' });
    // throw new Error("Invalid credentials");
}   
})
});

app.post('/employees', upload.single('avatar'),async (req, res) => {
    const newEmployee = req.body;
    try {
        const avatar = (req.file && req.file.filename) ? req.file.filename : null;
        const { name, email } = req.body;
        const newEmployee = new Employee({ name, email, avatar });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Failed to create employee', error: err.message });
    }
});

app.put('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true })
        .then(employee => {
            if (employee) {
                res.json({ message: 'Employee updated successfully', employee });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update employee', error: err.message });
        });
});

app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    Employee.findByIdAndDelete(employeeId)
        .then(employee => {
            if (employee) {
                res.json({ message: 'Employee deleted successfully' });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete employee', error: err.message });
        });

    });

app.post('/email',(req,res) => {
   const {eTo,eSubject,eText} = req.body
    sendEmail(eTo,eSubject,eText).then((resp)=>{
        res.send(resp)
    }).catch((err)=>{
        res.send(err)
    })
})

