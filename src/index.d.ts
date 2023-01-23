interface Response<T>{
  data:T
}

interface optionsData {
  value: string;
  label: string;
}

interface toggleButtonOptionData {
  icon: React.ReactElement;
  label: string;
  value: string;
  activeColor: string;
}

interface customObject {
  [key: string]: any;
}

type booleanInteger = 1 | 0;

interface parentComponent {
  children?: React.ReactNode;
}
