import { IsNumber, IsString } from 'class-validator';

class createTransactionDto {
  @IsString()
  public description: string;

  @IsNumber()
  public amount: number;
}
export default createTransactionDto;
