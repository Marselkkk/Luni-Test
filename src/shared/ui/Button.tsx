import React from 'react'

export interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'outline'
    disabled?: boolean
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
    type = 'button'
}) => {
    const baseClasses = 'py-3 px-4 font-semibold leading-[20px] text-[16px] transition-colors rounded-lg'
    
    const variantClasses = {
        primary: 'bg-[#282A33] text-white hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed',
        outline: 'bg-white border border-[#282A33] text-[#282A33] hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed'
    }
    
    const classes = `
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
    `.trim().replace(/\s+/g, ' ')
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    )
}

Button.displayName = 'Button'

export { Button }
