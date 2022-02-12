import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

class createTransactionDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  @Type(() => Number)
  public amount: number;

  @IsDateString()
  public date: Date;
}
export default createTransactionDto;
