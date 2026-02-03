import './Cadastro.css';
import FormCad from './FormCad.jsx';
import Rodape from '../../Componentes/common/Rodape.jsx';
import Header from '../../Componentes/common/Header.jsx';

const Cadastro = () => {
    return (
    <>
    <div>
        <Header/>
      </div>
      <div className='DivForm2'>
        <FormCad />
      </div>
      <div>
        <Rodape/>
      </div>
    </>
  );
};

export default Cadastro;