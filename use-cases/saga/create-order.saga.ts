import { Inject, Injectable } from "@nestjs/common";
import msConfig from './../../kafka_config'
import { ClientKafka } from "@nestjs/microservices";
@Injectable()
export class CreateOrderSaga {
    constructor(
        @Inject(msConfig().services.payment.name) private paymentClient: ClientKafka,
    ) {
    }

    async invoke(input: any) {
        this.paymentClient.send('FROM PAYMENT - CREATE ORDER', { ...input })
    }

}