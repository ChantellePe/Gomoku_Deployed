import React from 'react'
import { render, screen } from '@testing-library/react'
import Logout from './logout'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}))

const mockUseContext = jest.fn()
React.useContext = mockUseContext

describe('Log out button', () => {
    it('should appear on the page if the user is logged in', () => {
        mockUseContext.mockReturnValue({ user: { username: 'user' } })
        render(<Logout />)
        expect(screen.getByText('Log out')).toBeInTheDocument()
    })
    it('should not appear on the page if the user is not logged in', () => {
        mockUseContext.mockReturnValue({ user: undefined })
        render(<Logout />)
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
})

afterEach(() => {
    mockUseContext.mockReset()
})
