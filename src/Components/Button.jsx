import React from "react";
import './Button.css';

export default props => 
    /*
        Por default, atribui a class button e checa se á um atributo seguinte:
        props.operation ? se houver a classe CSS assumida é .button.operation, se não, somente .button
        Se não houver, passa vazio e não busca a classe CSS
    */
    <button 
        onClick={e => props.click && props.click(props.label)}    
        className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}>
        {props.label}
    </button>