import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom';

beforeAll(() => {
    jest.mock('./Header')
})

describe('Header component', () => {
    it('should render the title and welcome message', () => {
        render(<Router><Header /></Router>)
        expect(screen.getByText('Gomoku')).toBeInTheDocument()
        expect(screen.getByTestId('no name')).toBeInTheDocument()
    })
    it('should have Login button on home page', () => {
        render(<Router><Header /></Router>)
        expect(screen.getByText('Log In')).toBeInTheDocument()
    })
    it('should have Sign Up Button on Login Page', () => {
        render(<Router><Header /></Router>)
        const button = screen.getByText('Log In')
        fireEvent.click(button)
        expect(screen.getByText('Sign Up')).toBeInTheDocument()
    })

})







