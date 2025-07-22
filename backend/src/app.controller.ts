import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('search')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async search(@Query('term') term: string) {
    this.validateSearchTerm(term);
    const sanitizedTerm = term.trim();

    try {
      const results = await this.appService.searchItunes(sanitizedTerm);
      return {
        success: true,
        count: results.length,
        data: results,
      };
    } catch (error) {
      this.handleSearchError(error);
    }
  }

  private validateSearchTerm(term: string): void {
    if (!term || term.trim().length === 0) {
      throw new BadRequestException('Search term is required');
    }
    if (term.length < 2) {
      throw new BadRequestException(
        'Search term must be at least 2 characters',
      );
    }
  }

  private handleSearchError(error: unknown): never {
    let errorMessage = 'Failed to process your search';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    throw new BadRequestException(errorMessage);
  }
}
