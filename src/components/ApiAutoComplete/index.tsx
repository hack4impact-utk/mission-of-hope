import React, { useState, useMemo, useCallback } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from 'lodash.debounce';

export interface ApiAutocompleteOption {
  value: string;
  label: string;
  /** Optional property used when creating new options */
  inputValue?: string;
  created?: boolean;
}

export interface ApiAutoCompleteProps {
  /** The base URL for the API endpoint */
  apiUrl: string;
  /** The currently selected option */
  value: ApiAutocompleteOption | null;
  /** Callback when the value changes */
  onChange?: (value: ApiAutocompleteOption | null) => void;
  /** Label for the input field */
  label?: string;
  /** Page number to fetch (default is 1) */
  page?: number;
  /** Number of items per page (default is 10) */
  limit?: number;
  /** If true, allow creation of new options */
  creatable?: boolean;
  TextFieldProps?: TextFieldProps;
}

const ApiAutoComplete: React.FC<ApiAutoCompleteProps> = ({
  apiUrl,
  value = null,
  onChange,
  label = 'Select Option',
  page = 1,
  limit = 10,
  creatable = false,
  TextFieldProps = {},
}) => {
  const [options, setOptions] = useState<ApiAutocompleteOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch data from the API endpoint
  const fetchOptions = useCallback(
    async (search: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('search', search);
        params.append('page', String(page));
        params.append('limit', String(limit));

        const response = await fetch(`${apiUrl}?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
        const data: ApiAutocompleteOption[] = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [page, limit, apiUrl]
  );

  // Create a debounced version of fetchOptions so that it only triggers after the user stops typing
  const debouncedFetch = useMemo(
    () =>
      debounce((search: string) => {
        fetchOptions(search);
      }, 300),
    [fetchOptions]
  );

  // Only create the filter if the creatable prop is enabled
  const filter = creatable
    ? createFilterOptions<ApiAutocompleteOption>()
    : null;

  return (
    <Autocomplete
      value={value}
      onFocus={() => debouncedFetch(inputValue)}
      onChange={(event, newValue) => {
        if (creatable) {
          if (typeof newValue === 'string') {
            onChange &&
              onChange({ value: newValue, label: newValue, created: true });
          } else if (newValue && newValue.inputValue) {
            onChange &&
              onChange({
                value: newValue.inputValue,
                label: newValue.inputValue,
                created: true,
              });
          } else {
            onChange && onChange(newValue);
          }
        } else {
          onChange && onChange(newValue as ApiAutocompleteOption);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        debouncedFetch(newInputValue);
      }}
      isOptionEqualToValue={(option, value) =>
        option.value === (typeof value === 'string' ? value : value.value)
      }
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.label;
      }}
      filterOptions={
        creatable && filter
          ? (options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.label
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  label: inputValue,
                  value: inputValue,
                  created: true,
                });
              }
              return filtered;
            }
          : (x) => x
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          {...TextFieldProps}
          InputProps={{
            ...TextFieldProps.InputProps,
            ...params.InputProps,
            endAdornment: loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              params.InputProps.endAdornment
            ),
          }}
        />
      )}
    />
  );
};

export default ApiAutoComplete;
