function compose(...func: Function[]) {
  return function reducer(component: React.ReactElement) {
    return func.reduceRight((previousValue, f: Function) => f(previousValue), component);
  };
}

export default compose;
