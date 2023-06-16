interface Response<T> {
  data: T;
}

interface stringOptionsData {
  id: string;
  name: string;
}

interface numberOptionsData {
  id: number;
  name: string;
}

interface booleanOptionsData {
  id: boolean;
  name: string;
}

interface toggleButtonOptionData {
  icon: React.ReactElement;
  label: string;
  value: string;
  activeColor: string;
}

interface parentComponent {
  children?: React.ReactNode;
}

interface customErrorData {
  message: string;
}
