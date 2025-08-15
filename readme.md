# BACK-END ASSITY

Sistema para persistir, processar e apresentar informações pertinentes aos serviços comercializados pelo site assisty24h.com.br.

Assinatura do plano assistencial no valor de R$ 44,90/mês com pagamento recorrente pelo Mercado Pago, carência de 3 dias e fidelidade de 6 meses. Caso o cliente queira cancelar antes do fim do período de fidelidade, cobrar os meses restantes para permitir o cancelamento.

Opção sinistro com atendimento imeditado vigência de 12 meses para uso das assistências de forma limitada e sem carência, ou seja, o cliente pode pagar e acionar a assistência em seguida por até 12x de R$ 45,00 ou 540 no PIX pelo Mercado Pago.

## COMPOSIÇÃO DA APLICAÇÃO

O sistema back-end será composto por:

- APIs para receber e apresentar informações do site.
- APIs para receber pagamentos recorrentes via cartão de crédito.
- APIs para receber pagamentos únicos a vista ou parcelado via cartão de crédito.
- APIs para receber pagamento únicos via PIX.
- Webhooks para receber informações assíncronas dos pagamentos via PIX
- Webhooks para receber solicitações de chargebak.
- Workers para processamento de ativações e desativações na Tempo, pagamentos pendentes, renovações automáticas, consolidação de relatórios.
- Banco de dados NoSQL para armazenamento das informações.
- Backup do banco de dados periódico.

## RESUMO DE TAREFAS

As tarefas resumem um objetivo completo de uma parte do sistema, mas são na verdade o conjunto de duas ou mais tarefas técnicas menores, por isso a quantidade de itens abaixo não refletem a quantidade real de tarefas que é maior.

### COMUM (1 dia útil)

- API para cadastro de cliente. (1 dia)

### ASSINATURA (23 dias úteis)

- Estrutura de dados para suportar assinaturas (3 dias)
- Integração com Mercado Pago para pagamento com cartão de crédito recorrente para assinaturas. (5 dias)
- Rotina para processar pagamentos recorrentes de assinaturas em suas respectivas datas de vencimento. (5 dias)
- Rotina para ativação de novos clientes na Tempo (fim da carência). (2 dias)
- Rotina para desativação de clientes na Tempo (em tempo real). (2 dias)
- API para criar assinatura de um cliente. (1 dia)
- API para primeiro pagamento de assinatura. (2 dias)
- API para cancelamento de assinatura (validar tempo de fidelidade). (1 dia)
- API para cancelamento de assinaturas (em tempo real). (2 dias)

### SINISTRO (28 dias úteis)

- Estrutura de dados para suportar compra avulsa de assistências (3 dias)
- Integração com Mercado Pago para pagamento com cartão de crédito a vista e parcelado para sinistro. (5 dias)
- Integração com Mercado Pago para pagamento com PIX para sinistro. (5 dias)
- Criar webhook para o Mercado Pago enviar status de pagamento via PIX. (2 dias)
- Criar rotina para identificar PIX pendente de pagamento. (1 dia)
- Rotina para ativação de novos clientes na Tempo (em tempo real). (2 dias)
- Rotina para desativação de clientes com fim de contrato na Tempo (em tempo real). (1 dia)
- Controle de uso de cada assistência no período vigente. (5 dias)
- API para criar compra de um cliente. (1 dia)
- API para primeiro pagamento da compra. (2 dias)
- API para cancelamento de compra (verificar termos). (1 dia)
