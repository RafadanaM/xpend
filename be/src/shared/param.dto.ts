import { IsNumberString } from 'class-validator';

class Param {
  @IsNumberString()
  public id: number;
}
export default ParamDto;