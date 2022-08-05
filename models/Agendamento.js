const { default: mongoose } = require("mongoose");

const Agendamento = mongoose.model('Agendamento', {
    firstName: String,
    lastName: String,
    servicos: String,
    phone: String,
    email: String,
    dataInicial: String,
    horario: String
  })

  module.exports = Agendamento