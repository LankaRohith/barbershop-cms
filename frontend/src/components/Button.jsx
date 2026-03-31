const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-barber-gold text-barber-900 hover:bg-barber-gold-light',
    secondary: 'border-2 border-barber-gold text-barber-gold hover:bg-barber-gold hover:text-barber-900',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-400 hover:text-white hover:bg-barber-700',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
