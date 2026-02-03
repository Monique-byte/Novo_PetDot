import './Login.css';
import Form from './Form.jsx';
import Rodape from '../../Componentes/common/Rodape.jsx';
import Header from '../../Componentes/common/Header.jsx';
 
const ContLogin = () => {
  return (
    <>
    <div>
        <Header/>
      </div>
      <div className='DivForm'>
        <Form />
      </div>
      <div>
        <Rodape/>
      </div>
    </>
  );
};
 
export default ContLogin;
