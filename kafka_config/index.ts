export default () => ({
    broker: process.env.BROKER ?? 'broker:9092',
    services: {
      payment: {
        clientId: 'payment-client',
        groupId: 'payment-consumer',
        name: 'payment-kafka-client',
      },
    },
  });