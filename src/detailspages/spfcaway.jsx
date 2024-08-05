import React, { useState, useContext, useEffect } from 'react';
import { CarrinhoContext } from '../assets/components/CarrinhoContext';
import './globaldet.css'; 
import Navbar from "../assets/components/navbar";

const SPFCAway = ({ camisaId }) => {
  const { adicionarItem } = useContext(CarrinhoContext);
  const [camisa, setCamisa] = useState(null);
  const [personalizacao, setPersonalizacao] = useState(false);
  const [tamanho, setTamanho] = useState('M');
  const [quantidade, setQuantidade] = useState(1);
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');

  
    useEffect(() => {
      fetch('/camisas.json')
        .then(response => response.json())
        .then(data => {
          const camisaDetalhe = data.find(c => c.id === 4); 
          setCamisa(camisaDetalhe);
        });
    }, []);

  const handleComprar = () => {
    if (!camisa) return;
    adicionarItem({
      ...camisa,
      personalizacao,
      tamanho,
      quantidade,
      numero,
      nome,
    });
  };

  if (!camisa) return <p>Carregando...</p>;

  return (
    <>
    <Navbar/>
    <div className="camisa-detalhes">
      <div className="imagem-container">
        <img src={camisa.imagem} alt={`Camisa ${camisa.time}`} className="camisa-imagem" />
      </div>
      <h1>{camisa.time}</h1>
      <p className="preco">R${camisa.preco.toFixed(2)}</p>
      <label htmlFor="tamanho">Escolha o tamanho:</label>
      <select
        id="tamanho"
        value={tamanho}
        onChange={(e) => setTamanho(e.target.value)}
      >
        
        <option value="P">P</option>
        <option value="M">M</option>
        <option value="G">G</option>
        <option value="GG">GG</option>
      </select>
      <label htmlFor="quantidade">Quantidade:</label>
      
      <input
        type="number"
        id="quantidade"
        value={quantidade}
        min="1"
        max="3"
        onChange={(e) => setQuantidade(Number(e.target.value))}
        
      />

      {/* Opções de personalização */}
      <p>(Personalização custa R$20.00)</p>
      <div className="personalizacao-opcoes">
        <button
          className={`btn-personalizacao ${personalizacao ? 'active' : ''}`}
          onClick={() => setPersonalizacao(true)}
        >
          Personalizar
        </button>
        <button
          className={`btn-personalizacao ${!personalizacao ? 'active' : ''}`}
          onClick={() => setPersonalizacao(false)}
        >
          Não Personalizar
        </button>
      </div>

      {personalizacao && (
        <div className="personalizacao-container">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome para personalização"
          />
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Número para personalização"
          />
        </div>
      )}

      <button className="btn-comprar" onClick={handleComprar}>
        Comprar
      </button>
    </div></>
  );
};
export default SPFCAway;