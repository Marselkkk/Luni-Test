import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HomePage } from '../pages/home'

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText('Добро пожаловать!')).toBeInTheDocument()
  })
})
