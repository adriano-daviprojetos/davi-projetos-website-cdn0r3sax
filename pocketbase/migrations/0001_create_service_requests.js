migrate(
  (app) => {
    const collection = new Collection({
      name: 'service_requests',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
        {
          name: 'request_type',
          type: 'select',
          required: true,
          values: ['atendimento', 'proposta'],
          maxSelect: 1,
        },
        { name: 'location', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'services', type: 'json' },
        {
          name: 'status',
          type: 'select',
          values: ['Pending', 'Reviewed', 'Finalizado'],
          maxSelect: 1,
        },
        { name: 'files', type: 'file', maxSelect: 10, maxSize: 20971520, mimeTypes: [] },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_service_requests_email ON service_requests (email)',
        'CREATE INDEX idx_service_requests_type ON service_requests (request_type)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('service_requests')
    app.delete(collection)
  },
)
