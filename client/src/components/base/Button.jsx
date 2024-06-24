const Button = ({ text, onClick, variant = 'primary' }) => {
    const baseStyle = 'block text-sm font-semibold px-4 py-2 mx-auto mt-4 rounded-full border-2 border-dashed border-gray-400 hover:bg-transparent hover:text-gray-500';
    
    const variantStyle = {
        hover: 'hover:bg-transparent hover:text-gray-500',
        primary: 'bg-gray-400 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-700',
    };
  
    return (
      <button className={`${baseStyle} ${variantStyle[variant]}`} onClick={onClick}>
        {text}
      </button>
    );
  };