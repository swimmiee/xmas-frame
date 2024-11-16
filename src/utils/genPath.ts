type Params = { [key: string]: string | number };

export function genPath(path: string, params: Params): string {
  return path.replace(/:(\w+)/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing parameter: ${key}`);
    }
    return String(params[key]); // 단순 문자열 변환
  });
}