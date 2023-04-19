### Entidades:
- Instituição de Ensino (Nome)
- Curso (Nome)
- Departamento (Nome)
- Aluno (Nome, Email, CPF, RG, Endereço, moedas)
- Professor (Nome, CPF, moedas)
- Vantagem (Nome, Descrição, Custo, Foto)
- Empresa (Nome)

### Relacionamentos:
- A Instituição de Ensino possui vários Cursos (1:N)
- A Instituição de Ensino possui vários Departamentos (1:N)
- O Aluno está matriculado em um Curso (1:N)
- O Professor está vinculado a um Departamento (1:N)
- A Empresa Parceira oferece Vantagens (1:N)

### Atributos adicionais:
- Instituição de Ensino: id (chave primária)
- Curso: id (chave primária)
- Departamento: id (chave primária), instituicaoId (chave estrangeira)
- Professor: id (chave primária), ID_instituicao (chave estrangeira), ID_departamento (chave estrangeira)
- Aluno: id (chave primária)
- Vantagem: id (chave primária), idEmpresa (chave estrangeira)
- Empresa: id (chave primária)