import { UserResponse } from '@/types/users';
import { Autocomplete, Avatar, Chip, TextField } from '@mui/material';

interface AdminAutocompleteProps {
  users: UserResponse[];
  value?: UserResponse[];
  onChange: (users: UserResponse[]) => void;
}

export default function AdminAutocomplete({
  users,
  value,
  onChange,
}: AdminAutocompleteProps) {
  return (
    <Autocomplete
      multiple
      options={users}
      value={value}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Admins" />}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            avatar={<Avatar src={option.image || ''} />}
            label={option.name}
            {...getTagProps({ index })}
            key={option._id}
          />
        ))
      }
      autoHighlight
      onChange={(event, value) => onChange(value)}
    ></Autocomplete>
  );
}
