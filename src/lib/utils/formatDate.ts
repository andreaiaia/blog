type optionsType = {
  year: 'numeric' | '2-digit' | undefined;
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day: 'numeric' | '2-digit' | undefined;
};

const formatDate = (date: string) => {
  const options: optionsType = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

export { formatDate };
