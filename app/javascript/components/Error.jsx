import React from 'react'
import { Link } from "react-router-dom";

export default function Error() {
    return <><div style={{position:'absolute', top:0}} class="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap">
        <p class="font-sans text-white error-text">404</p>
    </div>

        <div class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
            <span class="opacity-50">Take me back to </span>
            <Link class="border-b" to="/">Home</Link>
        </div></>
}