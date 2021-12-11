import { IsString } from 'class-validator';

class SearchDto {
  @IsString()
  public search: string;

  @IsString()
  public date: string;
}
export default SearchDto;