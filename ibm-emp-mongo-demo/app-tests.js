import supertest from "supertest"
import axios from "axios"
import { app } from "./index.js"

const require = supertest(app)

describe('this is a demo test case',()=>{

    let authToken; 


    // it('test case',()=>{

    //     expect(5+5).toBe(10)

    // })

    // it('test get api', async ()=>{

    //     const resp = await axios.get('http://localhost:3000/employees')

    //     expect(resp.status).toBe(200)

    // })

    // it('test post api', async ()=>{

    //     const postData = {
    //         'username': 'sonu',
    //         'password': 'sonu'
    //     };

    //     const resp = await axios.post('http://localhost:3000/login',postData)

    //     expect(resp.status).toBe(200)
    //     // console.log(resp)
    //     expect(resp.data.message).toBe('Login successful')


    // })


    beforeAll(async() => {
       
        const resp = await require.post('/login')
        .send({username: 'sonu',password: 'sonu'})

        expect(resp.body.message).toBe('Login successful')
        authToken =  resp.body.token;
    

    });

    // it('test post api', async ()=>{
    
    //     const resp = await require.post('/login')
    //     .send({username: 'sonu',password: 'sonu'})

    //     expect(resp.status).toBe(200)
    //     console.log(resp)
    //     expect(resp.body.message).toBe('Login successful')

    //     expect(resp.status).not.toBe(400)

    //   })

    it('test token auth', async ()=>{

        const resp = await require.get('/employees').set('Authorization', `Bearer ${authToken}`)

        expect(resp.status).toBe(200)

    })


})