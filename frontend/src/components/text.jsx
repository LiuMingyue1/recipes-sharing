import React from 'react';

const Text = (props) => {
    return (
       <div>
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{props.title1}</h1>
            <h5 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{props.title2}</h5>
            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">{props.text}</p>
       </div>
    );
}

export default Text;
