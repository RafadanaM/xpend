import { IsNumber, IsString } from 'class-validator';

class taskDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  public amount: number;
}

export default taskDto;
