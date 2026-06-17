onRecordAfterCreateSuccess((e) => {
  const record = e.record
  const name = record.getString('name') || 'Cliente'
  const company = record.getString('company') || 'Não informada'
  const email = record.getString('email') || 'Não informado'
  const phone = record.getString('phone') || 'Não informado'
  const requestType = record.getString('request_type') || 'Não informado'
  const location = record.getString('location') || 'Não informada'
  const description = record.getString('description') || 'Não informada'

  let servicesText = 'Nenhum'
  const servicesRaw = record.get('services')
  if (servicesRaw) {
    if (Array.isArray(servicesRaw)) {
      servicesText = servicesRaw.join(', ')
    } else if (typeof servicesRaw === 'object') {
      try {
        servicesText = JSON.stringify(servicesRaw)
      } catch (_) {
        servicesText = String(servicesRaw)
      }
    } else {
      servicesText = String(servicesRaw)
    }
  }

  const html = `
    <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Nova Solicitação de Serviço</h2>
      <p>Um novo pedido de <strong>${requestType}</strong> foi recebido pelo site.</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Empresa:</strong> ${company}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Tipo de Solicitação:</strong> ${requestType}</p>
      <p><strong>Local:</strong> ${location}</p>
      <p><strong>Serviços Selecionados:</strong> ${servicesText}</p>
      <p><strong>Descrição:</strong><br/>${description.replace(/\\n/g, '<br/>')}</p>
    </div>
  `

  try {
    const senderAddress = $app.settings().meta.senderAddress || 'noreply@daviprojetos.com.br'
    const senderName = $app.settings().meta.senderName || 'Davi Projetos Website'

    const message = new MailerMessage({
      from: {
        address: senderAddress,
        name: senderName,
      },
      to: [{ address: 'adriano@daviprojetos.com.br' }],
      subject: 'Nova Solicitação de Serviço - ' + name,
      html: html,
    })

    $app.newMailClient().send(message)
    $app.logger().info('Email enviado com sucesso para solicitação', 'recordId', record.id)
  } catch (err) {
    $app
      .logger()
      .error('Falha ao enviar email da solicitação', 'error', err.message, 'recordId', record.id)
  }

  return e.next()
}, 'service_requests')
