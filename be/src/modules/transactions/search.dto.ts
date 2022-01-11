import { IsString } from 'class-validator';

class SearchDTO {
  @IsString()
  name: string;

  @IsString()
  date: string;
}

export default SearchDTO;
