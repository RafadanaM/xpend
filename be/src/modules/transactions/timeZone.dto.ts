import { IsNumber } from 'class-validator';

class timeZoneDTO {
  @IsNumber()
  public timeZone: number;
}

export default timeZoneDTO;
