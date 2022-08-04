function getDeepCopy(obj: any): any {
  const copy = {};

  Object.keys(obj).forEach((property) => {
    const value = obj[property];
    const isObject = value
      && typeof value === 'object'
      && !(value instanceof Array);

    // @ts-ignore
    copy[property] = isObject ? getDeepCopy(value) : value;
  });

  return copy;
}

export default {
  getDeepCopy,
  getUpdatedFormData(
    formData: any,
    value: any,
    propertyName: string | string[] = [],
  ) {
    const keys = this.getKeys(propertyName);
    const copy = getDeepCopy(formData);
    const lastIndex = keys.length - 1;
    let nextValue = copy;

    keys.forEach((key, index) => {
      if (index === lastIndex) {
        nextValue[key] = value;
      } else {
        if (!nextValue[key]) nextValue[key] = {};
        nextValue = nextValue[key];
      }
    });

    return copy;
  },

  getKeys(propertyName: string | string[]) {
    return typeof propertyName === 'string'
      ? [propertyName]
      : propertyName;
  },

  getValueByKeys(
    originData: any,
    propertyName: string | string[] = [],
  ) {
    const keys = this.getKeys(propertyName);
    return keys.length
      ? keys.reduce((data, key) => data?.[key], originData) ?? ''
      : '';
  },
};
