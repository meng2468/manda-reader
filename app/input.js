'use client'
import {useState} from 'react';

export default function InputField(){
    const [text, setText] = useState('');
    const [lines, setLines] = useState([])

    function handleSubmit(e) {
        e.preventDefault();

        if (!text) return;

        setLines([text, ...lines])
        setText('')
    }

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleClick(e){
        // Add pinyin
        console.log(e.target.innerText)
    }

    function buttons(items){
        return items.map((item, index) => (
            <button className='border-2 px-1' key={index} onClick={handleClick}>{item}</button>
        ))
    }

    return(
        <div className="flex flex-col">
            <div className="flex justify-around" id='input-field'>
                <form className='w-5/6' onSubmit={handleSubmit}>
                <input className='w-full p-2 my-6 border-4 border-lime-900 border-double' type="text" id='line-input' value={text} onChange={handleChange} onSubmit={handleSubmit} autocomplete="off"></input>
                </form>
            </div>
            <div className='mx-4' id='lines-container'>
                {lines.map((line, index) => (
                    <div className='my-2' key={index}>{buttons(line.split(''))}</div>
                ))}
            </div>
        </div>
    )
}