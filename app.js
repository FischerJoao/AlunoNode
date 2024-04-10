const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let alunos = [
    { ra: 1, nome: "Alex", turma: "DSM", habilidades: ['JavaScript', 'React', 'Java'] },
    { ra: 2, nome: "Ali", turma: "DSM", habilidades: ['JavaScript', 'React', 'Angular'] },
    { ra: 3, nome: "Claudio", turma: "DSM", habilidades: ['Python', 'React', 'Ruby'] }
];
app.get('/alunos', (req, res) => {
    res.json(alunos.map(({ ra, nome, turma }) => ({ ra, nome, turma })));
});


app.get('/alunos/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json({ nome: aluno.nome, turma: aluno.turma, habilidades: aluno.habilidades });
});


app.post('/alunos', (req, res) => {
    const aluno = req.body;
    alunos.push(aluno);
    res.status(201).json(aluno);
});


app.post('/alunos/:ra/habilidades', (req, res) => {
    const ra = parseInt(req.params.ra);
    const habilidade = req.body.habilidade;
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    aluno.habilidades.push(habilidade);
    res.status(201).json(aluno);
});


app.put('/alunos/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const newData = req.body;
    const index = alunos.findIndex(a => a.ra === ra);
    if (index === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    alunos[index] = { ...alunos[index], ...newData };
    res.json(alunos[index]);
});


app.put('/alunos/:ra/habilidades', (req, res) => {
    const ra = parseInt(req.params.ra);
    const habilidades = req.body.habilidades;
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    aluno.habilidades = habilidades;
    res.json(aluno);
});


app.delete('/alunos/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const index = alunos.findIndex(a => a.ra === ra);
    if (index === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    alunos.splice(index, 1);
    res.sendStatus(204);
});


app.delete('/alunos/:ra/habilidades/:habilidade', (req, res) => {
    const ra = parseInt(req.params.ra);
    const habilidade = req.params.habilidade;
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    const index = aluno.habilidades.indexOf(habilidade);
    if (index === -1) {
        return res.status(404).json({ error: 'Habilidade não encontrada para este aluno' });
    }
    aluno.habilidades.splice(index, 1);
    res.sendStatus(204);
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
