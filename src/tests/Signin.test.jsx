import { fireEvent, render, screen } from '@testing-library/react';
import Signin from '../pages/user/Signin';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import {shallow} from 'enzyme';
import { setupTest } from '../setupTest';


setupTest();

test("it should contain 'Email','Password','button' and two 'links' ",
() => {
    render(
            <Router>
                 <Signin />
            </Router>
        );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput =  screen.getByLabelText(/password/i);
    const button = screen.getByText("Submit");
    const forgotPassword = screen.getByText("Forgot Password?");
    const signup = screen.getByText("Sign-up");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(forgotPassword).toBeInTheDocument();
    expect(signup).toBeInTheDocument();


})

test("with valid inputs,calls the handleSubmit function", async () => {
    
        const component = shallow(
            <Signin  />
        );
        const testValues = {
            email: 'email@test.com',
            password: '1234567',
        };
        const{email, password} = testValues;
        const handleSubmit = jest.fn();
    
            component.find('input[type="email"]').simulate("change", {target: {name: "email", 
            value: {email}}});
            component.find('input[type="password"]').simulate("change", {target: {name: "password", 
            value: {password}}});
        
            component.find('input[type="submit"]').simulate("click",handleSubmit(testValues));
    
            expect(handleSubmit).toHaveBeenCalled();
            expect(handleSubmit).toBeCalledWith({email: testValues.email, password: testValues.password});
        
    
})

// test("with invalid email,renders the email validation error", () => {
    
// })

// test("with invalid password,renders the password validation error", () => {
      
// })