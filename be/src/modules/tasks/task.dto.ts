import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

class taskDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  @Type(() => Number)
  public amount: number;
}

export default taskDto;
