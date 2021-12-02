import { IsNumberString } from 'class-validator';

class ParamDto {
  @IsNumberString()
  public id: number;
}
export default ParamDto;