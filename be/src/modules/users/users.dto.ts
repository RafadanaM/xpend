import { IsDateString, IsEmail, IsString } from 'class-validator';

class createUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsDateString()
  public birth_date: string;
}
export default createUserDto;
