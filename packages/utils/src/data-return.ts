export interface DataReturn<T = null> {
  statusCode?: number;
  error?: string;
  data?: T;
}
