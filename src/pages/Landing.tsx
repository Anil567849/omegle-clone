import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Landing() {
    const [name, setName] = useState("");

    return (
        <div>
            <h1>Welcome to sasta Omegle</h1>
            <div>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                <Link to={`/room?name=${name}`} >Join Now</Link>
            </div>
        </div>
    )
}

export default Landing