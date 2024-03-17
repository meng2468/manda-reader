'use client'
import {useState} from 'react';

export default function InputField(){
    const [text, setText] = useState('');
    const [lines, setLines] = useState([
        {
            'line':'大家好', 
            'pinyin': ['','','']}
    ])

    function getPinyin(text){
        return (text.split('').map((char) => {
            return ''
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!text) return;

        setLines([{'line':text, 'pinyin': getPinyin(text)}, ...lines])
        setText('')
        console.log(lines)
    }

    function handleChange(e) {
        setText(e.target.value);
        console.log(e.target.value)
    }

    async function callApi(char, line_num, index) {
        const url = 'http://127.0.0.1:8000/items/'+char;
        fetch(url)
            .then(response => {
            // Check if the request was successful
                if (response.ok) {
                    return response.json(); // Parse JSON response and pass it to the next .then()
            }}).then(data => {
                console.log('Logging data', data)
                let newLines = [...lines]
                newLines[line_num]['pinyin'][index] = data['data']['pinyin']
                setLines(newLines)
                return data['data']['pinyin']
            })
    }

    function handleClick(e,index, line_num){
        callApi(e.target.innerText, line_num, index)
    }

    function buttons(items, line_num){
        console.log(items)

        const numCharacters = items['line'].length % 10;
        const style = 'grid grid-cols-'+numCharacters
        console.log(style)

        const buttons =  items['line'].split('').map((item, index) => (
                <button key={index} className='w-24 border-2 px-1' onClick={(e) => handleClick(e,index, line_num)}>{item}</button>
        ))
        const pinyin = items['pinyin'].map((item, index) => (
            <span key={index} className='w-24 border-2 px-1'>{item}</span>
        ))

        return(
            <div className={style}>
                {pinyin}
                {buttons}
            </div>
        )
    }

    return(
        <div className="flex flex-col">
            <div className="flex justify-around" id='input-field'>
                <form className='w-5/6' onSubmit={handleSubmit}>
                <input className='w-full p-2 my-6 border-4 border-lime-900 border-double' type="text" id='line-input' value={text} onChange={handleChange} onSubmit={handleSubmit} autoComplete="off"></input>
                </form>
            </div>
            <div className='mx-4' id='lines-container'>
                {lines.map((line, index) => (
                    <div className='my-2' key={index}>{buttons(line, index)}</div>
                ))}
            </div>
        </div>
    )
}