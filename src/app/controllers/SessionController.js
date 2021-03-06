const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não cadastrado')
      return res.redirect('/signin')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/signin')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      res.redirect('/signin')
    })
  }
}

module.exports = new SessionController()
