migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'adriano@daviprojetos.com.br')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('adriano@daviprojetos.com.br')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin Davi Projetos')
      app.save(record)
    }

    const sr = app.findCollectionByNameOrId('service_requests')
    sr.addIndex('idx_sr_status', false, 'status', '')
    sr.addIndex('idx_sr_created', false, 'created', '')
    app.save(sr)
  },
  (app) => {
    const sr = app.findCollectionByNameOrId('service_requests')
    sr.removeIndex('idx_sr_status')
    sr.removeIndex('idx_sr_created')
    app.save(sr)
  },
)
