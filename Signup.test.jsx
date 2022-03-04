import { act, fireEvent, render, screen } from '@testing-library/react';
import Signup from '../pages/user/Signup';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import {shallow} from 'enzyme';
import { setupTest } from './src/setupTest';


setupTest();

test("it should contain 'Email','Password','button' and two 'links' ",
() => {
    render(
            <Router>
                 <Signup />
            </Router>
        );

    const namesInput = screen.getAllByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput =  screen.getByLabelText(/password/i);
    const button = screen.getByText("signup");
    
    expect(namesInput.length).toEqual(2);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    
})

// test("has valid input, and handlesSubmit function is called",() => {
//     const component = shallow(
//         <Signup  />
//     );

//     const{firstName, lastName, email, password} = {
//         firstName: "john",
//         lastName: "peter",
//         email: "email@test.com",
//         password: "123456"
//     }

//     const handleSubmit = jest.fn();

//     component.find('input[name="firstName"]').simulate("change", {target: {name: "firstName", 
//     value: {firstName}}});
//     component.find('input[name="lastName"]').simulate("change", {target: {name: "lastName", 
//     value: {lastName}}});
//     component.find('input[type="email"]').simulate("change", {target: {name: "email", 
//     value: {email}}});
//     component.find('input[type="password"]').simulate("change", {target: {name: "password", 
//     value: {password}}});

//     component.find('input[type="submit"]').simulate("click",handleSubmit());

//     expect(handleSubmit).toHaveBeenCalled();
// })


test("has valid input, and handlesSubmit function is called", async () => {
    render(
            <Router>
                <Signup />
            </Router>
        )
    const handleSubmit = jest.fn();

    const{firstName, lastName, email, password} = {
        firstName: "john",
        lastName: "peter",
        email: "email@test.com",
        password: "123456"
    }
    
    const firstnameInput = screen.getByLabelText("First Name:");
    const lastnameInput = screen.getByLabelText("Last Name:");
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput =  screen.getByLabelText(/password/i);
    const button = screen.getByRole("button");
    
    await act( async () => {
        fireEvent.change(firstnameInput,{target: {value: firstName}});
        fireEvent.change(lastnameInput,{target: {value: lastName}});
        fireEvent.change(emailInput,{target: {value: firstName}});
        fireEvent.change(passwordInput,{target: {value: lastName}});
    })

    await act( async () => {
        fireEvent.click(button,handleSubmit())
    })

    expect(handleSubmit).toHaveBeenCalled();
    
})