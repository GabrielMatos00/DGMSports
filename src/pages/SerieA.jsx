import './global.css'
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Navbar from "../assets/components/navbar"
import { Link } from 'react-router-dom';

const schema = Yup.object().shape({
  camisas: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      time: Yup.string().required(),
      preco: Yup.number().required(),
      imagem: Yup.string().required(),
      descricao: Yup.string().required(),
      liga: Yup.string().required()
    })
  ).required()
});

const SerieA = () => {
  const [camisas, setCamisas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/camisas.json')
      .then(response => response.json())
      .then(data => {
        schema.validate({ camisas: data })
          .then(validData => {
            setCamisas(validData.camisas);
          })
          .catch(err => {
            setError('Dados inválidos');
            console.error('Dados inválidos', err);
          });
      })
      .catch(err => {
        setError('Erro ao carregar dados');
        console.error('Erro ao carregar dados', err);
      });
  }, []);

  // Filtrar por liga específica
  const ligaFiltro1 = "brasileirão";


  const camisasFiltradas1 = camisas.filter(camisa =>
    camisa.liga.toLowerCase().includes(ligaFiltro1.toLowerCase())
  );



  if (error) {
    return <div>{error}</div>;
  }

  return (
    
   <div>
         <Navbar/>
          <div className="container">
      <div className="cards-container">
        {camisasFiltradas1.map(camisa => (
          <div key={camisa.id} className="card">
            <img src={camisa.imagem} alt={`Camisa do ${camisa.time}`} className="imagem-camisa"  />
            <div className="info">
              <p className="nome">{camisa.time}</p>
              <p className="preco">R${camisa.preco.toFixed(2)}</p>
            <Link to={camisa.path}>
            <button className='button'>Detalhes</button>
            </Link>
          </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default SerieA;