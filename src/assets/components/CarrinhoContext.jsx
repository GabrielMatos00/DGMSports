import React, { createContext, useState, useEffect } from 'react';

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState(() => {
    const storedItems = localStorage.getItem('itens');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [cupom, setCupom] = useState('');

  useEffect(() => {
    localStorage.setItem('itens', JSON.stringify(itens));
  }, [itens]);

  const adicionarItem = (item) => {
    setItens([...itens, item]);
  };

  const removerItem = (index) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  };

  const calcularTotal = () => {
    const total = itens.reduce((acc, item) => {
      let preco = item.preco * item.quantidade;
      if (item.personalizacao) preco += 20; // Adiciona custo de personalização
      return acc + preco;
    }, 0);

    // Aplicar desconto se cupom for válido
    if (cupom === 'DESCONTO10') {
      return total * 0.9; // 10% de desconto
    }

    return total;
  };

  const aplicarCupom = (codigo) => {
    setCupom(codigo);
  };

  const removerCupom = () => {
    setCupom('');
  };

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, calcularTotal, aplicarCupom, removerCupom, cupom }}>
      {children}
    </CarrinhoContext.Provider>
  );
};


