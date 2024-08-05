import React, { useContext, useState, useEffect } from 'react';
import { CarrinhoContext } from '../components/CarrinhoContext';
import './Carrinho.css';

const Carrinho = ({ isOpen, onClose }) => {
  const { itens, calcularTotal, removerItem, aplicarCupom, removerCupom, cupom } = useContext(CarrinhoContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [codigoCupom, setCodigoCupom] = useState('');

  useEffect(() => {
    if (codigoCupom) {
      aplicarCupom(codigoCupom);
    } else {
      removerCupom();
    }
  }, [codigoCupom, aplicarCupom, removerCupom]);

  const handleFinalizarCompra = () => {
    setIsFormOpen(true);
  };

  const handleEnviar = () => {
    const itensMensagem = itens.map(item => 
      `Camisa: ${item.time} - 
      Tamanho: ${item.tamanho}
      Quantidade: ${item.quantidade}
      Personalização: ${item.personalizacao ? `
      Nome: ${item.nome} 
      Numero: ${item.numero}` : 'N/A'}`
    ).join('/');

    const mensagem = `Olá, gostaria de finalizar a compra:
    ${itensMensagem}
    Total: R$ ${calcularTotal().toFixed(2)}

    Informações do usuário:
    Nome: ${nome}
    E-mail: ${email}
    Telefone: ${telefone}
    CEP: ${cep}`;

    const numeroWhatsApp = '5511964879739'; // Substitua pelo seu número de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  };

  const handleCodigoCupomChange = (e) => {
    setCodigoCupom(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="carrinho-container">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Carrinho</h2>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul>
          {itens.map((item, index) => (
            <li key={index}>
              <div>
                <p>{item.time}</p>
                <p>Preço: R${item.preco}</p>
                <p>Quantidade: {item.quantidade}</p>
                <p>Tamanho: {item.tamanho}</p>
                {item.personalizacao && (
                  <>
                    <p>Nome: {item.nome}</p>
                    <p>Número: {item.numero}</p>
                  </>
                )}
                <button onClick={() => removerItem(index)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cupom-container">
        <input
          type="text"
          placeholder="Código do cupom"
          value={codigoCupom}
          onChange={handleCodigoCupomChange}
        />

      </div>
      <h3>Total: R${calcularTotal().toFixed(2)}</h3>
      <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
      {isFormOpen && (
        <div className="formulario-container">
          <h2>Finalizar Compra</h2>
          <label>
            <p>Nome:</p>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label>
           <p>Email:</p> 
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Telefone:</p>
            <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </label>
          <label>
            <p>CEP:</p>
            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
          </label>
          <button onClick={handleEnviar}>Enviar Pedido</button>
          <button onClick={() => setIsFormOpen(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Carrinho;


