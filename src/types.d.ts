type Update<T> = (value: T) => void;

type Updater<TData> = {
  [Key in keyof TData as `aktualisiere${Capitalize<Key & string>}`]: Update<TData[Key]>
};

type Result<T, E = string> =
  | { success: true, value: T; }
  | { success: false, error: E; };

type UniqueId = string;
