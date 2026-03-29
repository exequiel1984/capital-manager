import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMockCedear() {
    return {
      ticker: 'AAPL.BA',
      company: 'Apple Inc.',
      currency: 'ARS',
      price: 15400.50,
      status: 'CI/CD Pipeline is LIVE! 🚀' // <-- Add this new line!
    };
  }
}