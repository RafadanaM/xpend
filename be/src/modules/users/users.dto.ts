import { IsEmail, IsString } from 'class-validator';

class createUserDto {
  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
export default createUserDto;
