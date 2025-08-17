import React from 'react'

const Username = ({ params }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Welcome {params.username}</h1>
            <p className="text-center">Here you can manage your account settings, view your contributions, and more.</p>
        </div>
    )
}

export default Username