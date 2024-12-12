import React from 'react';

const Button = ({label}) => {
    return (
        <div>
            <button type="button" id="button" class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300">
                {label}
            </button>
        </div>
    );
}

export default Button;
