import React, {useState, useContext} from 'react';
import { TextField, Switch, Button, FormControlLabel } from '@material-ui/core';
import ValidacoesCadastro from '../../contexts/ValidacoesCadastro';
import useErros from '../../hooks/useErros';

function DadosPessoais({aoEnviar}){
    const validacoes = useContext(ValidacoesCadastro)
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [promocoes, setPromocoes] = useState(true);
    const [novidades, setNovidade] = useState(true);
    const [erros, validarCampos, possoEnviar] = useErros(validacoes);

    return(
        <form 
            onSubmit={(event) =>{
                event.preventDefault();
                if(possoEnviar()){
                    aoEnviar({nome, sobrenome, cpf, novidades, promocoes})
                }
            }}>
         <TextField
                value = {nome} 
                onChange={(event) => {
                    setNome(event.target.value);
                    }}
                onBlur={validarCampos}
                error={!erros.nome.valido}
                helperText={erros.nome.texto}
                id="nome"
                name="nome" 
                label="Nome" 
                variant="outlined" 
                fullWidth
                margin="normal" />
            
            <TextField 
                value = {sobrenome}
                onChange= {(event) =>{
                    setSobrenome(event.target.value);
                }}
                id="sobrenome"
                name="sobrenome" 
                label="Sobrenome" 
                variant="outlined" 
                fullWidth 
                margin="normal"/>

            <TextField 
                id="cpf"
                onChange={(event) => {
                    setCpf(event.target.value);
                  }}
                onBlur= {validarCampos}
                error = {!erros.cpf.valido}
                helperText={erros.cpf.texto}
                name="cpf"
                label="CPF" 
                variant="outlined" 
                fullWidth 
                margin="normal"/>

            <FormControlLabel 
                label="Promoções"
                checked= {promocoes} 
                control = { <Switch onChange = {(event) =>{
                    setPromocoes(event.target.checked)
                }}
                name="promoções" 
                color="primary"/>}
            />
            <FormControlLabel 
                label="Novidades" 
                checked= {novidades} 
                control = { <Switch onChange = {(event) =>{
                    setNovidade(event.target.checked)
                }}
                name="novidades" 
                color="primary"/>}
            />
            <Button type="submit" variant="contained" color="primary">Próximo</Button>
        </form>
    );
}

export default DadosPessoais;