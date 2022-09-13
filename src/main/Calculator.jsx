import React, { Component } from 'react';
import './Calculator.css';

import Button from '../Components/Button';
import Display from '../Components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}
export default class Calculator extends Component {

    //inicia com o estado zerado - herda as propriedades de initialState;
    state = {...initialState}

    constructor(props){
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    clearMemory(){
        //retorna o objeto ao estado inicial
        this.setState({...initialState});
    }

    setOperation(operation){
        if (this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true })
        }else{
            const igualdade = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }catch(e){
                values[0] = this.state.values[0];
            }
            
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: igualdade ? null : operation,
                current: igualdade ? 0 : 1,
                clearDisplay: !igualdade,
                values
            })
        }
    }

    addDigit(n){
        //Quando já houver ponto no display, nada acontecerá
        if(n === '.' && this.state.displayValue.includes('.')){
            return 
        }

        //Condição de limpeza do display quando houver 0 e quando for setado 'true' para limpar
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        
        //Se precisar limpar o display, o valor corrente será vazio, se não, será o valor atual
        const currentValeu = clearDisplay ? '' : this.state.displayValue

        //Inclusão de novos valores, com o valor corrente
        const displayValue = currentValeu + n

        //Alteração do estado
        this.setState({displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue;
            this.setState({values});
            console.log(values);
        }
    }

    //Renderização do componente
    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}