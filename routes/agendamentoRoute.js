const router = require('express').Router()

const Agendamento = require('../models/Agendamento')


// Criação de dados
router.post('/', async (req, res) => {

    // req.body
    const {         
        firstName,
        lastName,
        servicos,
        phone,
        email,
        dataInicial,
        horario
    } = req.body

    if(!firstName) {
        res.status(422).json({message: 'Campo firstName obrigatorio'}) // Erro, caso os dados nao foram criados com sucesso
        return
    } else if (!lastName){
        res.status(422).json({message: 'Campo lastName obrigatorio'})
        return
    } else if (!phone){
        res.status(422).json({message: 'Campo phone obrigatorio'})
        return
    } else if (!email){
        res.status(422).json({message: 'Campo email obrigatorio'})
        return
    }

    const agendamento = {
        firstName,
        lastName,
        servicos,
        phone,
        email,
        dataInicial,
        horario

    }

    // Criar dados em Agendamento

    try{

        await Agendamento.create(agendamento)

        res.status(200).json({message: 'Agendamento inserido com sucesso'}) // Dados criado com sucesso

        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read - Leitura de dados

router.get('/', async (req, res) =>{
    try {

        const agendamentos = await Agendamento.find()

        res.status(200).json(agendamentos)

    } catch (error) {
        res.status(500).json({error: error})
        
    }
})


router.get('/:id', async (req, res) =>{
    console.log(req.params.id)

    // Extrair dados da requisição, pela url = req.params
    const id = req.params.id

    try {

        const agendamento = await Agendamento.findOne({_id: id})

        if(!agendamento){
            res.status(422).json({message: `A conta com id ${id} não foi encontrado`})
            return
        }

        res.status(200).json(agendamento)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})




// UPDATE - Atualização de dados ( PUT, PATCH )
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {         
        firstName,
        lastName,
        servicos,
        phone,
        email,
        dataInicial,
        horario} = req.body

    const agendamentos = {
        firstName,
        lastName,
        servicos,
        phone,
        email,
        dataInicial,
        horario
    }

// Caso a conta nao seja encontrada
    try {
        const updateAgendamento = await Agendamento.updateOne({id: id}, agendamentos)

        if (updateAgendamento.matchedCount === 0) {
            res.status(422).json({message: `A conta com id ${id} não foi encontrado`})
            return
        }

        res.status(200).json(agendamentos)
    } catch (error) {
        res.status(500).json({error: error})        
    }
})

// DELET - Deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    
    const agendamento = await Agendamento.findOne({_id: id})

    if(!agendamento){
        res.status(422).json({message: `A conta com id ${id} não foi encontrado`})
        return
    }

    try {
        await Agendamento.deleteOne({_id: id})
        res.status(200).json({message: `Conta: ${agendamento.conta}, removido com sucesso!`})
    } catch (error) {
        res.status(500).json({error: error})
    }

})


module.exports = router