import { useState } from 'react';

export default function Test(url){
    const [code, setCode] = useState("");
    setCode(url);
    return code;
}