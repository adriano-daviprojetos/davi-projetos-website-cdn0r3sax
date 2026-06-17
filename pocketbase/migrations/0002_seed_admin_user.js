migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'adriano@daviprojetos.com.br')
      return // already seeded
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('adriano@daviprojetos.com.br')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Admin Davi Projetos')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'adriano@daviprojetos.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
