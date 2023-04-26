import { useState } from 'react';
import { Alunos } from './features/Aluno';
import { Empresas } from './features/Empresa';

export const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className='container m-auto h-full'>
      <div className='tabs'>
        <a className={`tab tab-bordered tab-lg ${currentTab === 0 && 'tab-active'}`} onClick={() => setCurrentTab(0)}>
          Alunos
        </a>
        <a className={`tab tab-bordered tab-lg ${currentTab === 1 && 'tab-active'}`} onClick={() => setCurrentTab(1)}>
          Empresas
        </a>
      </div>
      {currentTab === 0 && <Alunos />}
      {currentTab === 1 && <Empresas />}
    </div>
  );
};
